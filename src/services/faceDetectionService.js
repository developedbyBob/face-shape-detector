// src/services/faceDetectionService.js
import * as FaceDetector from 'expo-face-detector';
import * as FileSystem from 'expo-file-system';

// Função principal para detectar o formato do rosto
export const detectFaceShape = async (imageUri, faceData) => {
  try {
    // Extrair as dimensões e pontos faciais do objeto faceData
    const { bounds, rightEyePosition, leftEyePosition, leftCheekPosition, rightCheekPosition, leftMouthPosition, rightMouthPosition, bottomMouthPosition } = faceData;
    
    // Obter largura e altura do rosto
    const width = bounds.size.width;
    const height = bounds.size.height;
    
    // Calcular proporção altura/largura
    const ratio = height / width;
    
    // Calcular distâncias importantes
    // Distância entre olhos
    const eyeDistance = Math.sqrt(
      Math.pow(rightEyePosition.x - leftEyePosition.x, 2) + 
      Math.pow(rightEyePosition.y - leftEyePosition.y, 2)
    );
    
    // Largura da testa (estimada como um pouco maior que a distância entre os olhos)
    const foreheadWidth = eyeDistance * 1.3;
    
    // Largura das bochechas
    const cheekWidth = Math.sqrt(
      Math.pow(rightCheekPosition.x - leftCheekPosition.x, 2) + 
      Math.pow(rightCheekPosition.y - leftCheekPosition.y, 2)
    );
    
    // Largura da mandíbula
    const jawWidth = Math.sqrt(
      Math.pow(rightMouthPosition.x - leftMouthPosition.x, 2) + 
      Math.pow(rightMouthPosition.y - leftMouthPosition.y, 2)
    );
    
    // Altura do rosto (da média dos olhos até o queixo)
    const eyeLevel = (leftEyePosition.y + rightEyePosition.y) / 2;
    const chinLevel = bottomMouthPosition.y + (bottomMouthPosition.y - leftMouthPosition.y) * 0.7; // Estimando posição do queixo
    const faceHeight = chinLevel - eyeLevel;
    
    // Agora vamos classificar o formato do rosto com base nas proporções

    // 1. Oval: proporção ~1.5, com largura da testa semelhante à linha da mandíbula
    if (ratio >= 1.35 && ratio <= 1.65 && 
        Math.abs(foreheadWidth - jawWidth) / foreheadWidth < 0.15) {
      return 'oval';
    }
    
    // 2. Coração: testa mais larga que a mandíbula
    if ((foreheadWidth - jawWidth) / foreheadWidth > 0.15 && 
        ratio >= 1.3 && ratio <= 1.7) {
      return 'heart';
    }
    
    // 3. Redondo: proporção próxima de 1, bochechas proeminentes
    if (ratio >= 0.9 && ratio <= 1.2 && 
        cheekWidth >= jawWidth * 0.95 && 
        cheekWidth >= foreheadWidth * 0.95) {
      return 'round';
    }
    
    // 4. Quadrado: mandíbula ampla, proporções similares entre larguras
    if (Math.abs(foreheadWidth - jawWidth) / foreheadWidth < 0.1 && 
        Math.abs(cheekWidth - jawWidth) / cheekWidth < 0.1 &&
        ratio >= 0.9 && ratio <= 1.3) {
      return 'square';
    }
    
    // 5. Oblongo/Retangular: face longa com larguras similares
    if (ratio > 1.65 && 
        Math.abs(foreheadWidth - jawWidth) / foreheadWidth < 0.15 &&
        Math.abs(cheekWidth - jawWidth) / cheekWidth < 0.15) {
      return 'oblong';
    }
    
    // Formato padrão se nenhuma classificação clara for possível
    // Analisamos as proporções e escolhemos o mais provável
    if (ratio > 1.4) {
      // Mais longo que largo, provável oval ou oblongo
      return foreheadWidth > jawWidth * 1.1 ? 'heart' : 'oval';
    } else {
      // Mais próximo do quadrado, provável redondo ou quadrado
      return jawWidth > foreheadWidth * 0.95 ? 'square' : 'round';
    }
  } catch (error) {
    console.error('Erro ao determinar formato do rosto:', error);
    // Retornar oval como formato padrão em caso de erro
    return 'oval';
  }
};

// Função para detectar rosto na imagem
export const detectFace = async (imageUri) => {
  try {
    // Configurar opções de detecção
    const options = {
      mode: FaceDetector.FaceDetectorMode.fast,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: 100,
      tracking: true,
    };

    // Detectar rostos na imagem
    const faceData = await FaceDetector.detectFacesAsync(imageUri, options);
    
    if (faceData.faces.length === 0) {
      throw new Error('Nenhum rosto detectado');
    }
    
    if (faceData.faces.length > 1) {
      throw new Error('Múltiplos rostos detectados');
    }
    
    // Retornar dados do primeiro rosto
    return faceData.faces[0];
  } catch (error) {
    console.error('Erro ao detectar rosto:', error);
    throw error;
  }
};