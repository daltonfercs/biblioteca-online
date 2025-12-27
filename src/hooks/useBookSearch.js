import { useState, useEffect } from 'react';
import { books as allBooks } from '../data/books';

export const useBookSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(allBooks);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = allBooks.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  return { query, setQuery, results };
};