import { get } from "../../../shared/helpers/localStorage"
import createLineupTablePlayersArray from "../../../shared/helpers/createLineupTablePlayersArray"

export default function getPlayersNotInSavedLineupCount(
  course,
  game,
  games,
  teesSelected,
  ratings,
  slopes,
  pars
) {
  let randomTeams = false

  let playersArray = createLineupTablePlayersArray(
    course,
    game,
    games,
    teesSelected,
    ratings,
    slopes,
    pars,
    randomTeams
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