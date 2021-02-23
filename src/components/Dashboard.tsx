import React from 'react';
import { IBook } from '../interfaces';
import { NavLink } from 'react-router-dom';

type DashboardProps = {
  books: IBook[]
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

export const Dashboard: React.FC<DashboardProps> = ({ books, onDelete, onEdit }) => {

  return (
    <>
      <div className="pad10 deep-purple lighten-2">
        <h4 className="center-align">Books List</h4>
      </div>
      <table className="centered">
        <thead className="deep-purple lighten-3">
          <tr>
            <th>Book title</th>
            <th>Author name</th>
            <th>Category</th>
            <th>ISBN</th>
            <th className="hide-on-small-only">Actions</th>
          </tr>
        </thead>
          {books.map(book => (
            <tbody key={book.id}>
              <tr className="deep-purple lighten-5">
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.ISBN}</td>
                <td className="hide-on-small-only">
                  <a
                    className="btn red mar5"
                    onClick={() => {onDelete(book.id)}}
                  >
                    <i className="material-icons">delete</i>
                  </a>
                  <NavLink
                    to="/edit"
                    className="deep-purple lighten-2 btn mar5"
                    onClick={() => {onEdit(book.id)}}
                  >
                    <i className="material-icons">edit</i>
                  </NavLink>
                </td>
              </tr>
              <tr className="hide-on-med-and-up">
                <td></td>
                <td></td>
                <td>
                  <a
                    className="btn-floating red"
                    onClick={() => {onDelete(book.id)}}
                  >
                    <i className="material-icons">delete</i>
                  </a>
                </td>
                <td>
                  <NavLink
                    to="/edit"
                    className="btn-floating deep-purple lighten-2">
                    <i className="material-icons">edit</i>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      <div className="pad10 deep-purple lighten-5 center-align">
      <NavLink
        to="/add"
        className="btn deep-purple lighten-2"
      >
        Add new Book
      </NavLink>
      </div>
    </>
  );
};
