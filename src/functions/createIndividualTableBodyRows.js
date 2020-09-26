import {tees} from '../data';

export default function createIndividualTableBodyRows (table, rawIndex, gender, teesSelectedProp, ratings, slopes, pars) {
  if (!rawIndex) rawIndex = "0.0"
  const myTeeArray = teesSelectedProp;
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
    let indexFloat = parseFloat(rawIndex);
    let tee = tees.indexOf(aTee);

    function doMath(course,tee){
    if (rating === 0) {
        return "-"
      } else {
          switch(table) {
            case 'CH':
              return Math.round((indexFloat * (slope / 113)) + (rating - par));
            default:
              return Math.trunc((indexFloat + .04) / (113 / slope) + rating);
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
  switch(gender) {
      case 'F':
        rating = Number(ratings[1][course][tee]);
        slope = Number(slopes[1][course][tee]);
        par = Number(pars[1][course][tee]);
        break;
      default:
        rating = Number(ratings[0][course][tee]);
        slope = Number(slopes[0][course][tee]);
        par = Number(pars[0][course][tee]);
  }

  }

  function addRow(item){
    switch(gender) {
      case 'F':
        if (tees.indexOf(item) > 2) {
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

