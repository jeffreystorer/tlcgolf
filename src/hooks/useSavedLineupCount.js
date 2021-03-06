import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../services/LineupService"

export default function useSavedLineupCount(firebaseRef) {
  const [Lineups] = useList(LineupDataService.getAll(firebaseRef))
  return Lineups.length
}
