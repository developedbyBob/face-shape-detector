// src/components/ImageSelector.js

import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const ImageSelector = ({ onImageSelected, style }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permissão Necessária", 
        "Precisamos de acesso à sua galeria para selecionar imagens.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    // Verificar permissão
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      // Abrir seletor de imagens
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        // Notificar componente pai
        if (onImageSelected) {
          onImageSelected(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem. Por favor, tente novamente.");
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
          </View>
        )}
      </View>

      <Button 
        mode="contained" 
        icon="image" 
        onPress={pickImage}
        style={styles.button}
      >
        {selectedImage ? "Trocar Imagem" : "Selecionar Imagem"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#888',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#6a0dad',
  },
});

export default ImageSelector;