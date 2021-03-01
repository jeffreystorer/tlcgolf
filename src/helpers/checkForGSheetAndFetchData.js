import { get } from "../helpers/localStorage"
import setSheetURL from "../helpers/setSheetURL"
import fetchPlayersAndGames from "../helpers/fetchPlayersAndGames"

export default function checkForGSheetAndFetchData() {
  setSheetURL()
  if (get("hasGoogleSheet") === "true") {
    fetchPlayersAndGames()
  }
}
