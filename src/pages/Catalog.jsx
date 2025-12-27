import React from 'react';
import { useBookSearch } from '../hooks/useBookSearch';
import SearchBar from '../components/features/SearchBar';
import BookList from '../components/features/BookList';
import PageTitle from '../components/ui/PageTitle';

const Catalog = () => {
  const { query, setQuery, results } = useBookSearch();

  return (
    <div className="page-catalog">
      <PageTitle title="Catálogo Completo" />
      <SearchBar value={query} onChange={setQuery} />
      <BookList books={results} />
    </div>
  );
};
export default Catalog;