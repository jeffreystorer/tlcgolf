import React from "react"
import { get } from "../../../helpers/localStorage"
import styled from "styled-components"

const StyledLink = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const LinkButton = ({ title }) => {
  const sheetURL = get("sheetURL")

  function handleClick() {
    localStorage.clear()
    document.location = "/settings/login"
    document.location = sheetURL
  }

  return (
    <>
      <StyledLink>
        <button onClick={handleClick}>{title}</button>
      </StyledLink>
    </>
  )
}

export default LinkButton
