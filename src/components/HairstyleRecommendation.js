// src/components/HairstyleRecommendation.js

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { getHairstyleRecommendations } from '../data/hairstyleRecommendations';

const HairstyleRecommendation = ({ faceShape, style }) => {
  // Obter recomendações para o formato de rosto
  const recommendations = getHairstyleRecommendations(faceShape);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Cortes Recomendados</Text>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendations.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={item.image} style={styles.cardImage} />
            <Card.Content>
              <Title style={styles.cardTitle}>{item.name}</Title>
              <Paragraph style={styles.cardDescription}>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      
      <Text style={styles.disclaimer}>
        Estas recomendações são baseadas em princípios gerais de estilo para diferentes 
        formatos de rosto. Consulte um profissional para orientações personalizadas.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 10,
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
    width: 220,
    marginRight: 15,
    elevation: 3,
  },
  cardImage: {
    height: 140,
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default HairstyleRecommendation;