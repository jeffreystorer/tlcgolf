import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import * as state from "../../../shared/state"
import { set } from "../../../shared/helpers/localStorage"

export default function LineupTableCourseDropDown() {
  const [course, setCourse] = useRecoilState(state.courseState)

  useEffect(() => {
    setCourse(course)
    set("course", course)
  }, [course, setCourse])

  function handleCourseChange(e) {
    setCourse(e.target.value)
    set("course", e.target.value)
  }

  return (
    <>
      <div className="select-dropdown-container">
        <label>
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
