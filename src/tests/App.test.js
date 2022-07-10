import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('testando a aplicação ', () => {
  
  it('teste a tela inicial', async () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
  
    const inputNumber = screen.getByRole('spinbutton')
    expect(inputNumber).toBeInTheDocument();
  
    const buttonFilter = screen.getByRole('button', {
      name: /filtrar/i
    })
    expect(buttonFilter).toBeInTheDocument();
  
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  
    const select = screen.getByTestId('column-filter')
    userEvent.selectOptions(select, 'population')
    userEvent.selectOptions(select, 'orbital_period')
    userEvent.selectOptions(select, 'diameter')
    userEvent.selectOptions(select, 'rotation_period')
    userEvent.selectOptions(select, 'surface_water')
    expect(select).toBeInTheDocument();
  
    const select2 = screen.getByTestId('comparison-filter')
    userEvent.selectOptions(select2, 'maior que')
    userEvent.selectOptions(select2, 'menor que')
    userEvent.selectOptions(select2, 'igual a')

    const input = await screen.findByTestId('name-filter');
    fireEvent.change(input, { target: { value: 'o' } });
    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByRole('cell', {
        name: planetName
      })).toBeInTheDocument();
    }

    fireEvent.change(input, { target: { value: 'oo' } });
    const planetName = ['Naboo', 'Tatooine'];
    for (let planetNam of planetName) {
      expect(await screen.findByRole('cell', {
        name: planetNam
      })).toBeInTheDocument();
    }

    fireEvent.change(input, { target: { value: '' } });
    const planetsAll = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    for (let planet of planetsAll) {
      expect(await screen.findByRole('cell', {
        name: planet
      })).toBeInTheDocument();
    }
    
    const column = screen.getByTestId('column-filter');
    expect(column).toHaveProperty('nodeName', 'SELECT');
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const foundColumnFilter = Array.from(column.children).map(child => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundColumnFilter).toEqual(expect.arrayContaining(columns));

    const column2 = await screen.findByTestId('comparison-filter');
    expect(column2).toHaveProperty('nodeName', 'SELECT');
    const columns2 = ['maior que', 'igual a', 'menor que'];
    const foundComparisonFilter = Array.from(column2.children).map(child => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundComparisonFilter).toEqual(expect.arrayContaining(columns2));

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(7);
    
    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '40' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(1);

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'igual a' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '2000000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(1);
    
    const buttoDel = screen.getByRole('button', {
      name: /remover filtragens/i
    })
    expect(buttoDel).toBeInTheDocument();

   /*  const btn = screen.getByTestId('button-filter');
    userEvent.click(btn);
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument(); */
  });

})
