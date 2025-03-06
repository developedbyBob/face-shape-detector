import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { getHairstyleRecommendations } from '../data/hairstyleRecommendations';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ResultScreen = ({ route, navigation }) => {
  const { faceShape, imageUri } = route.params;
  
  // Obter recomendações com base no formato do rosto
  const recommendations = getHairstyleRecommendations(faceShape);
  
  // Descrições de cada formato de rosto
  const faceShapeDescriptions = {
    oval: "O formato oval é considerado o mais equilibrado. Tem comprimento aproximadamente 1,5 vez maior que a largura, com a testa ligeiramente mais larga que o queixo.",
    heart: "O formato coração tem uma testa larga e um queixo estreito e pontudo, formando um coração invertido. As maçãs do rosto são frequentemente proeminentes.",
    round: "O formato redondo tem largura e comprimento semelhantes, com maçãs do rosto cheias e queixo arredondado. Não apresenta ângulos proeminentes.",
    square: "O formato quadrado tem mandíbula forte e angular, com largura da testa, bochechas e mandíbula aproximadamente iguais.",
    oblong: "O formato oblongo (ou retangular) é alongado, com comprimento facial maior que a largura. A testa, as bochechas e a linha da mandíbula têm larguras semelhantes."
  };

  // Dicas gerais para cada formato de rosto
  const faceShapeTips = {
    oval: "Você tem sorte! O formato oval combina com quase todos os estilos de cabelo. Experimente diferentes comprimentos e texturas.",
    heart: "Equilibre a largura da testa com estilos que adicionam volume nas laterais do queixo. Evite muito volume no topo da cabeça.",
    round: "Busque cortes que alonguem o rosto, com volume no topo e mais estreitos nas laterais. Camadas e ângulos funcionam bem.",
    square: "Suavize os ângulos fortes com camadas suaves ao redor do rosto. Franja lateral e texturas podem ajudar a equilibrar a mandíbula forte.",
    oblong: "Adicione largura com camadas nas laterais e evite estilos muito longos ou muito volumosos no topo que alonguem ainda mais o rosto."
  };

  // Compartilhar resultados
  const shareResults = async () => {
    try {
      // Verificar se o compartilhamento está disponível
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (!isAvailable) {
        alert("O compartilhamento não está disponível neste dispositivo");
        return;
      }
      
      // Copiar a imagem para um local temporário
      const tempFile = `${FileSystem.cacheDirectory}face-shape-result.jpg`;
      await FileSystem.copyAsync({
        from: imageUri,
        to: tempFile
      });
      
      // Compartilhar a imagem
      await Sharing.shareAsync(tempFile, {
        mimeType: 'image/jpeg',
        dialogTitle: `Meu formato de rosto é ${faceShape}`,
        UTI: 'public.jpeg'
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      alert("Não foi possível compartilhar sua imagem");
    }
  };

  // Salvar imagem na galeria
  const saveToGallery = async () => {
    try {
      // Solicitar permissão
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        alert("Precisamos de permissão para salvar na sua galeria");
        return;
      }
      
      // Salvar na galeria
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      await MediaLibrary.createAlbumAsync("Face Shape Detector", asset, false);
      
      alert("Imagem salva com sucesso na sua galeria!");
    } catch (error) {
      console.error("Erro ao salvar na galeria:", error);
      alert("Não foi possível salvar sua imagem");
    }
  };

  // Função para capitalizar primeira letra
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Seu Formato de Rosto</Text>
          <Text style={styles.faceShapeText}>{capitalize(faceShape)}</Text>
          
          <Image
            source={{ uri: imageUri }}
            style={styles.faceImage}
          />
          
          <Text style={styles.description}>
            {faceShapeDescriptions[faceShape]}
          </Text>
          
          <Card style={styles.tipCard}>
            <Card.Content>
              <Title>Dicas para o seu formato</Title>
              <Paragraph>{faceShapeTips[faceShape]}</Paragraph>
            </Card.Content>
          </Card>
        </View>
        
        <Divider style={styles.divider} />
        
        <Text style={styles.recommendationsTitle}>
          Cortes de Cabelo Recomendados
        </Text>
        
        <View style={styles.recommendationsContainer}>
          {recommendations.map((item, index) => (
            <Card key={index} style={styles.recommendationCard}>
              <Card.Cover source={item.image} />
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            icon="share-variant" 
            mode="contained" 
            onPress={shareResults}
            style={styles.shareButton}
          >
            Compartilhar
          </Button>
          
          <Button 
            icon="content-save" 
            mode="outlined" 
            onPress={saveToGallery}
            style={styles.saveButton}
          >
            Salvar
          </Button>
          
          <Button 
            icon="camera" 
            mode="contained" 
            onPress={() => navigation.navigate('Capture')}
            style={styles.newPhotoButton}
          >
            Nova Foto
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  resultHeader: {
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  faceShapeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 20,
  },
  faceImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: '#6a0dad',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    lineHeight: 22,
  },
  tipCard: {
    width: '90%',
    marginVertical: 10,
    elevation: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  recommendationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  recommendationsContainer: {
    padding: 10,
  },
  recommendationCard: {
    marginBottom: 15,
    elevation: 3,
  },
  actionButtons: {
    padding: 20,
    flexDirection: 'column',
  },
  shareButton: {
    marginBottom: 10,
    backgroundColor: '#6a0dad',
  },
  saveButton: {
    marginBottom: 10,
    borderColor: '#6a0dad',
  },
  newPhotoButton: {
    backgroundColor: '#333',
  },
});

export default ResultScreen;