import React, { createContext, useContext, useState, useEffect } from 'react';
import { books as initialBooks } from '../data/books';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooks);

  // Cargar stock desde localStorage al montar
  useEffect(() => {
    const savedStock = localStorage.getItem('booksStock');
    if (savedStock) {
      try {
        const stockMap = JSON.parse(savedStock);
        const updatedBooks = initialBooks.map(book => ({
          ...book,
          stock: stockMap[book.id] !== undefined ? stockMap[book.id] : book.stock
        }));
        setBooks(updatedBooks);
      } catch (error) {
        console.error('Error cargando stock:', error);
      }
    }
  }, []);

  // Guardar stock en localStorage cuando cambia
  useEffect(() => {
    const stockMap = {};
    books.forEach(book => {
      stockMap[book.id] = book.stock;
    });
    localStorage.setItem('booksStock', JSON.stringify(stockMap));
  }, [books]);

  const decreaseStock = (bookId, quantity = 1) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, stock: Math.max(0, book.stock - quantity) }
        : book
    ));
  };

  const increaseStock = (bookId, quantity = 1) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, stock: book.stock + quantity }
        : book
    ));
  };

  const getBook = (bookId) => {
    return books.find(b => b.id === bookId);
  };

  const value = {
    books,
    decreaseStock,
    increaseStock,
    getBook
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
