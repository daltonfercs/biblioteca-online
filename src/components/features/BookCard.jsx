import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import RentalButton from './RentalButton';

const BookCard = ({ book }) => (
  <article className="book-card">
    <img src={book.cover} alt={book.title} className="book-card__img" />
    <div className="book-card__info">
      <Badge text={book.category} />
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      <div className="book-card__actions">
        <Link to={`/libro/${book.id}`} className="book-card__link">Ver</Link>
        <RentalButton book={book} />
      </div>
    </div>
  </article>
);
export default BookCard;