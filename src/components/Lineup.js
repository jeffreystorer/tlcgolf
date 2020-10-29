import React, { useState } from "react";
import LineupDataService from "../services/LineupService";


const Lineup = (props) => {
  const initialLineupState = {
    key: null,
    title: "",
    lineup: {
      game: "",
      course: "",
      playingDate: "",
      teeTimeCount: 0,
      linkTime: "",
      progs069: "",
      progsAdj: "",
      teamTables: {},
      teamHcpAndProgs: {},
      textAreaValue: "",
    },
  };
  const [currentLineup, setCurrentLineup] = useState(initialLineupState);
  const [message, setMessage] = useState("");

  const { Lineup } = props;
  if (currentLineup.key !== Lineup.key) {
    setCurrentLineup(Lineup);
    setMessage("");
  }

   const loadLineup = () => {
    const data = {
      title: currentLineup.title
    };

    LineupDataService.update(currentLineup.key, data)
      .then(() => {
        setMessage("Lineup has been loaded.");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteLineup = () => {
    LineupDataService.remove(currentLineup.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='center'>
      {currentLineup ? (
        <div className="edit-form">
          <h4>Lineup</h4>
          <form>
            <div className="form-group">
              <p>{currentLineup.title}</p>
            </div>
          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={loadLineup}
          >
            Load
          </button>

          <button className="badge badge-danger mr-2" onClick={deleteLineup}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Lineup...</p>
        </div>
      )}
    </div>
  );
};

export default Lineup;
