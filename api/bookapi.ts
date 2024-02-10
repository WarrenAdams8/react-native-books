import { booksApiResponseSchema, BooksApiResponse, Book, bookSchema } from '~/types/BookTypes';

const BOOKS_URL = process.env.EXPO_PUBLIC_GOOGLE_BOOKS_URL;
const PARAMS = process.env.EXPO_PUBLIC_PARAMS;

export const getBooks = async (query = 'Harry+Potter'): Promise<Book[]> => {
  const response = await fetch(`${BOOKS_URL}?q=${query}${PARAMS}`);
  const data: BooksApiResponse = await response.json();

  const validatedBooks = booksApiResponseSchema.safeParse(data);

  if (!validatedBooks.success) {
    console.error(validatedBooks.error);
    return [];
  }

  return validatedBooks.data.items;
};

export const getSingleBook = async (id = 'wrOQLV6xB-wC'): Promise<Book> => {
  const response = await fetch(`${BOOKS_URL}/${id}`);
  const data: unknown = await response.json();

  const validatedBook = bookSchema.safeParse(data);

  if (validatedBook.success) {
    return validatedBook.data;
  } else {
    console.error(validatedBook.error);
    throw new Error('error');
  }
};
