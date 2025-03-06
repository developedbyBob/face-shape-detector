// src/data/hairstyleRecommendations.js

// Esta função retorna as recomendações de cortes de cabelo com base no formato do rosto
export const getHairstyleRecommendations = (faceShape) => {
    // Definição temporária de recomendações sem imagens
    const recommendations = {
      oval: [
        {
          name: "Bob Médio",
          description: "Um corte versátil que cai bem no formato oval. O comprimento médio até os ombros com pontas texturizadas cria um visual equilibrado.",
          // Usando placeholder temporário
          image: { uri: 'https://via.placeholder.com/300x200?text=Bob+Medio' }
        },
        {
          name: "Ondas Longas",
          description: "Cabelos longos com ondas suaves realçam a simetria do rosto oval. Camadas longas dão movimento e volume natural.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Ondas+Longas' }
        },
        {
          name: "Pixie Moderno",
          description: "Um corte curto com textura no topo cria um visual ousado que equilibra as proporções do rosto oval.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Pixie+Moderno' }
        },
        {
          name: "Lob com Franja",
          description: "O long bob (lob) com franja reta ou lateral emoldura perfeitamente o rosto oval, realçando os olhos e as maçãs do rosto.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Lob+Franja' }
        }
      ],
      
      heart: [
        {
          name: "Long Bob",
          description: "O comprimento médio até os ombros ajuda a equilibrar a largura da testa com o queixo mais fino, criando harmonia.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Long+Bob' }
        },
        {
          name: "Camadas Médias",
          description: "Camadas médias começando na altura do queixo adicionam volume nas laterais, equilibrando as proporções do rosto.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Camadas+Médias' }
        },
        {
          name: "Pixie com Franja Lateral",
          description: "Um corte curto com franja lateral longa suaviza a testa larga e adiciona balanço ao rosto em formato de coração.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Pixie+Franja' }
        },
        {
          name: "Bob com Parte Lateral",
          description: "Um bob cortado na altura do queixo com parte lateral adiciona volume onde é necessário para equilibrar o formato de coração.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Bob+Lateral' }
        }
      ],
      
      round: [
        {
          name: "Long Layers",
          description: "Camadas longas e angulares criam linhas verticais que alongam visualmente o rosto redondo.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Long+Layers' }
        },
        {
          name: "Bob Assimétrico",
          description: "Um bob angulado e assimétrico adiciona estrutura e ângulos que contrastam com as curvas do rosto redondo.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Bob+Assimétrico' }
        },
        {
          name: "Pixie com Volume no Topo",
          description: "Um corte curto com volume e altura no topo alonga visualmente o rosto, enquanto mantém as laterais mais curtas.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Pixie+Volume' }
        },
        {
          name: "Longo com Parte Central",
          description: "Cabelos longos com parte central criam linhas verticais que alongam o rosto redondo. Evite camadas excessivas nas laterais.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Longo+Central' }
        }
      ],
      
      square: [
        {
          name: "Bob Ondulado",
          description: "Ondas suaves na altura dos ombros suavizam os ângulos do rosto quadrado, adicionando feminilidade.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Bob+Ondulado' }
        },
        {
          name: "Camadas Longas",
          description: "Camadas longas e suaves ao redor do rosto suavizam a linha da mandíbula, criando um visual mais delicado.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Camadas+Longas' }
        },
        {
          name: "Pixie Texturizado",
          description: "Um corte pixie com textura e franja irregular cria um contraste suave com os ângulos fortes do rosto.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Pixie+Texturizado' }
        },
        {
          name: "Lob com Ondas",
          description: "Um long bob com ondas texturizadas suaviza os ângulos fortes do rosto quadrado e adiciona movimento.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Lob+Ondas' }
        }
      ],
      
      oblong: [
        {
          name: "Bob na Altura do Queixo",
          description: "Um bob curto na altura do queixo reduz visualmente o comprimento do rosto, criando a ilusão de maior largura.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Bob+Queixo' }
        },
        {
          name: "Franja Reta",
          description: "Uma franja reta e espessa encurta visualmente o rosto oblongo, quebrando a linha vertical longa.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Franja+Reta' }
        },
        {
          name: "Camadas nas Laterais",
          description: "Camadas volumosas nas laterais acrescentam largura ao rosto, equilibrando o formato alongado.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Camadas+Laterais' }
        },
        {
          name: "Curto Texturizado",
          description: "Um corte curto e texturizado com volume nas laterais equilibra o comprimento do rosto oblongo.",
          image: { uri: 'https://via.placeholder.com/300x200?text=Curto+Texturizado' }
        }
      ],
    };
  
    // Retorna as recomendações para o formato de rosto especificado
    // Se o formato não for encontrado, retorna as recomendações para oval (formato padrão)
    return recommendations[faceShape] || recommendations.oval;
  };