import * as courseData from './ratings-slopes-pars.js';

function createIndividualTableBody (table) {
    const myTeeArray = JSON.parse(localStorage.getItem('lsTeesSelected'));
    let teesSelected = [];

    myTeeArray.forEach(myFunction);
    
    function myFunction(item, index) {
      teesSelected = [...teesSelected, item.value];
    }
    
    var rows = [];
    let rating;
    let slope;
    let par;

    function compute(aTee) {
      let rowReturn = [aTee];
      let index = Number(localStorage.getItem("lsIndex"));
      let tee = courseData.tees.indexOf(aTee);
  
      function doMath(course,tee){
      if (rating === 0) {
          return "-"
        } else {
            switch(table) {
              case 'CH':
                return Math.round((index * (slope / 113)) + (rating - par));
              default:
                return Math.trunc((index + .04) / (113 / slope) + rating);
            }
        }
      }
  
      let i;
      for (i = 0; i<6; i++){
      setRatingSlopePar(i, tee);
        rowReturn.push(doMath());
      };
  
      return rowReturn;
    }
  
    function setRatingSlopePar(course, tee){
    switch(localStorage.getItem("lsGender")) {
        case 'F':
          rating = Number(courseData.wratings[course][tee]);
          slope = Number(courseData.wslopes[course][tee]);
          par = Number(courseData.wpars[course][tee]);
          break;
        default:
          rating = Number(courseData.mratings[course][tee]);
          slope = Number(courseData.mslopes[course][tee]);
          par = Number(courseData.mpars[course][tee]);
    }
  
    }
  
    function addRow(item){
      switch(localStorage.getItem('lsGender')) {
        case 'F':
          if (courseData.tees.indexOf(item) > 2) {
            doAdd(item);
          }
          break;
        default:
          if (item !== "SCRS") {
            doAdd(item)
          }
  
      }
    function doAdd(item) {
      let aTee = item;
      var newRow = compute(aTee);
      rows.push(newRow);
    }
  
    }
  
    teesSelected.forEach(addRow);
    return rows;
}

export default createIndividualTableBody;