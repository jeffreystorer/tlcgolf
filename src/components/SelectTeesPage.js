import React from 'react';
import '../styles/App.css';
import { set } from '../functions/localStorage';

const SelectTeesPage = () => {
  let tees = [];


  function handleSelectTees(e){
    var options = e.target.selectedOptions;
    Array.from(options).forEach(function (element){tees = [...tees, JSON.stringify({label: element.text, value: element.value})]});
  }

  function handleClick() {
    if (tees.length) {
      localStorage.setItem('teesSelected', "[" + tees + "]");
    } else {
    const defaultTees =[{"label":"Club","value":"C"},{"label":"Club/Medal","value":"C/M"},{"label":"Medal","value":"M"}];
    set('teesSelected', defaultTees);
    }
    document.location = '/'
  };

    return (
    <div align="center">
      <h5>
        Please select one or more tees,<br/>
        then click "Next", or,<br/>
        just click "Next" to accept<br/>
        the default set of C, C/M, M:
      </h5>
      <br/>
      <div >
  <label>
    <select multiple={true} value={tees} size={13} onChange={handleSelectTees}>
      <option value="CH">Championship (Men only)</option>
      <option value="T">Tournament (Men only)</option>
      <option value="T/C">Tournament/Club (Men only)</option>
      <option value="C">Club</option>
      <option value="C/M">Club/Medal</option>
      <option value="M">Medal</option>
      <option value="M/CRS">Medal/Course</option>
      <option value="LCRS">Long Course</option>
      <option value="CRS">Course</option>
      <option value="SCRS">Short Course (Women only)</option>
      <option value="ISL">Island</option>
      <option value="CRS/SK">Course/Skidaway</option>
      <option value="SK">Skidaway</option>
    </select>
  </label>
</div>
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