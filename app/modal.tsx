import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { YStack, Paragraph, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';

import { getBooks, getSingleBook } from '~/api/bookapi';

export default function ModalScreen() {
  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  const singleBookQuery = useQuery({
    queryKey: ['book'],
    queryFn: () => getSingleBook(),
  });

  const test = 'darry+Potter';
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Paragraph>{`${process.env.EXPO_PUBLIC_GOOGLE_BOOKS_URL}`}</Paragraph>
        <Paragraph>
          {`${process.env.EXPO_PUBLIC_GOOGLE_BOOKS_URL}/${test}${process.env.EXPO_PUBLIC_PARAMS}`}
        </Paragraph>
        <Separator />
        <EditScreenInfo path="app/modal.tsx" />
      </YStack>
    </Theme>
  );
}
