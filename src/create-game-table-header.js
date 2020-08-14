  const createGameTableHeader = () => {
  const myTeeArray = JSON.parse(localStorage.getItem('lsTeesSelected'));
  let teesSelected = myTeeArray.map(a => a.value);
  teesSelected.unshift("");
  return teesSelected;
}

export default createGameTableHeader;