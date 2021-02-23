import React, { useEffect, useMemo, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { AddBook } from './components/AddBook';
import { EditBook } from './components/EditBook';
import { IBook } from './interfaces';
import * as api from './api/api';

const App: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [editId, seteditId] = useState<number>(0);

  useEffect(() => {
    loadBooks()
  }, [reload]);

  const loadBooks = async() => {
    const loadedBooks = await api.getBooks();

    setBooks(loadedBooks);
  };

  const onRemove = (id: number) => {
    api.deleteBook(id);
    setReload(!reload);
  };

  const onEdit = (id: number) => {
    seteditId(id);
  };

  const onAdd = (book: IBook) => {
    api.addBook(book);
    setReload(!reload);
  };

  const setEditedBook = (book: IBook) => {
    api.updateBook(book.id, book)
    setReload(!reload);
  };

  const bookToEdit: IBook | undefined = useMemo(() => {
    return books.find(book => book.id === editId)
  }, [editId]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Dashboard
            books={books}
            onDelete={onRemove}
            onEdit={onEdit}
          />
        </Route>
        <Route path="/add">
          <AddBook onAdd={onAdd}/>
        </Route>
        <Route path="/edit">
          <EditBook bookToEdit={bookToEdit} getEditedBook={setEditedBook} />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
