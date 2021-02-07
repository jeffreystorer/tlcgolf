import getExportTeesSelectedArray from "../helpers/getExportTeesSelectedArray"

export default function createTeamTableHeaderRow(teesSelected) {
  let teesSelectedArray = getExportTeesSelectedArray(teesSelected)
  teesSelectedArray.unshift("")
  return teesSelectedArray
}
