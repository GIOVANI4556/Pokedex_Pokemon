import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

export const PokemonShow = item => {
  const {name, url, types, color, status} = item.item;
  const index = item.index;
  const pokemonsLength = item.pokemonsLength;
  const navigation = useNavigation();

  console.log('status', status);


  const pokemonNumber = url
    .replace('https://pokeapi.co/api/v2/pokemon/', '')
    .replace('/', '');

  const imageUrl =
    'https://pokeres.bastionbot.org/images/pokemon/' + pokemonNumber + '.png';

  return (
    <TouchableOpacity
      title="Detalhes"
      onPress={() =>
        navigation.navigate('Detalhes', {
          ...item.item,
          itemImg: imageUrl,
        })
      }
      style={{
        backgroundColor: color,
        flex: index % 2 === 0 && index === pokemonsLength - 1 ? 0.5 : 1,
        marginRight: index % 2 === 0 && index === pokemonsLength - 1 ? 50 : 10,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Text
        style={{
          color: '#ffff',
          fontWeight: 'bold',
          fontSize: 18,
          textTransform: 'capitalize',
          marginBottom: 10,
        }}>
        {name}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          {types &&
            types.length &&
            types.map((type, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.30)',
                    marginBottom: 5,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#ffff',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      textTransform: 'capitalize',
                    }}>
                    {type.type.name}
                  </Text>
                </View>
              );
            })}
        </View>
        <Image
          style={{
            width: 60,
            height: 60,
          }}
          source={{uri: imageUrl}}
        />
      </View>
    </TouchableOpacity>
  );
};
