import {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import { set } from './localStorage';


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
      set('index', '');
      set('gender' , 'M');
      set('golfer', 'Incorrect GHIN Number or Last Name, please login again ');
      set('isLoggedIn', 'false');
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    };
    set('index', ghindata.golfers[0].Value);
    set('gender', ghindata.golfers[0].Gender);
    set('golfer', aGolfer);
    set('isLoggedIn', 'true');
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
      //console.log('useEffect in use-data-api');
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