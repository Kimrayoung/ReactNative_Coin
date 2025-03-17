// HorizontalSearchList.js 또는 원하는 이름으로 컴포넌트 파일 생성
import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SearchComponents from './SearchComponents'; // 경로는 실제 구조에 맞게 조정
import {Search} from './SearchType';

interface DataProps {
  data:
    | Search['currencies']
    | Search['icos']
    | Search['exchanges']
    | Search['people']
    | Search['tags'];
}

const SearchFlatListComponents = ({data}: DataProps) => {
  return (
    <View style={[styles.flatlistContainer]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{
          paddingRight: '10%',
        }}
        renderItem={({item}) => {
          return (
            <SearchComponents
              rank={'rank' in item ? (item.rank as number) : null}
              name={item.name}
              symbol={'symbol' in item ? item.symbol : null}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    margin: '5%',
  },
});

export default SearchFlatListComponents;
