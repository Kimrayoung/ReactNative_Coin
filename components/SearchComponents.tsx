import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface SearchItemProps {
  rank: number | null;
  name: string;
  symbol: string | null;
}

const SearchComponents = ({rank, name, symbol}: SearchItemProps) => {
  return (
    <View style={styles.flatlistView}>
      {rank && <Text style={styles.rankText}>{rank}</Text>}
      {symbol && (
        <View style={styles.symbolView}>
          <Text style={styles.symbolText}>{symbol}</Text>
        </View>
      )}
      <Text style={styles.itemNameText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistView: {
    backgroundColor: '#cccccc',
    padding: '3%',
    borderRadius: 5,
  },
  itemNameText: {
    fontSize: 20,
  },
  symbolView: {
    backgroundColor: 'white',
    width: 50,
    alignSelf: 'center',
    borderRadius: 5,
  },
  symbolText: {
    textAlign: 'center',
  },
  rankText: {
    textAlign: 'center',
  },
});

export default SearchComponents;
