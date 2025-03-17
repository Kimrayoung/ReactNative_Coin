// 코인 관련 서비스를 알려주는 부분
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {Tag} from '../components/TagType';
import styled from 'styled-components/native';

const TagContainer = styled.View`
  margin: 5%;
  padding: 5%;
  border-radius: 5px;
  background-color: #eaeaea;
`;

const TagsScreen = () => {
  const [tagData, setTagData] = useState<Tag[] | null>(null);

  // coinId가 변경될때 마다 요청
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch('https://api.coinpaprika.com/v1/tags');
        const data = await response.json();
        setTagData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTag();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.AllCoinTagText}>All Coin Tags</Text>
      {tagData &&
        tagData.map(t => {
          return (
            <TagContainer key={t.id}>
              {t.type === 'functional' && (
                <View style={styles.functionalTagView}>
                  <Text style={styles.functionTagText}>Functional</Text>
                </View>
              )}
              {t.type === 'technical' && (
                <View style={styles.technicalTagView}>
                  <Text style={styles.functionTagText}>Technical</Text>
                </View>
              )}
              <Text style={styles.tagNameText}>{t.name}</Text>
              {t.description ? (
                <Text>{t.description}</Text>
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
  functionalTagView: {
    backgroundColor: '#1263ce',
    borderRadius: 10,
    width: '20%',
    paddingVertical: '2%',
  },

  technicalTagView: {
    backgroundColor: '#13b513',
    borderRadius: 10,
    width: '20%',
    paddingVertical: '2%',
  },
  functionTagText: {
    color: 'white',
    textAlign: 'center',
  },

  technicalTagText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TagsScreen;
