import React from "react"
import { v4 as uuidv4 } from "uuid"

//date and time dropdowns option items

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
]
const playingDates = () => {
  let playingDates = []
  const today = new Date()
  for (let i = 0; i < 8; i++) {
    let dayName = days[today.getDay()]
    let monthName = months[today.getMonth()]
    let playingDate = dayName + ", " + monthName + " " + today.getDate()
    playingDates[i] = playingDate
    today.setDate(today.getDate() + 1)
  }
  return playingDates
}

export const playingDateOptionItems = playingDates().map((playingDate) => (
  <option key={uuidv4()}>{playingDate}</option>
))
const teeTimeCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const teeTimeCountOptionItems = teeTimeCounts.map((count) => (
  <option key={uuidv4()} value={count}>
    {count === 1 ? count + " tee time" : count + " tee times"}
  </option>
))

const teeAssignments = [
  "Select Tee",
  "1A",
  "1B",
  "2A",
  "2B",
  "3A",
  "3B",
  "4A",
  "4B",
  "5A",
  "5B",
  "6A",
  "6B",
  "7A",
  "7B",
  "8A",
  "8B",
  "9A",
  "9B",
  "10A",
  "10B",
  "11A",
  "11B",
  "12A",
  "12B",
  "13A",
  "13B",
  "14A",
  "14B",
  "15A",
  "15B",
  "16A",
  "16B",
  "17A",
  "17B",
  "18A",
  "18B",
]

export const linkTimes = () => {
  let linkTimes = []
  linkTimes.push(
    "Shotgun",
    "8:30 Shotgun",
    "9:00 Shotgun",
    "9:30 Shotgun",
    "10:00 Shotgun",
    "10:30 Shotgun",
    "11:00 Shotgun",
    "11:30 Shotgun",
    "12:00 Shotgun",
    "12:30 Shotgun",
    "1:00 Shotgun",
    "1:30 Shotgun"
  )
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

export const teeAssignmentOptionItems = teeAssignments().map(
  (teeAssignment) => (
    <option key={uuidv4()} value={teeAssignment}>
      {teeAssignment}
    </option>
  )
)

function manualCHList() {
  let manualCHList = []
  manualCHList.push({ value: "*", text: "*" })
  manualCHList.push({ value: "Auto", text: "Auto" })
  manualCHList.push({ value: "-", text: "Not in Game" })
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
