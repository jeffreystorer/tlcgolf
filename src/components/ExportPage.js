import React, { useState, useEffect } from "react"
import "../styles/App.css"
import ExportTable from "./ExportTable"
import fetchGamesGHIN from "../helpers/fetchGamesGHIN"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function ExportPage({ lineupTitle, lineup }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGamesGHIN(setLoading)
  }, [])
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }

  if (loading) {
    return (
      <Loader
        style={style}
        type="Circles"
        color="#3378AC"
        height={80}
        width={80}
      />
    )
  }
  return (
    <>
      <ExportTable />
    </>
  )
}
