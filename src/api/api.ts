import { IBook } from '../interfaces';

const BASE_URL = 'http://localhost:3004';

const request = async(url: string, options?: object) => {
  const response = await fetch(`${BASE_URL}${url}`, options)
    if (!response.ok) {
      throw `${response.status} - ${response.statusText}`
    }
    return response.json();
};

const post = (url: string, data: IBook) => {
  return request(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
  })
}

const patch = (url: string, data: object) => {
  return request(url, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
  });
}

const remove = (url: string) => {
  return request(url, {method: 'DELETE'});
}

export const deleteBook = (bookId: number) => {
  return remove(`/books/${bookId}`);
}

export const updateBook = (bookId: number, updatedBook: object) => {
  return patch(`/books/${bookId}`, updatedBook);
}

export const addBook = (book: IBook) => {
  return post('/books', {
    ...book,
  });
}

export const getBooks = () => request('/books');

