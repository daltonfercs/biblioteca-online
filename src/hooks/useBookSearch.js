import { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

export const useBookSearch = () => {
  const context = useContext(BooksContext);
  const allBooks = context ? context.books : [];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(allBooks);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = allBooks.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query, allBooks]);

  return { query, setQuery, results };
};