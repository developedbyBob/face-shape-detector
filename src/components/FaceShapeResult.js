// src/components/FaceShapeTypes.js

import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';

const FaceShapeTypes = ({ style }) => {
  // Descrições de cada formato de rosto
  const faceShapes = [
    {
      type: 'oval',
      title: 'Oval',
      description: 'Comprimento ~1,5x maior que a largura, testa ligeiramente mais larga que o queixo.',
      // Ideal seria ter uma imagem para cada formato
      image: require('../../assets/images/placeholders/oval_face.png')
    },
    {
      type: 'heart',
      title: 'Coração',
      description: 'Testa larga e queixo pontudo, forma um coração invertido.',
      image: require('../../assets/images/placeholders/heart_face.png')
    },
    {
      type: 'round',
      title: 'Redondo',
      description: 'Largura e comprimento semelhantes, maçãs do rosto cheias, queixo arredondado.',
      image: require('../../assets/images/placeholders/round_face.png')
    },
    {
      type: 'square',
      title: 'Quadrado',
      description: 'Mandíbula forte e angular, larguras da testa, bochechas e mandíbula aproximadamente iguais.',
      image: require('../../assets/images/placeholders/square_face.png')
    },
    {
      type: 'oblong',
      title: 'Oblongo',
      description: 'Face alongada, comprimento maior que largura, larguras similares em toda face.',
      image: require('../../assets/images/placeholders/oblong_face.png')
    }
  ];

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Formatos de Rosto</Text>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {faceShapes.map((shape, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={shape.image} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.cardTitle}>{shape.title}</Title>
              <Text style={styles.cardDescription}>{shape.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 10,
  },
  card: {
    width: 200,
    marginRight: 15,
    elevation: 3,
  },
  cardImage: {
    height: 180,
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default FaceShapeTypes;