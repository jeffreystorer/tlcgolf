import getExportTeesSelectedArray from "./getExportTeesSelectedArray"

export default function createTeamTableHeaderRow(teesSelected) {
  let teesSelectedArray = getExportTeesSelectedArray(teesSelected)
  teesSelectedArray.unshift("")
  return teesSelectedArray
}
