import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Search} from '../components/SearchType';
import SearchFlatListComponents from '../components/SearchFlatListComponents';

const width = Dimensions.get('window').width;

const InputView = styled.View`
  background-color: #eaeaea;
  width: ${width / 1.11}px;
  align-self: center;
  border-radius: 10px;
  margin: 5%;
`;

const SectionText = styled.Text`
  font-size: 24px;
  margin: 5%;
`;

const SearchScreen = () => {
  const [inputValue, setInputVale] = useState<string | null>(null);
  const [searchResultData, setSearchResultData] = useState<Search | null>(null);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        if (inputValue) {
          const response = await fetch(
            `https://api.coinpaprika.com/v1/search?q=${inputValue}`,
          );
          const data = await response.json();
          setSearchResultData(data);
          console.log(searchResultData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearch();
  }, [inputValue]);

  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <InputView>
          <TextInput
            placeholder="Search..."
            // onChangeText={v => setInputVale(v)}
            onSubmitEditing={event => {
              const searchText = event.nativeEvent.text;
              setInputVale(searchText);
            }}
          />
        </InputView>
      </View>
      {searchResultData ? (
        <ScrollView>
          <View>
            <SectionText>Currencies</SectionText>
            <SearchFlatListComponents data={searchResultData.currencies} />
          </View>
          <View>
            <SectionText>Exchanges</SectionText>
            <SearchFlatListComponents data={searchResultData.exchanges} />
          </View>
          <View>
            <SectionText>Icos</SectionText>
            <SearchFlatListComponents data={searchResultData.icos} />
          </View>
          <View>
            <SectionText>People</SectionText>
            <SearchFlatListComponents data={searchResultData.people} />
          </View>
          <View>
            <SectionText>Tags</SectionText>
            <SearchFlatListComponents data={searchResultData.tags} />
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text>no data</Text>
        </View>
      )}
      ;
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginTop: '10%',
  },

  flatlistView: {
    backgroundColor: '#cccccc',
    padding: '3%',
    borderRadius: 5,
  },
  itemNameText: {
    fontSize: 20,
  },
});

export default SearchScreen;
