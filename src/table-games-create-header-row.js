  
import { jget } from './local-storage-functions';
  
  const createGameTableHeaderRow = () => {
  const myTeeArray = jget('teesSelected');
  let teesSelected = myTeeArray.map(a => a.value);
  //add a blank column over the player
  teesSelected.unshift("");
  return teesSelected;
}

export default createGameTableHeaderRow;