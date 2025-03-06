import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Detector de Formato de Rosto</Text>
        
        <Image 
          source={require('../../assets/images/placeholders/face-shape-types.png')} 
          style={styles.image}
          resizeMode="contain"
        />
        
        <Text style={styles.description}>
          Descubra qual é o formato do seu rosto e receba recomendações personalizadas 
          de cortes de cabelo que valorizam seus traços.
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            icon="camera"
            onPress={() => navigation.navigate('Capture')}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Tirar uma foto
          </Button>
          
          <Button 
            mode="outlined" 
            icon="image"
            onPress={() => navigation.navigate('Capture', { pickFromGallery: true })}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Escolher da galeria
          </Button>
        </View>
        
        <Text style={styles.footer}>
          Dica: Para melhores resultados, tire uma foto frontal com o cabelo preso e em um ambiente bem iluminado.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6a0dad',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
  footer: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
  },
});

export default HomeScreen;