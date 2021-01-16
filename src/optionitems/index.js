import React from "react"
import { v4 as uuidv4 } from "uuid"

//date and time dropdowns option items

const playingDates = () => {
  let playingDates = []
  const now = new Date()
  for (let i = 0; i < 8; i++) {
    let month = now.getMonth() + 1
    let day = now.getDate()
    let year = now.getFullYear()
    let playingDate = month + "/" + day + "/" + year
    playingDates[i] = playingDate
    now.setDate(now.getDate() + 1)
  }
  return playingDates
}

export const playingDateOptionItems = playingDates().map((playingDate) => (
  <option key={uuidv4()}>{playingDate}</option>
))
const teeTimeCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const teeTimeCountOptionItems = teeTimeCounts.map((count) => (
  <option key={uuidv4()} value={count}>
    {count + "  tee times"}
  </option>
))

export const linkTimes = () => {
  let linkTimes = []
  linkTimes.push("9:00 Shotgun", "9:30 Shotgun", "1:00 Shotgun", "1:30 Shotgun")
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let firstLinkTime = new Date(year, month, date, 8, 2, 0, 0)
  let hour = firstLinkTime.getHours()
  let minute = firstLinkTime.getMinutes()

  function setLinkTime() {
    let aLinkTime
    if (minute < 10) {
      aLinkTime = hour + ":0" + minute
    } else {
      aLinkTime = hour + ":" + minute
    }
    return aLinkTime
  }

  linkTimes.push(setLinkTime())
  for (let i = 1; i < 75; i++) {
    firstLinkTime.setMinutes(firstLinkTime.getMinutes() + 8)
    hour = firstLinkTime.getHours()
    minute = firstLinkTime.getMinutes()
    linkTimes.push(setLinkTime())
  }
  return linkTimes
}
export const linkTimeOptionItems = linkTimes().map((linkTime) => (
  <option key={uuidv4()} value={linkTime}>
    {linkTime}
  </option>
))

function manualCHList() {
  let manualCHList = []
  manualCHList.push({ value: "*", text: "*" })
  manualCHList.push({ value: "Auto", text: "Auto" })
  for (let i = -10; i < 0; i++)
    manualCHList.push({ value: i, text: "+" + Math.abs(i) })
  for (let i = 0; i < 61; i++) manualCHList.push({ value: i, text: i })
  return manualCHList
}

export const manualCHOptionItems = manualCHList().map((manualCH) => (
  <option key={uuidv4()} value={manualCH.value}>
    {manualCH.text}
  </option>
))
