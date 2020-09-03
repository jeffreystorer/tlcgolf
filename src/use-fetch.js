import  { useState, useEffect } from "react";

export const useFetch = url => {
  console.log('useFetch');
  console.log(url);
  
  
  const [state, setState] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    
    const fetchData = async () => {
    console.log('fetchData');
    
    await fetch(url)
      .then(res => {
        if (!res.ok) {
          console.log('error: ' + res.status);
          throw new Error(res.status);
          
        }
        console.log('success');
        
        return res.json();
      })
      .then(data => setState(data))
      .catch(error => setState({ data: [] }));
  }
  fetchData();
},);
  
  return state;
};