import axios from 'axios';
import React, {useEffect, useState, componentDidMount} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PokemonShow} from '../PokemonCardList';
import {styles} from '../../Styles';

export const Poke = () => {
  const [pokemons, setPokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchfield, setSearchfield] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const colorByTypes = {
    bug: '#729f3f',
    dragon: '#d1786e',
    fairy: '#fdb9e9',
    fire: '#fd7d24',
    ghost: '#7b62a3',
    ground: '#ccb740',
    normal: '#a4acaf',
    psychic: '#f366b9',
    steel: '#9eb7b8',
    dark: '#707070',
    electric: '#eed535',
    fighting: '#d56723',
    flying: '#7ac0d4',
    grass: '#9bcc50',
    ice: '#51c4e7',
    poison: '#b97fc9',
    rock: '#a38c21',
    water: '#4592c4',
  };

  const addPokemonTypeToResults = results => {
    return new Promise((resolve, reject) => {
      let requests = 0;
      results.map((result, index) => {
        axios
          .get('https://pokeapi.co/api/v2/pokemon/' + result.name)
          .then(data => {
            requests++;
            const status = data.data;
            const types = data.data.types;
            result.status = status;
            result.types = types;
            result.color = colorByTypes[types[0].type.name];
            if (requests === results.length) {
              resolve(results);
            }

            return result;
          })
          .catch(Error => {
            requests++;
            if (requests === results.length) {
              resolve(results);
            }
            console.error(Error);
          });
      });
    });
  };

  const filtePokemons = textFilter => {
    if (textFilter === '') {
      setResults(pokemons);
    } else {
      setResults(
        pokemons.filter(item => {
          if (item.name.toLowerCase().indexOf(textFilter.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        }),
      );
    }
  };

  // useEffect(filtePokemons, [searchfeild]);

  async function loadPage(isLoadingMore = false, force = false) {
    if (searchfield === '' || force) {
      if (isLoadingMore) {
        setLoadingMore(true);
      }
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${force ? 0 : page}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          addPokemonTypeToResults(data.results).then(newResults => {
            setPokes(force ? newResults : [...results, ...newResults]);
            setResults(force ? newResults : [...results, ...newResults]);
            setPage(force ? 8 : page + 8);
            setLoading(false);
            setLoadingMore(false);
          });
        });
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  const handleOnChangeText = name => {
    setSearchfield(name);
    filtePokemons(name);
  };

  const handleOnEndReached = () => {
    loadPage(true);
  };

  const habdleOnRefresh = () => {
    setSearchfield('');
    setPage(0);
    setPokes([]);
    setResults([]);
    setLoading(true);
    loadPage(false, true);
  };

  const renderListFooterComponent = () => {
    if (loadingMore) {
      return <ActivityIndicator size="small" color="black" />;
    } else {
      return null;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <PokemonShow item={item} index={index} pokemonsLength={results.length} />
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="black" />
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
            }}>
            Carregando Pokedex
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              padding: 10,
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            Pokedex
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Icon
              style={{padding: 10}}
              name="search"
              size={20}
              color={'#424242'}
            />
            <TextInput
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 0,
                backgroundColor: '#fff',
                color: '#424242',
              }}
              placeholder="Search Pokemons"
              onChangeText={handleOnChangeText}
              value={searchfield}
            />
          </View>
          <FlatList
            numColumns={2}
            data={results}
            keyExtractor={(pokemon, index) => `${index}`}
            onEndReached={handleOnEndReached}
            onEndReachedThreshold={0.1}
            renderItem={renderItem}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            ListFooterComponent={renderListFooterComponent}
            refreshing={loading}
            onRefresh={habdleOnRefresh}
          />
        </View>
      )}
    </View>
  );
};
