import React from 'react';
import Select from 'react-select'
import './App.css';
import { Button } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { set, get, jget, jset } from './local-storage-functions';


let selectedOption;
const TeeSelector = () => {
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
    set('TeesSelected', JSON.stringify(selectedOption));
  }

  function handleSelectTees () {
    if ((JSON.parse(get('TeesSelected')) === null) || (JSON.parse(get('TeesSelected')) === '[]')){
      set('TeesSelected', JSON.stringify(options))
    }
  }

    return (
    <div align="center">
      <h5>
        Please select at least one set of tees,<br/>
        then click the "Next" button<br/>
        (default is all tees):
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSelectTees}>
              <Link 
                to="/selectMode"
                style={{color: "white"}}
              >
                Next
              </Link>            
          </Button>
        </div>
    </div>
      );
}

export default TeeSelector;