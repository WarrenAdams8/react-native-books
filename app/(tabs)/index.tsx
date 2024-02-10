import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { H4, YStack } from 'tamagui';

import { getBooks, getSingleBook } from '~/api/bookapi';

export default function TabOneScreen() {
  const books = useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  useQuery({
    queryKey: ['SingleBook'],
    queryFn: () => getSingleBook(),
  });

  return (
    <YStack flex={1} space="$2" borderWidth={2} borderColor="$color" borderRadius="$4" padding="$2">
      <FlashList
        data={books.data}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            <Pressable>
              <H4 padding="$2" color="$blue10Dark">
                {item.volumeInfo.title}
              </H4>
            </Pressable>
          </Link>
        )}
        estimatedItemSize={30}
      />
    </YStack>
  );
}
