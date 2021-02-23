import React, { useState } from 'react';
import ClassNames from 'classnames';
import { IBook } from '../interfaces';
import { NavLink } from 'react-router-dom';

type AddBookProps = {
  onAdd: (book: IBook) => void
}

export const AddBook: React.FC<AddBookProps> = ({ onAdd }) => {
  const [queryTitle, setQueryTitle] = useState<string>('');
  const [queryAuthor, setQueryAuthor] = useState<string>('');
  const [queryISBN, setQueryISBN] = useState<string>('');
  const [select, setSelect] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [authorError, setAuthorError] = useState<boolean>(false);
  const [isbnError, setIsbnError] = useState<boolean>(false);
  const [selectError, setSelectError] = useState<boolean>(false);

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = event.target;

    switch(name) {
      case 'title':
        setQueryTitle(value);
        break;
      case 'author':
        setQueryAuthor(value);
        break;
      case 'category':
        setSelect(value);
        break;
      case 'ISBN':
        (Number(value) || value === '') && setQueryISBN(value);
        console.log(typeof value);
        break;
      default:
        break;
    };
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (queryTitle && queryAuthor && queryISBN && select) {
      onAdd({
        "title": queryTitle,
        "author": queryAuthor,
        "category": select,
        "ISBN": +queryISBN,
        "id": +new Date(),
      });
      setQueryTitle('');
      setQueryAuthor('');
      setQueryISBN('');
      setSelect('');
      setTitleError(false);
      setAuthorError(false);
      setIsbnError(false);
      setSelectError(false);
    }

    !queryTitle && setTitleError(true);
    !queryAuthor && setAuthorError(true);
    !queryISBN && setIsbnError(true);
    !select && setSelectError(true);
  };

  return (
    <>
      <div className="pad10 deep-purple lighten-2">
        <h4 className="center-align">Add Book</h4>
      </div>
      <div className="row center-align pad30 deep-purple lighten-5">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s8 offset-s2">
              <input
                className={ClassNames({
                  "invalid": titleError,
                  "valid": !titleError,
                })}
                name="title"
                id="book_title"
                type="text"
                value={queryTitle}
                onChange={(event) => {
                  handleInputs(event);
                  setTitleError(false);
                }}
              />
              <label htmlFor="book_title">Book title</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s8 offset-s2">
              <input
                className={ClassNames({
                  "invalid": authorError,
                  "valid": !authorError,
                })}
                name="author"
                id="author_name"
                type="text"
                value={queryAuthor}
                onChange={(event) => {
                  handleInputs(event);
                  setAuthorError(false);
                }}
              />
              <label htmlFor="author_name">Author name</label>
            </div>
          </div>

          <div className="input-field col s6 offset-s3">
            {selectError && <span className="red-text">Select any category</span>}
            <select
              className="browser-default"
              name="category"
              value={select}
              onChange={(event) => {
                handleInputs(event);
                setSelectError(false);
              }}
            >
              <option value="" disabled selected>Choose category</option>
              <option value="novel">novel</option>
              <option value="myth">myth</option>
              <option value="horror">horror</option>
              <option value="poem">poem</option>
              <option value="autobiography">autobiography</option>
              <option value="detective">detective</option>
              <option value="short story">short story</option>
            </select>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-s3">
              <input
                className={ClassNames({
                  "invalid": isbnError,
                  "valid": !isbnError,
                })}
                name="ISBN"
                id="ISBN"
                type="text"
                value={queryISBN}
                onChange={(event) => {
                  handleInputs(event);
                  setIsbnError(false);
                }}
              />
              <label htmlFor="ISBN">ISBN</label>
            </div>
          </div>
          <input type="submit" value="Add book" className="text-white btn deep-purple lighten-2" />
        </form>
        <NavLink
          to="/"
          className="btn-floating marT10"
        >
          <i className="material-icons">home</i>
        </NavLink>
      </div>
    </>
  );
};
