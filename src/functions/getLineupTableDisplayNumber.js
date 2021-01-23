import * as courseData from "../data"
import { get } from "../functions/localStorage"

export default function getLineupTableDisplayNumber(
  course,
  game,
  games,
  hasGoogleSheet
) {
  let playersInLineup = get("playersInLineup")
  let displayNumber
  if (hasGoogleSheet === "true") {
    displayNumber = 0
    if (
      playersInLineup &&
      games.includes(game) &&
      courseData.courses.includes(course)
    ) {
      displayNumber = 2
    } else if (games.includes(game) && courseData.courses.includes(course)) {
      displayNumber = 1
    } else if (playersInLineup && games.includes(game)) {
      displayNumber = 3
    }
  }
  return displayNumber
}
