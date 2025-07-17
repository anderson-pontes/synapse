import React from 'react';
import SearchFilter from '@/pages/app/SearchFilter';
import ResultsList from '@/pages/app/ResultList';

const ResultsPage: React.FC = () => {
  return (
    <div>
      <SearchFilter />
      <ResultsList />
    </div>
  );
};

export default ResultsPage;
