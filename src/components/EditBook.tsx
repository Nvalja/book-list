import React, { useEffect, useState } from 'react';
import { IBook } from '../interfaces';
import { useHistory } from 'react-router-dom';

type EditBook = {
  bookToEdit: IBook | undefined
  getEditedBook: (book: IBook) => void
}

export const EditBook: React.FC<EditBook> = React.memo(
  ({bookToEdit, getEditedBook}) => {
    const history = useHistory();
    const [queryTitle, setQueryTitle] = useState<string>('');
    const [queryAuthor, setQueryAuthor] = useState<string>('');
    const [queryISBN, setQueryISBN] = useState<string>('');
    const [select, setSelect] = useState<string>('');
    const [bookId, setBookId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
  
    useEffect(() => {
      if (bookToEdit) {
        setQueryTitle(bookToEdit.title);
        setQueryAuthor(bookToEdit.author);
        setQueryISBN(String(bookToEdit.ISBN));
        setSelect(bookToEdit.category);
        setBookId(bookToEdit.id);
      }
    }, [bookToEdit]);
  
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

      const editedBook: IBook = {
        'title': queryTitle,
        'author': queryAuthor,
        'category': select,
        'ISBN': +queryISBN,
        'id': bookId,
      };
      getEditedBook(editedBook);
      setIsEdit(true);

      setTimeout(() => {
        setIsEdit(false);
        history.push('/');
      }, 3000);
     
    };
  
    return (
      <>
        <div className="pad10 deep-purple lighten-2">
          <h4 className="center-align">Edit Book</h4>
        </div>
        <div className="row center-align pad30 deep-purple lighten-5">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s8 offset-s2">
                Book Title
                <input
                  className="valid"
                  name="title"
                  type="text"
                  value={queryTitle}
                  onChange={(event) => {
                    handleInputs(event)
                  }}
                />
              </div>
            </div>
  
            <div className="row">
              <div className="input-field col s8 offset-s2">
                Author name
                <input
                  className="valid"
                  name="author"
                  type="text"
                  value={queryAuthor}
                  onChange={(event) => {
                    handleInputs(event)
                  }}
                />
              </div>
            </div>
  
            <div className="input-field col s6 offset-s3">
              Category
              <select
                className="browser-default"
                name="category"
                onChange={handleInputs}
                value={select}
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
                International Standard Book Number
                <input
                  className="valid"
                  name="ISBN"
                  type="text"
                  value={queryISBN}
                  onChange={(event) => {
                    handleInputs(event)
                  }}
                />
              </div>
            </div>
            {isEdit &&
              <div className="row deep-purple lighten-3">
                <div
                  className="input-field col s6 offset-s3"
                >
                  the book has been successfully edited
                </div>
              </div>
            }
            <input
              type="submit"
              value="Edit"
              className="text-white btn deep-purple lighten-2"
            />
          </form>
        </div>
      </>
    );
  },
);
