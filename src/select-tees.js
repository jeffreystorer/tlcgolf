import React from 'react';
import Select from 'react-select'
import './App.css';
import { Button } from '@material-ui/core';
import {
  //BrowserRouter as Router,
  //Switch,
  //Route,
  NavLink
} from "react-router-dom";
import { set, jset, jget} from './local-storage-functions';


let selectedOption;
const SelectTees = () => {
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
    jset('teesSelected', selectedOption);
  }

  function handleSelectTees () {
    console.log('teesSelected: ' + jget('teesSelected'));
    
    console.log('handleSelectTees');
    
    if ((jget('teesSelected') === null) || (jget('teesSelected') === []) || (jget('teesSelected') === "")){
      console.log('none selected');
      
      //if the user moves on without selecting a tee, we select all tees
      set('teesSelected', JSON.stringify([{"label":"Club","value":"C"},{"label":"Club/Medal","value":"C/M"},{"label":"Medal","value":"M"}]));
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
              <NavLink exact 
                to="/settings/setupgames"
                style={{color: "white"}}
              >
                Next
              </NavLink>            
          </Button>
        </div>
    </div>
      );
}

export default SelectTees;