import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {CoinDetail} from '../components/CoinType';
import {FontAwesome5} from '@react-native-vector-icons/fontawesome5';

const {width, height} = Dimensions.get('window');

const Details = () => {
  const route = useRoute();
  const {coinId} = route.params as {coinId: String};
  const [coinData, setCoinData] = useState<CoinDetail | null>(null);
  // coinId가 변경될때 마다 요청
  //   useEffect(() => {
  //     const fetchCoinDetails = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://api.coinpaprika.com/v1/coins/${coinId}`,
  //         );
  //         const data = await response.json();
  //         setCoinData(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchCoinDetails();
  //   }, [coinId]);
  return (
    <View>
      {coinData ? (
        <View>
          <View style={{flexDirection: 'row', margin: '3%', gap: '3%'}}>
            <View
              style={{
                width: width / 5,
                height: width / 5,
                backgroundColor: '#cccccc',
                borderRadius: 50,
              }}
            />
            <View>
              <Text>coin symbol</Text>
              <Text style={{textAlignVertical: 'center', fontSize: 24}}>
                coin name
              </Text>
            </View>
          </View>
          <Text style={{fontSize: 28, margin: '5%', marginTop: '0%'}}>
            Coin Price
          </Text>
          <View
            style={{
              width: width / 1.11,
              backgroundColor: '#eaeaea',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 5,
              padding: '3%',
            }}>
            <Text style={{fontSize: 18}}>Description</Text>
            <Text>Coin Description</Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
              }}>
              <Text style={{fontSize: 18}}>Rank</Text>
              <Text>Coin Rank</Text>
            </View>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
              }}>
              <Text style={{fontSize: 18}}>Started at</Text>
              <Text>Coin started_at</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
                marginTop: '0%',
              }}>
              <Text style={{fontSize: 18}}>All Time High</Text>
              <Text>Coin ATH</Text>
            </View>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
                marginTop: '0%',
              }}>
              <Text style={{fontSize: 18}}>% from ATH</Text>
              <Text>% from ATH</Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View style={{flexDirection: 'row', margin: '3%', gap: '3%'}}>
            <View
              style={{
                width: width / 5,
                height: width / 5,
                backgroundColor: '#cccccc',
                borderRadius: 50,
              }}
            />
            <View>
              <Text>coin symbol</Text>
              <Text style={{textAlignVertical: 'center', fontSize: 24}}>
                coin name
              </Text>
            </View>
          </View>
          <Text style={{fontSize: 28, margin: '5%', marginTop: '0%'}}>
            Coin Price
          </Text>
          <View
            style={{
              width: width / 1.11,
              backgroundColor: '#eaeaea',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 5,
              padding: '3%',
            }}>
            <Text style={{fontSize: 18}}>Description</Text>
            <Text>Coin Description</Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
              }}>
              <Text style={{fontSize: 18}}>Rank</Text>
              <Text>Coin Rank</Text>
            </View>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
              }}>
              <Text style={{fontSize: 18}}>Started at</Text>
              <Text>Coin started_at</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
                marginTop: '0%',
              }}>
              <Text style={{fontSize: 18}}>All Time High</Text>
              <Text>Coin ATH</Text>
            </View>
            <View
              style={{
                width: width / 2.5,
                margin: '5%',
                backgroundColor: '#eaeaea',
                alignItems: 'center',
                borderRadius: 5,
                padding: '3%',
                marginTop: '0%',
              }}>
              <Text style={{fontSize: 18}}>% from ATH</Text>
              <Text>% from ATH</Text>
            </View>
          </View>
        </View>
      )}
      ;
    </View>
  );
};

const styles = StyleSheet.create({});

export default Details;

/*
useRoute
    - Details파일에 전해진 정보를 가져올 수 있는 모듈
route.param: route에 전달된 정보들
*/
