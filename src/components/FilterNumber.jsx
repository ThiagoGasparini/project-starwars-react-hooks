import React, { useContext, useState, useEffect } from 'react';
import contextApi from '../contextAPI/Context';

function FilterNumber() {
  const {
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    value,
    setValue,
    setFiltred,
    data,
    column,
    setColumn,
  } = useContext(contextApi);

  const [filters, setFilters] = useState(false);
  const [arrays, setArrays] = useState([]);

  const handleClick = () => {
    let filtred = data;/* .filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(value);
      }
      if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(value);
      }
      // if (comparisonFilter === 'igual a') {
      return Number(planet[columnFilter]) === Number(value);
      // }
    }); */
    console.log(filtred);
    console.log('data', data);
    filtred = filtred.filter((planet) => arrays.every((element) => {
      if (element.comparison === 'maior que') {
        // console.log(Number(planet[element.column]) > Number(element.val));
        return Number(planet[element.column]) > Number(element.val);
      }
      if (element.comparison === 'menor que') {
        return Number(planet[element.column]) < Number(element.val);
      }
      if (element.comparison === 'igual a') {
        return Number(planet[element.column]) === Number(element.val);
      }
      return false;
    }));
    console.log('2', filtred);
    setFiltred(filtred);
    /* const newColumn = column.filter((option) => option !== columnFilter);
    setColumn(newColumn);
    setFilters(true); */
    /* setArrays((prevState) => [
      ...prevState,
      { column: columnFilter, comparison: comparisonFilter, val: value },
    ]); */
    /*  setColumnFilter(newColumn[0]);
    setComparisonFilter('maior que');
    setValue(0); */
  };

  useEffect(() => {
    handleClick();
  }, [arrays]);

  const handleClickDelete = (columnDelete) => {
    setArrays(
      (prevState) => prevState.filter((element) => element.column !== columnDelete),
    );
    setColumn([...column, columnDelete]);
    // setFiltred(data);
  };

  const handleDeleteAll = () => {
    const columnsArray = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setArrays([]);
    setColumn([...columnsArray]);
    setFiltred(data);
    console.log(data);
  };

  const handleClickFilter = () => {
    setArrays((prevState) => [
      ...prevState,
      { column: columnFilter, comparison: comparisonFilter, val: value },
    ]);
    const newColumn = column.filter((option) => option !== columnFilter);
    setColumn(newColumn);
    setFilters(true);
    /* setArrays((prevState) => [
      ...prevState,
      { column: columnFilter, comparison: comparisonFilter, val: value },
    ]); */
    setColumnFilter(newColumn[0]);
    setComparisonFilter('maior que');
    setValue(0);
  };

  return (
    <div>
      <select
        onChange={ (event) => setColumnFilter(event.target.value) }
        data-testid="column-filter"
        value={ columnFilter }
      >
        {column.map((element) => (
          <option value={ element } key={ element }>{element}</option>
        ))}
      </select>
      <select
        onChange={ (event) => setComparisonFilter(event.target.value) }
        data-testid="comparison-filter"
        value={ comparisonFilter }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ (event) => setValue(event.target.value) }
        type="number"
        value={ value }
        data-testid="value-filter"
      />
      {/*  <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button> */}
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
      >
        Remover Filtragens
      </button>
      {filters && (
        <div>
          {arrays.map((element, i) => (
            <div data-testid="filter" key={ i }>
              <span>{element.column}</span>
              <span>{element.comparison}</span>
              <span>{element.val}</span>
              <button
                onClick={ () => handleClickDelete(element.column) }
                type="button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterNumber;
