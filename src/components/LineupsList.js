import React, { useState } from "react";
import { useList } from "react-firebase-hooks/database";
import LineupDataService from "../services/LineupService";
import Lineup from "./Lineup";

const LineupsList = () => {
  const [currentLineup, setCurrentLineup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  /* use react-firebase-hooks */
  const [Lineups, loading, error] = useList(LineupDataService.getAll());

  const refreshList = () => {
    setCurrentLineup(null);
    setCurrentIndex(-1);
  };

  const setActiveLineup = (Lineup, index) => {
    const { title } = Lineup.val(); /* Lineup */

    setCurrentLineup({
      key: Lineup.key,
      title,
    });

    setCurrentIndex(index);
  };

  const removeAllLineups = () => {
    LineupDataService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lineups List</h4>

        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          {!loading &&
            Lineups &&
            Lineups.map((Lineup, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveLineup(Lineup, index)}
                key={index}
              >
                {Lineup.val().title}
                {/* Lineup.title */}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllLineups}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentLineup ? (
          <Lineup Lineup={currentLineup} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Lineup...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineupsList;
