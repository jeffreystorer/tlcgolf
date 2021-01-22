import LineupDataService from "../services/LineupService"
import { useObject } from "react-firebase-hooks/database"

const LineupLoadSaved = (key, loadLineupFromFirebase, firebaseRef) => {
  console.log("😊😊 key", key)
  console.log("😊😊 firebaseRef", firebaseRef)
  const [value, loading, error] = useObject(
    LineupDataService.getLineup(key, firebaseRef)
  )
  if (!loading && !error) {
    let lineupObj = value.val()
    let savedLineup = lineupObj.lineup
    loadLineupFromFirebase(savedLineup)
  }
}
export default LineupLoadSaved
