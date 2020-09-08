	import React, { useState, useEffect } from "./node_modules/react";

const useFetch = url => {
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


const Loading = () => <p>Loading</p>;

const Error = error => <p>Oops! Something went wrong: {error}</p>

const List = ({ items, renderItem }) => (
  <ul>
    {items.map(item => <li key={item.id}>{renderItem(item)}</li>)}
  </ul>
);
              
const DataList = () => {
  const { loading, error, data } = useFetch("/mock-data");

  return (
    <>
     { loading && <Loading /> }
     { error && <Error error={error} />}
     { data.length && <List items={data} renderItem={item => item.label} /> }
    </>
  );
};
--