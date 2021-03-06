import React from "react"
import LineupTableCourseDropDown from "./LineupTableCourseDropDown"

const LineupTableDropDowns = ({
  playingDateOptionItems,
  linkTime,
  linkTimeOptionItems,
  handleLinkTimeChange,
  teeTimeCount,
  playingDate,
  teeTimeCountOptionItems,
  handlePlayingDateChange,
  handleTeeTimeCountChange,
  progs069,
  handleProgs069Change,
  progAdj,
  handleProgAdjChange,
}) => {
  return (
    <>
      <LineupTableCourseDropDown />
      <br></br>
      <div className="select-dropdown-container">
        <label className="selector_left">
          <select value={playingDate} onChange={handlePlayingDateChange}>
            <option value="Date">Playing Date</option>
            {playingDateOptionItems}
          </select>
        </label>
        <label className="selector_right">
          <select value={teeTimeCount} onChange={handleTeeTimeCountChange}>
            <option value="0"># of Tee Times</option>
            {teeTimeCountOptionItems}
          </select>
        </label>
      </div>
      <br />
      <div className="select-dropdown-container">
        <label className="label_link-time">Link Time: </label>
        <label className="selector_lone">
          <select value={linkTime} onChange={handleLinkTimeChange}>
            <option value="">Link Time</option>
            {linkTimeOptionItems}
          </select>
        </label>
      </div>
      <br />

      <div className="select-dropdown-container">
        <label className="selector_left">
          <select value={progs069} onChange={handleProgs069Change}>
            <option value="">Progs Y/N?</option>
            <option value="0">No Progs</option>
            <option value="6">Progs 6/6/6</option>
            <option value="9">Progs 9&9</option>
          </select>
        </label>
        <label className="selector_right">
          <select value={progAdj} onChange={handleProgAdjChange}>
            <option value="">Prog Adj?</option>
            <option value="0">No Adj</option>
            <option value="3">3 plus 3</option>
            <option value="4">4 minus 3</option>
          </select>
        </label>
      </div>
    </>
  )
}
export default LineupTableDropDowns
