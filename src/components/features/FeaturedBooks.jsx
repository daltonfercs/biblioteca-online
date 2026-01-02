import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BooksContext';

const FeaturedBooks = () => {
  const { books } = useBooks();
  // Obtener los últimos 5 libros (ordenados por id descendente)
  const latestBooks = [...books].reverse().slice(0, 5);

  const renderStars = (rating) => {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  return (
    <section className="featured-books">
      <div className="featured-books__header">
        <h2 className="featured-books__title">Últimos Libros Agregados</h2>
        <p className="featured-books__subtitle">Descubre nuestras adiciones más recientes</p>
      </div>
      
      <div className="featured-books__grid">
        {latestBooks.map(book => (
          <article key={book.id} className="featured-book-card">
            <div className="featured-book-card__image-wrapper">
              <img 
                src={book.cover} 
                alt={book.title} 
                className="featured-book-card__image"
              />
              <div className="featured-book-card__overlay">
                <Link to={`/libro/${book.id}`} className="featured-book-card__link">
                  Ver Detalles
                </Link>
              </div>
            </div>
            <div className="featured-book-card__content">
              <h3 className="featured-book-card__title">{book.title}</h3>
              <p className="featured-book-card__author">{book.author}</p>
              
              <div className="featured-book-card__rating">
                <span className="featured-book-card__stars">{renderStars(book.rating)}</span>
                <span className="featured-book-card__rating-value">{book.rating}</span>
              </div>
              
              <div className="featured-book-card__category">
                <span className="featured-book-card__badge">{book.category}</span>
                <span className="featured-book-card__year">{book.year}</span>
              </div>
              
              <p className="featured-book-card__description">{book.description}</p>
              
              <div className="featured-book-card__footer">
                <div className="featured-book-card__price">${book.price.toLocaleString()}</div>
                {book.available ? (
                  <span className="featured-book-card__available">Disponible</span>
                ) : (
                  <span className="featured-book-card__unavailable">No disponible</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
