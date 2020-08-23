import {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import { set, get, jget, jset } from './local-storage-functions';


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
      /* if (get('IsLoggedIn') !== null) {
        alert("Incorrect GHIN Number or Last Name; please try again");
      }; *//* 
      set('GHINNumber', 'GHIN Number');
      set('LastName', 'Last Name'); */
      set('Index', '');
      set('Gender' , 'M');
      set('Golfer', 'Incorrect GHIN Number or Last Name, please login again ');
      set('IsLoggedIn', 'false');
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    };
    set('Index', ghindata.golfers[0].Value);
    set('Gender', ghindata.golfers[0].Gender);
    set('Golfer', aGolfer);
    set('IsLoggedIn', 'true');
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