import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import contextApi from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [value, setValue] = useState(0);

  useEffect(() => {
    const api = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const obj = await response.json();
      setData(obj.results);
      return obj;
    };
    api();
  }, []);

  useEffect(() => {
    setFiltred(data);
  }, [data]);

  const contextValue = {
    data,
    setData,
    filtred,
    setFiltred,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    value,
    setValue,
  };

  return (
    <contextApi.Provider value={ contextValue }>
      { children }
    </contextApi.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
