import React, { useState } from "react";
import LineupDataService from "../services/LineupService";

const game = JSON.parse(localStorage.getItem('savedGame'));
const course = JSON.parse(localStorage.getItem('savedCourse'));
const playingDate = JSON.parse(localStorage.getItem('savedPlayingDate'));
const teeTimeCount = JSON.parse(localStorage.getItem('savedTeeTimeCount'));
const linkTime = JSON.parse(localStorage.getItem('savedLinkTime'));
const progs069 = JSON.parse(localStorage.getItem('savedProgs069'));
const progsAdj = JSON.parse(localStorage.getItem('savedProgsAdj'));
const teamTables = JSON.parse(localStorage.getItem('savedTeamTables'));
const teamHcpAndProgs = JSON.parse(localStorage.getItem('savedTeamHcpAndProgs'));
const textAreaValue = JSON.parse(localStorage.getItem('savedTextAreaValue'));

const AddLineup = () => {
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
      teamTables: {
        times: [],
        team0:[],
        team1:[],
        team2:[],
        team3:[],
        team4:[],
        team5:[],
        team6:[],
        team7:[],
        team8:[],
        team9:[],
      },
      teamHcpAndProgs: {
        team0:[0,0],
        team1:[0,0],
        team2:[0,0],
        team3:[0,0],
        team4:[0,0],
        team5:[0,0],
        team6:[0,0],
        team7:[0,0],
        team8:[0,0],
        team9:[0,0],
      },
      textAreaValue: "",

    }
  };

  const [Lineup, setLineup] = useState(initialLineupState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLineup({ ...Lineup, [name]: value });
  };

  const saveLineup = () => {
    var data = {
      title: Lineup.title,
      lineup: {
        game: game,
        course: course,
        playingDate: playingDate,
        teeTimeCount: teeTimeCount,
        linkTime: linkTime,
        progs069: progs069,
        progsAdj: progsAdj, 
        teamTables: teamTables,
        teamHcpAndProgs: teamHcpAndProgs,
        textAreaValue: textAreaValue,
      }
    };

    LineupDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newLineup = () => {
    setLineup(initialLineupState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newLineup}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Lineup.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <button onClick={saveLineup} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLineup;
