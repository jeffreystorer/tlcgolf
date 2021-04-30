import { get } from "../helpers/localStorage"
import getTeeValueFromTeeName from "../helpers/getTeeValueFromTeeName"

export default function createExportTeamsTablePlayersArrray(
  showFirstName,
  game,
  games
) {
  let players = get("players")
  const showLocalNumbers = get("showLocalNumbers")
  //declare some variables
  let playersArray = []

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

  //construct the row
  function compute(aPlayer, index) {
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

  //add a row for each player
  function doAdd(item, index) {
    let aPlayer = item
    var newRow = compute(aPlayer, index)
    playersArray.push(newRow)
  }

  players.forEach(addRow)
  return playersArray
}
