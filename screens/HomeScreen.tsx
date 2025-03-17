import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Coin from '../components/Coin';

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const HomeScreen = () => {
  const [coinListData, setCoinListData] = useState<Coin[]>([]);
  const mockCoin: Coin[] = [
    {
      id: 'btc-bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      rank: 1,
      is_new: false,
      is_active: true,
      type: 'coin',
    },
    {
      id: 'btc-bitcoin',
      name: 'Bitcoin22',
      symbol: 'BTC',
      rank: 2,
      is_new: false,
      is_active: true,
      type: 'coin',
    },
    {
      id: 'btc-bitcoin',
      name: 'Bitcoin333',
      symbol: 'BTC',
      rank: 3,
      is_new: false,
      is_active: true,
      type: 'coin',
    },
    {
      id: 'btc-bitcoin',
      name: 'Bitcoin4444',
      symbol: 'BTC',
      rank: 4,
      is_new: true,
      is_active: true,
      type: 'coin',
    },
  ];

  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        // const response = await fetch('https://api.coinpaprika.com/v1/coins');
        // const data = await response.json();
        // if (data && Array.isArray(data)) {
        //   setCoinListData(data.slice(0, 10));
        // } else {
        //   console.log('Data is not an array:', data);
        //   setCoinListData(mockCoin);
        // }

        setCoinListData(mockCoin);
        console.log(coinListData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoinList();
  }, []);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: '25%'}}>
      <View style={{flexDirection: 'row', height: '10%'}}>
        <Image
          source={require('../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png')}
          style={{width: '20%', height: '100%'}}
        />
        <Text
          style={{textAlignVertical: 'center', fontSize: 16, fontWeight: 500}}>
          Coin Top 100
        </Text>
      </View>
      {coinListData ? (
        <View>
          {coinListData.map(coinData => {
            return (
              <View key={coinData.rank}>
                <Coin
                  id={coinData.id}
                  name={coinData.name}
                  rank={coinData.rank}
                  symbol={coinData.symbol}
                  isNew={coinData.is_new}
                />
              </View>
            );
          })}
        </View>
      ) : (
        <View />
      )}
    </ScrollView>
  );
};

export default HomeScreen;
