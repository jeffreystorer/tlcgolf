import React, { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import * as state from "../../../shared/state"
import { set } from "../../../shared/helpers/localStorage"

export default function GamesTableDropDowns() {
  const [course, setCourse] = useRecoilState(state.courseState)
  const [game, setGame] = useRecoilState(state.gameState)
  const games = useRecoilValue(state.gamesState)

  useEffect(() => {
    setCourse(course)
  }, [course, setCourse])

  useEffect(() => {
    setGame(game)
  }, [game, setGame])
  let optionItems

  function handleCourseChange(e) {
    setCourse(e.target.value)
    set("course", e.target.value)
  }

  function handleGameChange(e) {
    setGame(e.target.value)
    set("game", e.target.value)
    localStorage.removeItem("playersInLineup")
  }
  try {
    optionItems = games.map((game) => (
      <option key={game} value={game}>
        {game}
      </option>
    ))
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <div className="select-dropdown-container">
        <label className="left-selector">
          <select value={game} onChange={handleGameChange}>
            <option value="">Select Game</option>
            {optionItems}
          </select>
        </label>
        <label className="right-selector">
          <select value={course} onChange={handleCourseChange}>
            <option value="">Select Course</option>
            <option value="dc">Deer Creek</option>
            <option value="mg">Magnolia</option>
            <option value="mw">Marshwood</option>
            <option value="or">Oakridge</option>
            <option value="pa">Palmetto</option>
            <option value="tp">Terrapin Point</option>
          </select>
        </label>
      </div>
    </>
  )
}
