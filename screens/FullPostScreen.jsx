import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { Loading } from '../components/Loader';
import { axiosInstance } from '../API';
import { DOMEN } from '../consts';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`;

const PostDetails = styled.View`
  flex-direction: column;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
  color: #000; /* Цвет текста черный */
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #e0f7fa; /* Голубой фон */
`;

const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const { id, name } = route.params;

  const fetchGroup = () => {
    navigation.setOptions({
      name,
    });

    axiosInstance
      .get(`/services/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка, не удалось получить услугу');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchGroup, []);

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  const image = `http://${DOMEN}/api/services/${data.id}/image/`;

  return (
    <ScrollView>
      <Container>
        <PostImage source={{ uri: image }} />
        <PostDetails>
          <PostText>
            <BoldText>Название:</BoldText> {data.name}
          </PostText>
          <PostText>
            <BoldText>Описание:</BoldText> {data.description}
          </PostText>
        </PostDetails>
      </Container>
    </ScrollView>
  );
};

export default FullPostScreen;
