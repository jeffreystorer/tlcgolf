import React from 'react';
import Select from 'react-select'
import '../styles/App.css';
import { set, get} from '../functions/localStorage';


let selectedOption;
const SelectTeesPage = () => {
  const  options  = [
    { label:  'Championship (Men only)', value:  'CH'  },
    { label:  'Tournament (Men only)', value:  'T'  },
    { label:  'Tournament/Club (Men only)', value:  'T/C'  },
    { label:  'Club', value:  'C'  },
    { label:  'Club/Medal', value:  'C/M'},
    { label:  'Medal', value:  'M'},
    { label:  'Medal/Course', value:  'M/CRS'},
    { label:  'Long Course', value:  'LCRS'},
    { label:  'Course', value:  'CRS'},
    { label:  'Short Course (Women Only)', value:  'SCRS'},
    { label:  'Island', value:  'ISL'},
    { label:  'Skidaway/Course', value:  'SK/CRS'},
    { label:  'Skidaway', value: 'SK'}
  ]

  const  handleOnChange =  selectedOption  => {
  /*   if (selectedOption === null || selectedOption === '[]') {
      alert('You have not selected any tees.');
    } */
    set('teesSelected', selectedOption);
  }

  function handleClick() {
    const teesSelected = get('teesSelected');
    
    if (
      (teesSelected === null) || 
      (teesSelected === []) || 
      (teesSelected === "") ||
      (teesSelected === undefined)
      ){
      
      //if the user moves on without selecting a tee, we select some tees
      const defaultTees =[{"label":"Club","value":"C"},{"label":"Club/Medal","value":"C/M"},{"label":"Medal","value":"M"}]
      set('teesSelected', defaultTees);
    }
    document.location = '/';
  }

    return (
    <div align="center">
      <h5>
        Please select at least one set of tees,<br/>
        then click the "Next" button<br/>
        (default is C, C/M, M):
      </h5>
      <br/><br/>
      <Select
        value = {selectedOption}
        isMulti='true'
        className='dropdown-center'
        placeholder='Select Tees to Display . . .'
        /* jsonValue='true' */
        onChange={handleOnChange}
        options={options}
      />
      <br/><br/>
        <div>
          <button
            onClick={handleClick}>
                Next         
          </button>
        </div>
    </div>
      );
}

export default SelectTeesPage;