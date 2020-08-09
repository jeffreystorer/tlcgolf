import {useState, useEffect, useReducer} from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
    let ghindata = action.payload;
    let aGolfer;
    try {
      aGolfer =  ghindata.golfers[0].FirstName + ' ' + ghindata.golfers[0].LastName;
    } catch (error){
      if (localStorage.getItem('lsIsLoggedIn') !== null) {
        alert("Incorrect GHIN Number or Last Name; please try again");
      };
      localStorage.setItem('lsGHINNumber', 'GHIN Number');
      localStorage.setItem('lsLastName', 'Last Name');
      localStorage.setItem('lsIndex', '0.0');
      localStorage.setItem('lsGender' , 'M');
      localStorage.setItem('lsGolfer', 'Please login');
      localStorage.setItem('lsIsLoggedIn', 'false');
      localStorage.setItem('lsShowTables', 'false');
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    };
    localStorage.setItem('lsIndex', ghindata.golfers[0].Value);
    localStorage.setItem('lsGender', ghindata.golfers[0].Gender);
    localStorage.setItem('lsGolfer', aGolfer);
    localStorage.setItem('lsIsLoggedIn', 'true');
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload,
    };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
  
const useDataAPI = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);   
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
 
 
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
 
      try {
        const result = await axios(url);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
    //alert("Fetching Data");
    fetchData();
  }, [url]);
 
  return [state, setUrl];
}
  export default useDataAPI;