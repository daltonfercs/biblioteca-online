import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import RentalButton from './RentalButton';

const BookCard = ({ book, isRental = false }) => {
  const renderStars = (rating) => {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  return (
    <article className="book-card">
      <img src={book.cover} alt={book.title} className="book-card__img" />
      <div className="book-card__info">
        <Badge text={book.category} />
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        
        <div className="book-card__meta">
          <div className="book-card__rating">
            <span className="book-card__stars">{renderStars(book.rating)}</span>
            <span className="book-card__rating-value">{book.rating}</span>
          </div>
          <div className="book-card__year">{book.year}</div>
        </div>
        
        <div className="book-card__details">
          <span className="book-card__pages">{book.pages} págs</span>
          <span className="book-card__price">${book.price.toLocaleString()}</span>
        </div>

        <div className="book-card__stock" style={{ 
          padding: '0.5rem', 
          backgroundColor: book.stock > 0 ? '#e8f5e9' : '#ffebee',
          color: book.stock > 0 ? '#2e7d32' : '#c62828',
          borderRadius: '4px',
          fontSize: '0.9rem',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {book.stock > 0 ? `${book.stock} en stock` : 'Sin stock'}
        </div>
        
        <div className="book-card__actions">
          <Link to={`/libro/${book.id}`} className="book-card__link">Ver</Link>
          <RentalButton book={book} isRental={isRental} />
        </div>
      </div>
    </article>
  );
};
export default BookCard;