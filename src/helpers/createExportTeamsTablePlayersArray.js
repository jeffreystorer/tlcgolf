import { get } from "../helpers/localStorage"

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
        let gameIndex = gameNumber + 5
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
    let player
    let local = aPlayer[5]
    if (showFirstName) {
      player = aPlayer[2] + " " + aPlayer[1]
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
      teeChoice: "",
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
