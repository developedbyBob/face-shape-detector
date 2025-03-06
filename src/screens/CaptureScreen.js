import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import { detectFaceShape, detectFace } from '../services/faceDetectionService';

const CaptureScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const pickFromGallery = route.params?.pickFromGallery || false;

  useEffect(() => {
    (async () => {
      // Solicitar permissões da câmera
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      // Solicitar permissões da biblioteca de mídia
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      setHasPermission(
        cameraStatus === 'granted' && mediaLibraryStatus === 'granted'
      );

      // Se a opção for abrir a galeria diretamente
      if (pickFromGallery) {
        pickImage();
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    
    setIsProcessing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });
      
      processFaceImage(photo.uri);
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível capturar a imagem. Por favor, tente novamente.');
      setIsProcessing(false);
    }
  };

  const pickImage = async () => {
    setIsProcessing(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        processFaceImage(result.assets[0].uri);
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem. Por favor, tente novamente.');
      setIsProcessing(false);
    }
  };

  const processFaceImage = async (imageUri) => {
    try {
      // Usar nossa função de detecção facial simplificada
      const faceData = await detectFace(imageUri);
      
      // Detectar formato do rosto usando nosso serviço
      const faceShape = await detectFaceShape(imageUri, faceData);
      
      // Navegar para a tela de resultados
      navigation.navigate('Result', {
        faceShape: faceShape,
        imageUri: imageUri
      });
      
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      
      if (error.message === 'Nenhum rosto detectado') {
        Alert.alert(
          'Nenhum rosto detectado',
          'Não conseguimos detectar um rosto na imagem. Por favor, tente novamente com uma foto clara e frontal.'
        );
      } else if (error.message === 'Múltiplos rostos detectados') {
        Alert.alert(
          'Múltiplos rostos detectados',
          'Detectamos mais de um rosto na imagem. Por favor, use uma foto com apenas um rosto.'
        );
      } else {
        Alert.alert(
          'Erro de processamento',
          'Ocorreu um erro ao analisar sua imagem. Por favor, tente novamente.'
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Verificar permissões
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6a0dad" />
        <Text>Solicitando permissões...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Não temos acesso à câmera ou à galeria de imagens.
        </Text>
        <Button 
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Voltar
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isProcessing ? (
        <>
          <Camera 
            style={styles.camera} 
            type={type}
            ref={cameraRef}
            ratio="1:1"
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            <View style={styles.overlay}>
              <View style={styles.faceGuide}></View>
            </View>
          </Camera>
          
          <View style={styles.controls}>
            <Button 
              icon="camera-flip" 
              mode="contained" 
              onPress={() => setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}
              style={styles.flipButton}
            >
              Virar
            </Button>
            
            <Button 
              icon="camera"
              mode="contained"
              onPress={takePicture}
              style={styles.captureButton}
              labelStyle={styles.captureButtonLabel}
            >
              Capturar
            </Button>
            
            <Button 
              icon="image"
              mode="contained"
              onPress={pickImage}
              style={styles.galleryButton}
            >
              Galeria
            </Button>
          </View>
          
          <Text style={styles.hint}>
            Posicione seu rosto dentro do guia e mantenha a cabeça reta
          </Text>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a0dad" />
          <Text style={styles.loadingText}>Processando imagem...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceGuide: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  flipButton: {
    backgroundColor: '#555',
  },
  captureButton: {
    backgroundColor: '#6a0dad',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
  },
  captureButtonLabel: {
    fontSize: 16,
  },
  galleryButton: {
    backgroundColor: '#555',
  },
  hint: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: 'white',
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  button: {
    margin: 20,
  }
});

export default CaptureScreen;