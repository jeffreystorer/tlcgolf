import { get } from "./localStorage"
import createPlayersArray from "./createPlayersArray"

export default function getPlayersNotSavedLineupCount(
  course,
  game,
  games,
  teesSelected,
  ratings,
  slopes,
  pars
) {
  let playersArrayType = "createLineupTable"
  let notUsed = ""
  let playersArray = createPlayersArray(
    playersArrayType,
    notUsed,
    notUsed,
    course,
    game,
    games,
    teesSelected,
    ratings,
    slopes,
    pars,
    notUsed,
    notUsed,
    "alphabetical"
  )

  let playersInLineup = get("playersInLineup")

  let playersNotInLineupArray = []

  playersArray.forEach((player) => {
    if (playersInLineup.includes(player.id.toString()) === false) {
      playersNotInLineupArray.push(player)
    }
  })
  return playersNotInLineupArray.length
}
