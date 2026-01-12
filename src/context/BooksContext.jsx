import React, { createContext, useContext, useState, useEffect } from 'react';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // Obtener libros desde la API al montar
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error al obtener libros:', err));
  }, []);

  // Refrescar libros desde la API
  const refreshBooks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error al refrescar libros:', err));
  };

  // Alquilar libro (decrementar stock en backend)
  const rentBook = async (bookId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookId}/rent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      refreshBooks();
    } catch (err) {
      console.error('Error al alquilar libro:', err);
    }
  };

  // Devolver libro (incrementar stock en backend)
  const returnBook = async (bookId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookId}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      refreshBooks();
    } catch (err) {
      console.error('Error al devolver libro:', err);
    }
  };

  const getBook = (bookId) => {
    return books.find(b => b.id === bookId);
  };

  const value = {
    books,
    rentBook,
    returnBook,
    getBook,
    refreshBooks
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks debe ser usado dentro de BooksProvider');
  }
  return context;
};
