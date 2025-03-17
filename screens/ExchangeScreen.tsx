import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet, Linking} from 'react-native';
import {Exchange} from '../components/ExchangeType';
import styled from 'styled-components/native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const TagContainer = styled.View`
  margin: 5%;
  padding: 5%;
  border-radius: 5px;
  background-color: #eaeaea;
`;

const ExchangeScreen = () => {
  const [exchangeData, setExchangeData] = useState<Exchange[] | null>(null);

  // coinId가 변경될때 마다 요청
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch(
          'https://api.coinpaprika.com/v1/exchanges',
        );
        const data = await response.json();
        setExchangeData(data);
        console.log(exchangeData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTag();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.AllCoinTagText}>All Coin Exchanges</Text>
      {exchangeData &&
        exchangeData.map(e => {
          return (
            <TagContainer key={e.id}>
              {e.active === false ? (
                <View style={styles.activeView}>
                  <Text style={styles.ActiveText}>Active</Text>
                </View>
              ) : (
                <View style={styles.passiveView}>
                  <Text style={styles.ActiveText}>Passive</Text>
                </View>
              )}
              <View style={styles.linkContainer}>
                <Text style={styles.tagNameText}>{e.name}</Text>

                {e.links && e.links.website && (
                  <FontAwesome5
                    name="atlas"
                    iconStyle="solid"
                    size={18}
                    style={styles.linkIconStye}
                    color={'#1263ce'}
                    onPress={() => Linking.openURL(e.links.website[0])}
                  />
                )}
                {e.links && e.links.twitter && (
                  <FontAwesome5
                    name="twitter"
                    iconStyle="brand"
                    size={18}
                    style={styles.linkIconStye}
                    color={'#1DAaF2'}
                    onPress={() => Linking.openURL(e.links.twitter[0])}
                  />
                )}
              </View>
              {e.description ? (
                <Text>{e.description}</Text>
              ) : (
                <Text>No Description</Text>
              )}
            </TagContainer>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tagNameText: {
    fontSize: 24,
    color: 'black',
  },
  AllCoinTagText: {
    fontSize: 28,
    color: 'black',
    marginTop: '8%',
    textAlign: 'center',
    fontWeight: '500',
  },
  tagTypeContainer: {
    flexDirection: 'row',
  },

  activeView: {
    backgroundColor: '#47ce12',
    borderRadius: 10,
    width: '20%',
    paddingVertical: '2%',
  },

  passiveView: {
    backgroundColor: '#bc1717',
    borderRadius: 10,
    width: '20%',
    paddingVertical: '2%',
  },
  ActiveText: {
    color: 'white',
    textAlign: 'center',
  },

  technicalTagText: {
    color: 'white',
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: '3%',
  },
  linkIconStye: {
    marginTop: '2%',
  },
});

export default ExchangeScreen;
