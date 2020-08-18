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
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload,
    };
    case 'FETCH_FAILURE':
      console.log("FETCH_FAILURE");
      debugger;
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
  
const useDataAPIGames = (initialUrl, initialData) => {
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
  export default useDataAPIGames;