import { tees, courses } from "../data"
import { get } from "./localStorage"
import getTeeValueFromTeeName from "../helpers/getTeeValueFromTeeName"
import setRatingSlopePar from "./setRatingSlopePar"
import shuffleArray from "../helpers/shuffleArray"
export default function createLineupTablePlayersArrray(
  course,
  game,
  games,
  teesSelected,
  ratings,
  slopes,
  pars,
  sortOrder
) {
  let players = get("players")
  var playersArray = []
  let strHcpIndex
  let hcpIndex
  let gender

  //next, we build an array of tees
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

  //construct the row
  function compute(aPlayer, index) {
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
    let aPlayer = item
    var newRow = compute(aPlayer, index)
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
  return playersArray
}
