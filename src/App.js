import React from 'react';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import Provider from './contextAPI/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <SearchBar />
      <Table />
    </Provider>
  );
}

export default App;
