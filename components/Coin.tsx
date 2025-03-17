import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {CoinProps, CoinDetail} from './CoinType';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const CoinContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin: 3%;
  background-color: #eaeaea;
  padding: 3%;
  gap: 8%;
  border-radius: 10px;
`;

const Coin = ({id, name, rank, symbol, isNew}: CoinProps) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Details', {coinId: id});
  };
  return (
    <View>
      {isNew && (
        <View style={{marginTop: '3%', marginBottom: '-3%', marginLeft: '3%'}}>
          <Text style={{fontSize: 16, color: 'red'}}>New!</Text>
        </View>
      )}
      <CoinContainer onPress={handlePress}>
        <Text style={{fontSize: 16, textAlignVertical: 'center'}}>{rank}</Text>
        <Image
          source={{uri: `https://static.coinpaprika.com/coin/${id}/logo.png`}}
          style={{width: width / 10, height: width / 10}}
        />
        <View>
          <Text style={{fontSize: 12}}>{symbol}</Text>
          <Text style={{color: 'black', fontSize: 16}}>{name}</Text>
        </View>
      </CoinContainer>
    </View>
  );
};

export default Coin;

/*
typeScript에서 String과 string의 차이점
- string: Typescript의 기본 원시 타입 즉, 우리가 그냥 사용하는 문자열 타입이다
- String: javascript의 내장 객체인 String생성자를 참조 -> 문자열을 다루기 위한 메서드와 속성을 가진 객체 랩퍼(ex. String(12))

재할당과 변경 불가능의 차이

*/
