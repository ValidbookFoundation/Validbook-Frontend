import dataURItoBlob from '../utils/dataURItoBlob';
import {
  LOAD_BOOKTREE,
  LOAD_BOOKTREE_SUCCESS,
  LOAD_BOOKTREE_FAIL,
  SHOW_BOOK,
  SHOW_BOOK_SUCCESS,
  SHOW_BOOK_FAIL,
  SHOW_NEXT_BOOK,
  SHOW_NEXT_BOOK_SUCCESS,
  SHOW_NEXT_BOOK_FAIL,
  CREATE_BOOK,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAIL,
  EDIT_BOOK,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAIL,
  MOVE_BOOK,
  MOVE_BOOK_SUCCESS,
  MOVE_BOOK_FAIL,
  GET_ARR_CHECKBOX,
  UPLOAD_BOOK_COVER,
  UPLOAD_BOOK_COVER_SUCCESS,
  UPLOAD_BOOK_COVER_FAIL,
  CLEAR_BOOKSTORIES,
  CLEAR_BOOKTREE,
  UPLOAD_BOOK_COVER_BASE64,
  VIEW_MORE_COMMENTS,
  VIEW_MORE_COMMENTS_SUCCESS,
  VIEW_MORE_COMMENTS_FAIL,
  SHOW_SUBBOKS_CURRENT_BOOK,
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAIL,
  DELETE_BOOK,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAIL
} from '../constants/book';

export function clearBookStories() {
  return {
    type: CLEAR_BOOKSTORIES
  };
}

export function clearBookTree() {
  return {
    type: CLEAR_BOOKTREE
  };
}

export function getBookTree(user_slug) {
  return {
    types: [LOAD_BOOKTREE, LOAD_BOOKTREE_SUCCESS, LOAD_BOOKTREE_FAIL],
    promise: (client) => client.get('/books/tree', { params: { user_slug }}),
  };
}

export function show(slug) {
  const book_slug = slug || '';
  return {
    types: [SHOW_BOOK, SHOW_BOOK_SUCCESS, SHOW_BOOK_FAIL],
    promise: (client) => client.get(`/books/${book_slug}`, { params: { page: 1 }}),
    book_slug
  };
}

export function next(slug, page) {
  const book_slug = slug || '';
  return {
    types: [SHOW_NEXT_BOOK, SHOW_NEXT_BOOK_SUCCESS, SHOW_NEXT_BOOK_FAIL],
    promise: (client) => client.get(`/books/${book_slug}`, { params: { stories_page: page }}),
    page,
    book_slug
  };
}

export function createBook(name, parent_slug) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.post('/books', { data: { name, parent_slug }})
  };
}

export function edit(book_slug, name, description) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.patch('/book', { data: { book_slug, name, description }})
  };
}

export function move(book_slug, book_parent_slug, book_before_slug) {
  return {
    types: [MOVE_BOOK, MOVE_BOOK_SUCCESS, MOVE_BOOK_FAIL],
    promise: (client) => client.post('/book/move', { data: { book_slug, book_parent_slug, book_before_slug }})
  };
}

export function getCheckboxOfBook(checkbox) {
  return {
    type: GET_ARR_CHECKBOX,
    checkbox
  };
}

export function upload(picture, color, book_id, name) {
  const formData = new FormData();
  if (picture) { formData.append('file', dataURItoBlob(picture), name); }
  formData.append('color', color);
  formData.append('book_id', book_id);
  return {
    types: [UPLOAD_BOOK_COVER, UPLOAD_BOOK_COVER_SUCCESS, UPLOAD_BOOK_COVER_FAIL],
    promise: (client) => client.post('/upload/book-cover', {data: formData})
  };
}

export function uploadBookCoverBase64(bookCoverBase64) {
  return {
    type: UPLOAD_BOOK_COVER_BASE64,
    bookCoverBase64
  };
}

export const getNextBooks = (user_slug, pagination) => {
  return {
    types: [VIEW_MORE_COMMENTS, VIEW_MORE_COMMENTS_SUCCESS, VIEW_MORE_COMMENTS_FAIL],
    promise: (client) => client.get('/books', {params: {page: pagination, user_slug}})
  };
};

export function showSubBooksCurrentBook(subbooks) {
  return {
    type: SHOW_SUBBOKS_CURRENT_BOOK,
    subbooks
  };
}

export function getBooks(user_slug, book) {
  const book_slug = book || '';
  return {
    types: [GET_BOOKS, GET_BOOKS_SUCCESS, GET_BOOKS_FAIL],
    promise: (client) => client.get('/books', {params: {user_slug, book_slug}})
  };
}

export const deleteBook = (book_slug) => {
  return {
    types: [DELETE_BOOK, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAIL],
    promise: (client) => client.del('/books', {params: {book_slug}}),
    book_slug
  };
};
