import { tees, courses } from "../data"
import { get, set } from "./localStorage"
import getTeeValueFromTeeName from "../helpers/getTeeValueFromTeeName"
import setRatingSlopePar from "./setRatingSlopePar"
import shuffleArray from "../helpers/shuffleArray"
//the following is used to delete saved lineups
//if a player is no longer in the table
import LineupDataService from "../services/LineupService"
export default function createPlayersArrray(
  playersArrayType,
  firebaseRef,
  showFirstName,
  course,
  game,
  games,
  teesSelected,
  ratings,
  slopes,
  pars,
  teamTables,
  teeTimeCount,
  sortOrder
) {
  let players = get("players")
  const showLocalNumbers = get("showLocalNumbers")
  var playersArray = []
  let idsInLineup = get("playersInLineup")
  let strHcpIndex
  let hcpIndex
  let gender
  let teesSelectedArray = buildTeeArray()

  //filter players, then add them
  function addRow(item, index) {
    let gameNumber = games.indexOf(game)
    switch (gameNumber) {
      case 0:
        doAdd(item, index)
        break
      default:
        let gameIndex = gameNumber + 6
        if (
          item[gameIndex] === "Yes" ||
          item[gameIndex] === "YES" ||
          item[gameIndex] === "yes"
        ) {
          doAdd(item, index)
        }
    }
  }
  const indexOfPlayer = (id) => {
    var i = 0
    var playerFound = false
    try {
      do {
        playerFound = players[i].includes(id)
        i++
      } while (!playerFound)
      return i - 1
    } catch (error) {
      alert(
        "One of the players you selected when you made your most recent lineup " +
          "(GHIN Number: " +
          id +
          ") is no longer in your table.\n" +
          "Your saved lineups have been deleted."
      )
      LineupDataService.removeAll(firebaseRef)
      set("isLoggedIn", "false")
      document.location = "/settings/login"
    }
  }

  //construct the row
  function computeCreateLineupTable(aPlayer, index) {
    let teeValue = getTeeValueFromTeeName(aPlayer[2])
    strHcpIndex = aPlayer[4]
    hcpIndex = parseFloat(strHcpIndex)
    let firstName = aPlayer[3]
    let lastName = aPlayer[1]
    gender = aPlayer[5]
    let player = firstName + " " + lastName + " (" + strHcpIndex + ")"
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: teeValue,
      manualCH: "Auto",
      lastName: aPlayer[1],
      index: hcpIndex,
      firstName: aPlayer[3],
      strHcpIndex: aPlayer[4],
    }
    let i
    for (i = 0; i < teesSelectedArray.length; i++) {
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(course)
      let teeNumber = tees.indexOf(teesSelectedArray[i])
      const [rating, slope, par] = setRatingSlopePar(
        ratings,
        slopes,
        pars,
        courseNumber,
        teeNumber,
        gender
      )
      playerReturn.courseHandicaps.push(doMath(rating, slope, par))
    }
    return playerReturn
  }

  function computeLoadLineupTable(anId, index) {
    let id = anId.toString()
    let playerIndex = indexOfPlayer(id)
    let aPlayer = players[playerIndex]
    let teeValue = getTeeValueFromTeeName(aPlayer[2])
    strHcpIndex = aPlayer[4]
    hcpIndex = parseFloat(strHcpIndex)
    let firstName = aPlayer[3]
    let lastName = aPlayer[1]
    gender = aPlayer[5]
    let player = firstName + " " + lastName + " (" + strHcpIndex + ")"
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: teeValue,
      manualCH: "Auto",
    }
    let i
    for (i = 0; i < teesSelectedArray.length; i++) {
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(course)
      let teeNumber = tees.indexOf(teesSelectedArray[i])
      const [rating, slope, par] = setRatingSlopePar(
        ratings,
        slopes,
        pars,
        courseNumber,
        teeNumber,
        gender
      )
      playerReturn.courseHandicaps.push(doMath(rating, slope, par))
    }
    return playerReturn
  }

  function computeExportLineupTable(aPlayer, index) {
    let teeValue = getTeeValueFromTeeName(aPlayer[2])
    strHcpIndex = aPlayer[4]
    hcpIndex = parseFloat(strHcpIndex)
    let firstName = aPlayer[3]
    let lastName = aPlayer[1]
    gender = aPlayer[5]
    let local = aPlayer[6]
    let player
    if (showFirstName) {
      player = firstName + " " + lastName + " (" + strHcpIndex + ")"
    } else {
      player = lastName + " (" + strHcpIndex + ")"
    }
    let prefix = ""
    if ((showLocalNumbers === true) | (showLocalNumbers === "true")) {
      prefix = local + " "
    }
    player = prefix + player

    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: teeValue,
      manualCH: "Auto",
    }
    let i
    for (i = 0; i < teesSelectedArray.length; i++) {
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(course)
      let teeNumber = tees.indexOf(teesSelectedArray[i])
      const [rating, slope, par] = setRatingSlopePar(
        ratings,
        slopes,
        pars,
        courseNumber,
        teeNumber,
        gender
      )
      playerReturn.courseHandicaps.push(doMath(rating, slope, par))
    }
    playerReturn.teeChoice = teeValue
    return playerReturn
  }
  function computeExportTeamsTable(aPlayer, index) {
    let teeValue = getTeeValueFromTeeName(aPlayer[2])
    let player
    let local = aPlayer[6]
    if (showFirstName) {
      player = aPlayer[3] + " " + aPlayer[1]
    } else {
      player = aPlayer[1]
    }

    let prefix = ""
    if ((showLocalNumbers === true) | (showLocalNumbers === "true")) {
      prefix = local + " "
    }
    player = prefix + player
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: teeValue,
      manualCH: "Auto",
    }

    return playerReturn
  }

  //compute the course handicap
  function doMath(rating, slope, par) {
    if (rating === 0) {
      return "-"
    } else {
      if (strHcpIndex === "guest") {
        return 0
      } else {
        return Math.round(hcpIndex * (slope / 113) + (rating - par))
      }
    }
  }

  //build array of tees
  function buildTeeArray() {
    let teesSelectedArray = teesSelected.map((a) => a.value)
    return teesSelectedArray
  }

  //add a row for each player
  function doAdd(item, index) {
    let newRow, aPlayer, anId
    switch (playersArrayType) {
      case "createLineupTable":
        aPlayer = item
        newRow = computeCreateLineupTable(aPlayer, index)
        break
      case "loadLineupTable":
        anId = item
        newRow = computeLoadLineupTable(anId, index)
        break
      case "createExportLineupTable":
        aPlayer = item
        newRow = computeExportLineupTable(aPlayer, index)
        break
      case "createExportTeamsTable":
        aPlayer = item
        newRow = computeExportTeamsTable(aPlayer, index)
        break
      default:
        break
    }
    playersArray.push(newRow)
  }

  function sortAlphabetical() {
    playersArray.sort((a, b) =>
      a.lastName > b.lastName
        ? 1
        : a.lastName === b.lastName
        ? a.firstName > b.firstName
          ? 1
          : -1
        : -1
    )
  }

  function sortByHandicap() {
    playersArray.sort((a, b) => {
      let aIndex
      let bIndex
      if (a.strHcpIndex === "guest") {
        aIndex = 50
      } else {
        aIndex = a.index
      }
      if (b.strHcpIndex === "guest") {
        bIndex = 50
      } else {
        bIndex = b.index
      }
      return aIndex > bIndex
        ? 1
        : aIndex === bIndex
        ? a.lastName > b.lastName
          ? 1
          : -1
        : -1
    })
  }

  function sortRandom() {
    shuffleArray(playersArray)
  }
  function updateTeamTables() {
    for (let i = 0; i < teeTimeCount; i++) {
      let aTeamName = "team" + i
      try {
        let aPlayerCount = teamTables[aTeamName].length
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id
          let aPlayerObj = playersArray.find((obj) => obj.id === aTeamMemberId)
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName
          teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps
        }
      } catch (error) {
        console.log("error updating Team Tables")
      }
    }
  }

  switch (playersArrayType) {
    case "createLineupTable":
      players.forEach(addRow)
      switch (sortOrder) {
        case "alphabetical":
          sortAlphabetical()
          break
        case "byHandicap":
          sortByHandicap()
          break
        case "random":
          sortRandom()
          break
        default:
          break
      }
      break
    case "loadLineupTable":
      idsInLineup.forEach(addRow)
      updateTeamTables()
      break
    case "createExportLineupTable":
      players.forEach(addRow)
      break
    case "createExportTeamsTable":
      break
    default:
      break
  }
  return playersArray
}
