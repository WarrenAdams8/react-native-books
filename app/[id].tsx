import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, H3, ScrollView, Image, YStack, Paragraph } from 'tamagui';

import { getSingleBook } from '~/api/bookapi';

const Details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const book = useQuery({
    queryKey: ['SingleBook'],
    queryFn: () => getSingleBook(id),
  });

  return (
    <ScrollView>
      <YStack flex={1} alignItems="center" padding="$3">
        <Image
          source={{
            uri: book.data?.volumeInfo.imageLinks.image,
            width: 200,
            height: 300,
          }}
        />
        <H3 color="$blue10Dark" padding="$3">
          {book.data?.volumeInfo.title}
        </H3>
        <Paragraph color="$blue11Light">{book.data?.volumeInfo.authors[0]}</Paragraph>
        <Paragraph color="$blue10Light" padding="$2">
          {book.data?.volumeInfo.categories[0]}
        </Paragraph>
        <Text>{book.data?.volumeInfo.description}</Text>
      </YStack>
    </ScrollView>
  );
};

export default Details;
