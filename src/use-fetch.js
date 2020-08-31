import  { useState, useEffect } from "react";

export const useFetch = url => {
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => setState({ loading: false, error: false, data }))
      .catch(error => setState({ loading: false, error, data: [] }));
  }, []);
  
  return state;
};