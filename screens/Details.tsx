import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Linking, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {CoinDetail} from '../components/CoinType';
import {PriceDetail} from '../components/PriceType';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const {width} = Dimensions.get('window');

interface CoinHeaderProps {
  coinData: CoinDetail | null;
  onLinkPress: (url: string) => void;
}

interface CoinDataProps {
  coinData: CoinDetail | null;
}

interface CoinPriceProps {
  priceData: PriceDetail | null;
}

const CoinHeader = ({coinData, onLinkPress}: CoinHeaderProps) => (
  <View style={styles.container}>
    {coinData ? (
      <Image style={styles.coinImage} source={{uri: coinData.logo}} />
    ) : (
      <View style={styles.coinImage} />
    )}
    <View>
      <Text>{coinData ? coinData.symbol : 'coin symbol'}</Text>
      <Text style={styles.coinName}>
        {coinData ? coinData.name : 'coin name'}
      </Text>

      {coinData && (
        <View style={styles.siteLogoContainer}>
          {coinData.links.explorer && (
            <FontAwesome5
              name="info-circle"
              iconStyle="solid"
              size={18}
              color={'#1253ce'}
              onPress={() => onLinkPress(coinData.links.explorer[0])}
            />
          )}
          {coinData.links.facebook && (
            <FontAwesome5
              name="facebook"
              iconStyle="brand"
              size={18}
              color={'#1877F2'}
              onPress={() => onLinkPress(coinData.links.facebook[0])}
            />
          )}
          {coinData.links.reddit && (
            <FontAwesome5
              name="reddit"
              iconStyle="brand"
              color={'#FF4500'}
              size={18}
              onPress={() => onLinkPress(coinData.links.reddit[0])}
            />
          )}
          {coinData.links.source_code && (
            <FontAwesome5
              name="code"
              iconStyle="solid"
              size={18}
              color={'#008000'}
              onPress={() => onLinkPress(coinData.links.source_code[0])}
            />
          )}
          {coinData.links.website && (
            <FontAwesome5
              name="atlas"
              iconStyle="solid"
              size={18}
              color={'#1263ce'}
              onPress={() => onLinkPress(coinData.links.website[0])}
            />
          )}
          {coinData.links.youtube && (
            <FontAwesome5
              name="youtube"
              iconStyle="brand"
              size={18}
              color={'#FF0000'}
              onPress={() => onLinkPress(coinData.links.youtube[0])}
            />
          )}
        </View>
      )}
    </View>
  </View>
);

const CoinPrice = ({priceData}: CoinPriceProps) => (
  <Text style={styles.coinPrice}>
    {priceData ? `${priceData.quotes.KRW.price}KRW` : 'Coin Price'}
  </Text>
);

const CoinDescription = ({coinData}: CoinDataProps) => (
  <View style={styles.coinDescriptionContainer}>
    <Text style={styles.textFont}>Description</Text>
    <Text>{coinData ? coinData.description : 'description'}</Text>
  </View>
);

interface CoinEtcProps {
  rank: number | String;
  started_at: string;
  ath: number | string;
  fromAth: number | string;
}

const CoinEtcDescription = ({rank, started_at, ath, fromAth}: CoinEtcProps) => (
  <>
    <View style={styles.containerRowCenter}>
      <View style={styles.coinRankContainer}>
        <Text style={styles.textFont}>Rank</Text>
        <Text>{rank}</Text>
      </View>
      <View style={styles.coinStartedAtContainer}>
        <Text style={styles.textFont}>Started at</Text>
        <Text>{started_at}</Text>
      </View>
    </View>
    <View style={styles.containerRowCenter}>
      <View style={styles.coinATHContainer}>
        <Text style={styles.textFont}>All Time High</Text>
        <Text style={{textAlign: 'center'}}>{ath}KRW</Text>
      </View>
      <View style={styles.coinFromATHContainer}>
        <Text style={styles.textFont}>% from ATH</Text>
        <Text>{fromAth}%</Text>
      </View>
    </View>
  </>
);

const Details = () => {
  const route = useRoute();
  const {coinId} = route.params as {coinId: string};
  const [coinData, setCoinData] = useState<CoinDetail | null>(null);
  const [priceData, setPriceData] = useState<PriceDetail | null>(null);

  // coinId가 변경될때 마다 요청
  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `https://api.coinpaprika.com/v1/coins/${coinId}`,
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `https://api.coinpaprika.com/v1/tickers/${coinId}?quotes=KRW`,
        );
        const data = await response.json();
        setPriceData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoinDetails();
    fetchPrice();
  }, [coinId]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View>
      <CoinHeader coinData={coinData} onLinkPress={handleLinkPress} />
      <CoinPrice priceData={priceData} />
      <CoinDescription coinData={coinData} />
      <CoinEtcDescription
        rank={coinData ? coinData.rank : 'Coin Rank'}
        started_at={coinData ? coinData.started_at : 'started At'}
        ath={
          priceData?.quotes.KRW.ath_price
            ? `${priceData?.quotes.KRW.ath_price} KRW`
            : 'All Time High'
        }
        fromAth={
          priceData?.quotes.KRW.percent_from_price_ath
            ? `${priceData?.quotes.KRW.percent_from_price_ath} %`
            : 'All Time High'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: '3%',
    gap: '3%',
  },
  coinImage: {
    width: width / 5,
    height: width / 5,
  },
  coinName: {
    textAlignVertical: 'center',
    fontSize: 24,
  },
  coinPrice: {
    fontSize: 28,
    margin: '5%',
    marginTop: '0%',
  },
  coinDescriptionContainer: {
    width: width / 1.11,
    backgroundColor: '#eaeaea',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3%',
  },
  coinRankContainer: {
    width: width / 2.5,
    margin: '5%',
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3%',
  },
  coinStartedAtContainer: {
    width: width / 2.5,
    margin: '5%',
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3%',
  },
  coinATHContainer: {
    width: width / 2.5,
    margin: '5%',
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3%',
    marginTop: '0%',
  },
  coinFromATHContainer: {
    width: width / 2.5,
    margin: '5%',
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3%',
    marginTop: '0%',
  },
  textFont: {
    fontSize: 18,
  },
  containerRowCenter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  siteLogoContainer: {
    flexDirection: 'row',
    gap: '5%',
  },
});

export default Details;
/*
useRoute
    - Details파일에 전해진 정보를 가져올 수 있는 모듈
route.param: route에 전달된 정보들
*/
