//node modules
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { v4 as uuidv4 } from "uuid"
import { useRecoilValue, useRecoilState } from "recoil"
import { useListKeys } from "react-firebase-hooks/database"

//components
import AddPlayersToSavedLineup from "../AddPlayersToSavedLineup"
import ButtonDownloadScreenShot from "../Shared/ButtonDownloadScreenshot"
import LineupTableDropDowns from "./LineupTableDropDowns"
import LineupsList from "./LineupsList"
import SavedLineupCount from "../SavedLineupCount"
import TeamTable from "./TeamTable"

//functions
import { get, set } from "../../functions/localStorage"
import getCourseName from "../Shared/functions/getCourseName"
import getPlayersNotInSavedLineupCount from "./functions/getPlayersNotInSavedLineupCount"
import getPlayersNotInTeeTime from "./functions/getPlayersNotInTeeTime"
import loadLineupTablePlayersArray from "./functions/loadLineupTablePlayersArray"
import saveLineupToFirebase from "./functions/saveLineupToFirebase"
import setAutoPop from "./functions/setAutoPop"

//option items
import * as options from "../Shared/optionitems"

//services
import LineupDataService from "../../services/LineupService"

//state
import * as state from "../../state"

export default function LineupTableAll({ games, ratings, slopes, pars }) {
  //constants

  //recoil state
  const [course, setCourse] = useRecoilState(state.courseState)
  const [game, setGame] = useRecoilState(state.gameState)
  const ghinNumber = useRecoilValue(state.ghinNumberState)
  const teesSelected = useRecoilValue(state.teesSelectedState)

  //react state
  const [showTips, setShowTips] = useState(get("showTips"))
  const [showTeamHcp, setShowTeamHcp] = useState(get("showTeamHcp"))
  const [showAddPlayers, setShowAddPlayers] = useState(false)
  const teamTablesObj = {
    times: [],
    team0: [],
    team1: [],
    team2: [],
    team3: [],
    team4: [],
    team5: [],
    team6: [],
    team7: [],
    team8: [],
    team9: [],
  }
  const [teamTables, setTeamTables] = useState(teamTablesObj)
  const [linkTime, setLinkTime] = useState("Time")
  const [teeTimeCount, setTeeTimeCount] = useState("")
  const [playingDate, setPlayingDate] = useState("Date")
  let courseName = getCourseName(course)
  const [lineupTitle, setLineupTitle] = useState(game + " Game")
  const [textAreaValue, setTextAreaValue] = useState("")
  const [progs069, setProgs069] = useState("0")
  const [progAdj, setProgAdj] = useState("0")
  //trick the component into rerendering with certain changes
  //eslint-disable-next-line
  const [teeChoiceChangedId, setTeeChoiceChangedId] = useState(0)
  //eslint-disable-next-line
  const [overrideCHChoiceChangedId, setOverrideCHChoiceChangedId] = useState(0)
  const firebaseRef = '"' + ghinNumber.toString() + '"'
  const [keys] = useListKeys(LineupDataService.getAll(firebaseRef))
  set("keys", keys)
  let savedKeys = keys
  let lastKeyIndex = savedKeys.length - 1
  let playersArray = loadLineupTablePlayersArray(
    firebaseRef,
    course,
    teesSelected,
    ratings,
    slopes,
    pars,
    teamTables,
    teeTimeCount
  )
  //eslint-disable-next-line
  const [players, setPlayers] = useState(playersArray)

  //other constants
  let isMe = false
  if (ghinNumber === "585871") isMe = true
  let teamHcpAndProgs = {
    team0: [0, 0],
    team1: [0, 0],
    team2: [0, 0],
    team3: [0, 0],
    team4: [0, 0],
    team5: [0, 0],
    team6: [0, 0],
    team7: [0, 0],
    team8: [0, 0],
    team9: [0, 0],
  }
  let TeamTables = []
  let teamMembers = []
  let playersNotInSavedLineupCount = getPlayersNotInSavedLineupCount(
    course,
    game,
    games,
    teesSelected,
    ratings,
    slopes,
    pars
  )
  let playerNameList = getPlayersNotInTeeTime(players, teamTables)
  let progAdjMessage = ""

  //useEffects

  useEffect(() => {
    setEachTeamsHcpAndProgs()
    return () => {
      setEachTeamsHcpAndProgs()
    }
  })

  //Saved Lineups List

  function loadLineupFromFirebase({
    title,
    playersInLineup,
    players,
    course,
    game,
    linkTime,
    playingDate,
    progs069,
    progAdj,
    teamTables,
    teeTimeCount,
    textAreaValue,
  }) {
    setLineupTitle(title)
    set("playersInLineup", playersInLineup)
    setPlayers(players)
    setCourse(course)
    set("course", course)
    setGame(game)
    set("game", game)
    setLinkTime(linkTime)
    setPlayingDate(playingDate)
    setProgs069(progs069)
    setProgAdj(progAdj)
    if (teamTables) {
      setTeamTables(teamTables)
    } else {
      setTeamTables(teamTablesObj)
    }
    setTeeTimeCount(teeTimeCount)
    setTextAreaValue(textAreaValue)
  }

  //LineupTableDropDowns event handlers

  const handlePlayingDateChange = (event) => {
    setPlayingDate(event.target.value)
  }

  const handleTeeTimeCountChange = (event) => {
    const oldCount = teeTimeCount
    const newCount = event.target.value
    const droppedTimesCount = oldCount - newCount
    if (droppedTimesCount > 0)
      restoreDroppedTeeTimePlayersToPlayersList(oldCount, newCount)
    setTeeTimeCount(event.target.value)
    setTeeTimes(linkTime, event.target.value)
    set("teeTimeCount", event.target.value)
    for (let i = oldCount; i < newCount; i++) {
      let newTeam = "team" + i
      setTeamTables((teamTables) => ({
        ...teamTables,
        [newTeam]: [],
      }))
    }

    function restoreDroppedTeeTimePlayersToPlayersList(oldCount, newCount) {
      for (let i = newCount; i < oldCount; i++) {
        let teamName = "team" + i
        teamTables[teamName] = []
      }
    }
  }
  /*Used by handleTeeTimeCountChange and handleLinkTimeChange  */
  function setTeeTimes(aLinkTime, aTeeTimeCount) {
    teamTables.times = []
    let firstRegularTimeIndex = options.linkTimes().indexOf("8:02")
    let linkTimeIndex = options.linkTimes().indexOf(aLinkTime)
    if (linkTimeIndex < firstRegularTimeIndex) {
      for (let i = 0; i < aTeeTimeCount; i++) {
        teamTables.times[i] = aLinkTime
      }
    } else {
      for (let i = 0; i < aTeeTimeCount; i++) {
        teamTables.times[i] = options.linkTimes()[linkTimeIndex + i]
      }
    }
  }

  const handleLinkTimeChange = (event) => {
    setLinkTime(event.target.value)
    setTeeTimes(event.target.value, teeTimeCount)
  }

  const handleProgs069Change = (event) => {
    setProgs069(event.target.value)
    setEachTeamsHcpAndProgs()
  }

  const handleProgAdjChange = (event) => {
    setProgAdj(event.target.value)
    setEachTeamsHcpAndProgs()
  }

  //autopop handler

  function handleAutoPopulateClick() {
    let savedTimes = teamTables.times
    setTeamTables(teamTablesObj)
    setTeamTables((teamTables) => ({
      ...teamTables,
      times: savedTimes,
    }))
    teamTables.times = savedTimes
    let teeTimes = get("teeTimeCount")
    teeTimes = Number(teeTimes)
    let playerCount = players.length
    let autoPop = setAutoPop(teeTimes, playerCount)
    createTeam(autoPop)
    setEachTeamsHcpAndProgs()

    function createTeam(autoPop) {
      for (let i = 0; i < autoPop.length; i++) {
        for (let j = 0; j < autoPop[i].length; j++) {
          let newPlayerObj = players[autoPop[i][j]]
          let name = "team" + i
          setTeamTables((prevTeamTables) => ({
            ...prevTeamTables,
            [name]: prevTeamTables[name].concat(newPlayerObj),
          }))
        }
      }
    }
  }

  //add players to saved lineup handler

  function handleShowAddPlayersClick() {
    setShowAddPlayers(true)
  }

  function handleAddPlayersClick() {
    setShowAddPlayers(false)
    playersArray = loadLineupTablePlayersArray(
      firebaseRef,
      course,
      teesSelected,
      ratings,
      slopes,
      pars,
      teamTables,
      teeTimeCount
    )
    setPlayers(playersArray)
  }

  //handle Show Team Hcp

  function handleShowTeamHcpChange() {
    set("showTeamHcp", !showTeamHcp)
    setShowTeamHcp((prevState) => !prevState)
  }

  //compute handicaps and progs
  function setEachTeamsHcpAndProgs() {
    for (let i = 0; i < teeTimeCount; i++) {
      let teamName = "team" + i
      setTeamHcpAndProgs(teamName)
    }
    function setTeamHcpAndProgs(teamName) {
      let teamMembers = teamTables[teamName]
      let aTeamHcp = 0
      let aTeamProgs = 0
      try {
        let playerCount = teamMembers.length
        teamMembers.forEach(computeHcpAndProgs)
        switch (Number(progAdj)) {
          case 0:
            progAdjMessage = "**No threesome/foursome prog adjustment**"
            switch (Number(progs069)) {
              case 6:
                aTeamProgs = aTeamProgs / 3
                break
              case 9:
                aTeamProgs = aTeamProgs / 2
                break
              default:
                aTeamProgs = 0
            }
            break
          case 3:
            switch (Number(progs069)) {
              case 6:
                progAdjMessage = "**Threesome progs include +1 per 6**"
                if (playerCount === 3) {
                  aTeamProgs = aTeamProgs / 3 + 1
                } else {
                  aTeamProgs = aTeamProgs / 3
                }
                break
              case 9:
                progAdjMessage = "**Threesome progs include +1.5 per 9**"
                if (playerCount === 3) {
                  aTeamProgs = aTeamProgs / 2 + 1.5
                } else {
                  aTeamProgs = aTeamProgs / 2
                }
                break
              default:
                aTeamProgs = 0
            }
            break
          case 4:
            switch (Number(progs069)) {
              case 6:
                progAdjMessage = "**Foursome progs include -1 per 6**"
                if (playerCount === 4) {
                  aTeamProgs = aTeamProgs / 3 - 1
                } else {
                  aTeamProgs = aTeamProgs / 3
                }
                break
              case 9:
                progAdjMessage = "**Foursome progs include -1.5 per 9**"
                if (playerCount === 4) {
                  aTeamProgs = aTeamProgs / 2 - 1.5
                } else {
                  aTeamProgs = aTeamProgs / 2
                }
                break
              default:
                aTeamProgs = 0
            }
            break
          default:
        }
        let teamProgs = aTeamProgs.toFixed(1)
        aTeamProgs = teamProgs
        teamHcpAndProgs[teamName][0] = aTeamHcp
        teamHcpAndProgs[teamName][1] = aTeamProgs
      } catch (error) {
        console.log("error setting TeamHcpAndProgs")
      }

      function computeHcpAndProgs(item) {
        let teeChoice = item.teeChoice
        let teesSelectedArray = teesSelected.map((a) => a.value)
        let teeNo = teesSelectedArray.indexOf(teeChoice)
        aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo])
        aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]))
      }
    }
  }

  //team tables

  function generateTeamTables() {
    for (var i = 0; i < teeTimeCount; i++) {
      let teamName = "team" + i
      teamMembers = teamTables[teamName]
      setManualCHCourseHandicaps(teamMembers)
      setEachTeamsHcpAndProgs()
      let teamHcp = teamHcpAndProgs[teamName][0]
      let teamProgs = teamHcpAndProgs[teamName][1]
      TeamTables[i] = (
        <TeamTable
          key={uuidv4()}
          teamNumber={i}
          teamName={teamName}
          teamTables={teamTables}
          teamMembers={teamMembers}
          playerNameList={playerNameList}
          handleAddTeamMember={handleAddTeamMember}
          handleDeleteTeamMember={handleDeleteTeamMember}
          progs069={progs069}
          teamHcp={teamHcp}
          teamProgs={teamProgs}
          handleTeeChoiceChange={handleTeeChoiceChange}
          handleOverrideCHChange={handleOverrideCHChange}
          manualCHOptionItems={options.manualCHOptionItems}
          showTeamHcp={showTeamHcp}
        />
      )
    }

    function setManualCHCourseHandicaps(teamMembers) {
      //iterate through teamMembers
      try {
        for (let i = 0; i < teamMembers.length; i++) {
          let aTeeChoice = teamMembers[i].teeChoice
          let aManualCH = teamMembers[i].manualCH
          if (aManualCH !== "Auto") {
            let teesSelectedArray = teesSelected.map((a) => a.value)
            let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice)
            for (let j = 0; j < teesSelectedArray.length; j++) {
              teamMembers[i].courseHandicaps[j] = "*"
            }
            teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH
            teamMembers[i].playerName = teamMembers[i].playerName + "*"
          }
        }
      } catch (error) {
        console.log("error setting ManualCourseHandicaps")
      }
    }

    return TeamTables
  }

  const handleAddTeamMember = (event) => {
    const { name, value } = event.target
    const newPlayerObj = players.find((player) => player.id === Number(value))
    setTeamTables((prevTeamTables) => ({
      ...prevTeamTables,
      [name]: prevTeamTables[name].concat(newPlayerObj),
    }))
    setEachTeamsHcpAndProgs()
  }

  const handleDeleteTeamMember = (teamName, id) => (event) => {
    setTeamTables((prevTeamTables) => ({
      ...prevTeamTables,
      [teamName]: prevTeamTables[teamName].filter((player) => player.id !== id),
    }))
    setEachTeamsHcpAndProgs()
  }

  function handleClearPlayersFromTeamsClick() {
    let i
    for (i = 0; i < 10; i++) {
      let teamName = "team" + i
      setTeamTables((prevTeamTables) => ({
        ...prevTeamTables,
        [teamName]: (prevTeamTables[teamName] = []),
      }))
      setEachTeamsHcpAndProgs()
    }
  }

  const handleTeeChoiceChange = (event) => {
    setTeeChoiceChangedId(uuidv4())
    //first, update the teeChoice for the player
    let aTeeChoice = event.target.value
    let anId = event.target.name
    let aTeamNumber = event.target.id
    setTeeChoice(aTeamNumber, anId, aTeeChoice)
    setEachTeamsHcpAndProgs()
    function setTeeChoice(aTeamNumber, anId, aTeeChoice) {
      let teamName = "team" + aTeamNumber
      const playerIndex = teamTables[teamName].findIndex(
        (player) => player.id === Number(anId)
      )
      teamTables[teamName][playerIndex].teeChoice = aTeeChoice
    }
  }

  const handleOverrideCHChange = (event) => {
    setOverrideCHChoiceChangedId(uuidv4())
    let aManualCH = event.target.value
    let anId = event.target.name
    let aTeamNumber = event.target.id
    setManualCH(aTeamNumber, anId, aManualCH)
    setEachTeamsHcpAndProgs()
    function setManualCH(aTeamNumber, anId, aManualCH) {
      let teamName = "team" + aTeamNumber
      const playerIndex = teamTables[teamName].findIndex(
        (player) => player.id === Number(anId)
      )
      let aTeeChoice = teamTables[teamName][playerIndex].teeChoice
      let teesSelectedArray = teesSelected.map((a) => a.value)
      let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice)
      for (let i = 0; i < teesSelectedArray.length; i++) {
        teamTables[teamName][playerIndex].courseHandicaps[i] = "*"
      }
      teamTables[teamName][playerIndex].courseHandicaps[
        aChosenTeeIndex
      ] = aManualCH
      teamTables[teamName][playerIndex].manualCH = aManualCH
    }
  }

  //text area
  const handleTextAreaOnBlur = (event) => {
    setTextAreaValue(event.target.value)
  }

  const handleTextAreaValueChange = (event) => {
    setTextAreaValue(event.target.value)
  }

  //handle Save Lineup

  function handleSaveLineupClick(event) {
    event.preventDefault()
    if (playingDate === "Date") {
      toast.error("📅Please select a Playing Date📅", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    let title = lineupTitle
    let allPlayers = get("players")
    let playersInLineup = get("playersInLineup")
    saveLineupToFirebase(
      title,
      allPlayers,
      playersInLineup,
      players,
      game,
      games,
      course,
      courseName,
      playingDate,
      teeTimeCount,
      linkTime,
      progs069,
      progAdj,
      teamTables,
      textAreaValue,
      teesSelected,
      ratings,
      slopes,
      pars,
      firebaseRef
    )
    toast("Lineup Saved", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function handleLineUpTitleChange(event) {
    setLineupTitle(event.target.value)
  }

  function resetLineupTitle() {
    setLineupTitle(game + " Game ")
  }

  //handle Publish Lineup

  function handlePublishLineupClick() {
    if (playingDate === "Date") {
      toast.error("📅Please select a Playing Date📅", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    let title = lineupTitle
    let allPlayers = get("players")
    let playersInLineup = get("playersInLineup")
    let lineupRef = "lineup"
    saveLineupToFirebase(
      title,
      allPlayers,
      playersInLineup,
      players,
      game,
      games,
      course,
      courseName,
      playingDate,
      teeTimeCount,
      linkTime,
      progs069,
      progAdj,
      teamTables,
      textAreaValue,
      teesSelected,
      ratings,
      slopes,
      pars,
      lineupRef
    )
    document.location = "https://tlcgolflineup.web.app"
  }

  //handle Show Tips

  function handleShowTipsChange() {
    set("showTips", !showTips)
    setShowTips((prevState) => !prevState)
  }

  return (
    <>
      <div id="lineup-page" className="center">
        <br></br>
        {SavedLineupCount(firebaseRef) > 0 && (
          <div>
            <LineupsList
              resetLineupTitle={resetLineupTitle}
              loadLineupFromFirebase={loadLineupFromFirebase}
              firebaseRef={firebaseRef}
              lastKeyIndex={lastKeyIndex}
            />
          </div>
        )}
        <p className="current-lineup-title">Current Lineup: {lineupTitle}</p>
        <LineupTableDropDowns
          playingDateOptionItems={options.playingDateOptionItems}
          linkTime={linkTime}
          linkTimeOptionItems={options.linkTimeOptionItems}
          handleLinkTimeChange={handleLinkTimeChange}
          teeTimeCount={teeTimeCount}
          playingDate={playingDate}
          teeTimeCountOptionItems={options.teeTimeCountOptionItems}
          handlePlayingDateChange={handlePlayingDateChange}
          handleTeeTimeCountChange={handleTeeTimeCountChange}
          progs069={progs069}
          handleProgs069Change={handleProgs069Change}
          progAdj={progAdj}
          handleProgAdjChange={handleProgAdjChange}
        />
        <br></br>
        {showTips && (
          <div>
            <br></br>
            <table className="table-tip">
              <thead>
                <tr>
                  <th>To automatically populate the tee times:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-tip-td">
                    Click on "Auto-Populate" and the selected players will be
                    added automatically to the tee times.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <br></br>
        <button id="auto-populate" onClick={handleAutoPopulateClick}>
          Auto-Populate ({players.length} players)
        </button>
        <br></br>
        <br></br>
        <button id="clear-players" onClick={handleClearPlayersFromTeamsClick}>
          Clear Players from Teams
        </button>
        <br></br>{" "}
        {showAddPlayers && (
          <>
            <AddPlayersToSavedLineup
              course={course}
              game={game}
              ratings={ratings}
              slopes={slopes}
              pars={pars}
              handleAddPlayersClick={handleAddPlayersClick}
            />
            <br></br>
            <br></br>
          </>
        )}
        <br></br>
        {playersNotInSavedLineupCount > 0 && (
          <>
            <button id="add-players" onClick={handleShowAddPlayersClick}>
              Add Players to Saved Lineup
            </button>
            <br></br>
            <br></br>
          </>
        )}
        {progs069 < 1 && (
          <>
            <input
              type="checkbox"
              id="showTeamHcp"
              onChange={handleShowTeamHcpChange}
              defaultChecked={showTeamHcp}
            ></input>
            <label htmlFor="showTeamHcp">Show Team Hcp</label>
            <br></br>
            <br></br>
          </>
        )}
        <table id="lineup-table" className="background-white">
          <div id="lineup-table-div" className="background-white">
            <thead className="lineup-table-head">
              <tr>
                <td className="center">{playingDate + " at " + courseName}</td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="background-white">{generateTeamTables()}</td>
              </tr>
            </tbody>
            <tfoot>
              {progs069 > 0 && (
                <>
                  <tr>
                    <td className="team-table-footer"></td>
                  </tr>
                  <tr>
                    <td className="team-table-footer">{progAdjMessage}</td>
                  </tr>
                </>
              )}
              <tr>
                <td className="center text-area-cell">
                  <textarea
                    id="lineup-textarea"
                    rows="8"
                    cols="39"
                    value={textAreaValue}
                    onChange={handleTextAreaValueChange}
                    onFocus={(event) => (event.target.value = textAreaValue)}
                    onBlur={handleTextAreaOnBlur}
                  ></textarea>
                </td>
              </tr>
            </tfoot>
          </div>
        </table>
        {showTips && (
          <div>
            <table className="table-tip">
              <thead>
                <tr>
                  <th>To set a manual handicap:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-tip-td">
                    Click <span style={{ fontWeight: "bold" }}>*</span> at the
                    end of a player's row and select the course handicap. Select
                    "Auto" to use GHIN course handicaps again.
                  </td>
                </tr>
              </tbody>
            </table>
            <br></br>
            <table className="table-tip">
              <thead>
                <tr>
                  <th>To save a lineup:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-tip-td">
                    Click the "Save Lineup" button and your lineup will be saved
                    to storage in the cloud. You can load a saved lineup by
                    clicking the "Saved Lineups" button near the top of this
                    page. Your saved lineups are available on any device where
                    you run the app, not just the one on which you created the
                    lineup. Also, if you make a lineup one day and come back to
                    it the next, the course handicaps will be automatically
                    updated using the players' current indexes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <br></br>
        <div className="center">
          <form onSubmit={handleSaveLineupClick}>
            <label>
              Lineup Title:
              <br></br>
              <input
                type="text"
                id="lineuptitle"
                name="lineuptitle"
                value={lineupTitle}
                onChange={handleLineUpTitleChange}
                size="36"
              />
              <br></br>
              <br></br>
            </label>
            <input id="savelineup" type="submit" value="Save Lineup" />
          </form>
        </div>
        {isMe && (
          <div>
            <br></br>
            <button className="center" onClick={handlePublishLineupClick}>
              Publish Lineup
            </button>
          </div>
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {showTips && (
          <div>
            <br></br>
            <table className="table-tip">
              <thead>
                <tr>
                  <th>To download a screenshot of the lineup:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-tip-td">
                    Click the "Export" button in the Saved Lineups List. This
                    will publish the lineup to the Exports page and take you
                    there. You will have the option of downloading a screenshot
                    for emailing or a pdf with a 2x2 collage for use as
                    handouts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <br></br>
        <br></br>
        <br></br>
        <ButtonDownloadScreenShot
          title={lineupTitle}
          game={game}
          course={course}
          element="lineup-table-div"
          format="PNG"
          page="Lineup"
        />
        <br></br>
        <ButtonDownloadScreenShot
          title={lineupTitle}
          game={game}
          course={course}
          element="lineup-table-div"
          format="JPEG"
          page="Lineup"
        />
        <br></br>
        <br></br>
        <input
          type="checkbox"
          id="showTips"
          onChange={handleShowTipsChange}
          defaultChecked={showTips}
        ></input>
        <label htmlFor="showTips">Show Tips</label>
      </div>
    </>
  )
}
