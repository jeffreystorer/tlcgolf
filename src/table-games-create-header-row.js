  
import { jget } from './local-storage-functions';
  
  const createGameTableHeaderRow = () => {
  const myTeeArray = jget('teesSelected');
  let teesSelected = myTeeArray.map(a => a.value);
  teesSelected.unshift("");
  return teesSelected;
}

export default createGameTableHeaderRow;