  
import { get } from './localStorage';
  
  const createGameTableHeaderRow = () => {
  const myTeeArray = get('teesSelected');
  let teesSelected = myTeeArray.map(a => a.value);
  //add a blank column over the player
  teesSelected.unshift("");
  return teesSelected;
}

export default createGameTableHeaderRow;