import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {Line} from '../';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PokesDetlhes = ({route}) => {
  const navigation = useNavigation();

  const {
    name = '',
    url = '',
    types = [],
    color = '',
    itemImg = '',
    status = '',
  } = route.params;

  const statusList = [
    {
      name: 'Experience',
      value: status.base_experience,
    },

    {
      name: 'Height',
      value: status.height,
    },
    {
      name: 'Weight',
      value: status.weight,
    },
  ];

  const renderStatusItem = ({item, index}) => {
    const isLastItem = index === statusList.length - 1;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>{item.name}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            {item.value}
          </Text>
        </View>
        {!isLastItem && <Line color={'rgba(255, 255, 255, 0.30)'} />}
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: color,
        flex: 1,
      }}>
      <View style={{flex: 1, padding: 10}}>
        <View style={{width: 40, height: 40, marginLeft: -10, marginTop: -10}}>
          <TouchableOpacity title="Poke" onPress={() => navigation.pop()}>
            <View style={{paddingLeft: 10, paddingTop: 10}}>
              <Icon
                style={{marginBottom: 10}}
                name="arrow-left"
                size={22}
                color={'#fff'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 25,
            textTransform: 'capitalize',
            marginBottom: 10,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginBottom: 10,
              paddingHorizontal: 5,
            }}>
            {types &&
              types.length &&
              types.map((type, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderColor: '#fff',
                      borderWidth: 1,
                      marginBottom: 5,
                      borderRadius: 100,
                      justifyContent: 'center',
                      minWidth: 60,
                      paddingHorizontal: 10,
                      marginRight: index + 1 !== types.length ? 10 : 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
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
          <View style={{marginHorizontal: 10}}>
            <FlatList
              data={statusList}
              renderItem={renderStatusItem}
              keyExtractor={(status, index) => `${index}`}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
               <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                height: 200,
                right:-15,
                position:'absolute',
                tintColor:'rgba(255, 255, 255, 0.30)' 
                
              }}
              source={require('../../Img/pokeball.png')}
            />
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 250,
                height: 250,
              }}
              source={{uri: itemImg}}
            />
          </View>
        </View>
      </View>
     
      <Image
        style={{alignSelf: 'flex-end', width: '100%', height: '15%'}}
        resizeMode={'stretch'}
        source={require('../../Img/onda.png')}
      />
    </View>
  );
};
