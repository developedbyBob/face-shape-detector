// src/data/hairstyleRecommendations.js

// Esta função retorna as recomendações de cortes de cabelo com base no formato do rosto
export const getHairstyleRecommendations = (faceShape) => {
    // As imagens seriam arquivos reais no projeto
    // Aqui estamos apenas especificando os caminhos que deverão existir
  
    const recommendations = {
      oval: [
        {
          name: "Bob Médio",
          description: "Um corte versátil que cai bem no formato oval. O comprimento médio até os ombros com pontas texturizadas cria um visual equilibrado.",
          image: require('../../assets/images/hairstyles/oval/bob_medio.jpg')
        },
        {
          name: "Ondas Longas",
          description: "Cabelos longos com ondas suaves realçam a simetria do rosto oval. Camadas longas dão movimento e volume natural.",
          image: require('../../assets/images/hairstyles/oval/ondas_longas.jpg')
        },
        {
          name: "Pixie Moderno",
          description: "Um corte curto com textura no topo cria um visual ousado que equilibra as proporções do rosto oval.",
          image: require('../../assets/images/hairstyles/oval/pixie_moderno.jpg')
        },
        {
          name: "Lob com Franja",
          description: "O long bob (lob) com franja reta ou lateral emoldura perfeitamente o rosto oval, realçando os olhos e as maçãs do rosto.",
          image: require('../../assets/images/hairstyles/oval/lob_franja.jpg')
        }
      ],
      
      heart: [
        {
          name: "Long Bob",
          description: "O comprimento médio até os ombros ajuda a equilibrar a largura da testa com o queixo mais fino, criando harmonia.",
          image: require('../../assets/images/hairstyles/heart/long_bob.jpg')
        },
        {
          name: "Camadas Médias",
          description: "Camadas médias começando na altura do queixo adicionam volume nas laterais, equilibrando as proporções do rosto.",
          image: require('../../assets/images/hairstyles/heart/camadas_medias.jpg')
        },
        {
          name: "Pixie com Franja Lateral",
          description: "Um corte curto com franja lateral longa suaviza a testa larga e adiciona balanço ao rosto em formato de coração.",
          image: require('../../assets/images/hairstyles/heart/pixie_franja.jpg')
        },
        {
          name: "Bob com Parte Lateral",
          description: "Um bob cortado na altura do queixo com parte lateral adiciona volume onde é necessário para equilibrar o formato de coração.",
          image: require('../../assets/images/hairstyles/heart/bob_lateral.jpg')
        }
      ],
      
      round: [
        {
          name: "Long Layers",
          description: "Camadas longas e angulares criam linhas verticais que alongam visualmente o rosto redondo.",
          image: require('../../assets/images/hairstyles/round/long_layers.jpg')
        },
        {
          name: "Bob Assimétrico",
          description: "Um bob angulado e assimétrico adiciona estrutura e ângulos que contrastam com as curvas do rosto redondo.",
          image: require('../../assets/images/hairstyles/round/bob_assimetrico.jpg')
        },
        {
          name: "Pixie com Volume no Topo",
          description: "Um corte curto com volume e altura no topo alonga visualmente o rosto, enquanto mantém as laterais mais curtas.",
          image: require('../../assets/images/hairstyles/round/pixie_volume.jpg')
        },
        {
          name: "Longo com Parte Central",
          description: "Cabelos longos com parte central criam linhas verticais que alongam o rosto redondo. Evite camadas excessivas nas laterais.",
          image: require('../../assets/images/hairstyles/round/longo_central.jpg')
        }
      ],
      
      square: [
        {
          name: "Bob Ondulado",
          description: "Ondas suaves na altura dos ombros suavizam os ângulos do rosto quadrado, adicionando feminilidade.",
          image: require('../../assets/images/hairstyles/square/bob_ondulado.jpg')
        },
        {
          name: "Camadas Longas",
          description: "Camadas longas e suaves ao redor do rosto suavizam a linha da mandíbula, criando um visual mais delicado.",
          image: require('../../assets/images/hairstyles/square/camadas_longas.jpg')
        },
        {
          name: "Pixie Texturizado",
          description: "Um corte pixie com textura e franja irregular cria um contraste suave com os ângulos fortes do rosto.",
          image: require('../../assets/images/hairstyles/square/pixie_texturizado.jpg')
        },
        {
          name: "Lob com Ondas",
          description: "Um long bob com ondas texturizadas suaviza os ângulos fortes do rosto quadrado e adiciona movimento.",
          image: require('../../assets/images/hairstyles/square/lob_ondas.jpg')
        }
      ],
      
      oblong: [
        {
          name: "Bob na Altura do Queixo",
          description: "Um bob curto na altura do queixo reduz visualmente o comprimento do rosto, criando a ilusão de maior largura.",
          image: require('../../assets/images/hairstyles/oblong/bob_queixo.jpg')
        },
        {
          name: "Franja Reta",
          description: "Uma franja reta e espessa encurta visualmente o rosto oblongo, quebrando a linha vertical longa.",
          image: require('../../assets/images/hairstyles/oblong/franja_reta.jpg')
        },
        {
          name: "Camadas nas Laterais",
          description: "Camadas volumosas nas laterais acrescentam largura ao rosto, equilibrando o formato alongado.",
          image: require('../../assets/images/hairstyles/oblong/camadas_laterais.jpg')
        },
        {
          name: "Curto Texturizado",
          description: "Um corte curto e texturizado com volume nas laterais equilibra o comprimento do rosto oblongo.",
          image: require('../../assets/images/hairstyles/oblong/curto_texturizado.jpg')
        }
      ],
    };
  
    // Retorna as recomendações para o formato de rosto especificado
    // Se o formato não for encontrado, retorna as recomendações para oval (formato padrão)
    return recommendations[faceShape] || recommendations.oval;
  };