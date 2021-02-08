import React from "react"
import { get } from "../helpers/localStorage"
import styled from "styled-components"
import { Button } from "./StyledComponents"

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
        <Button onClick={handleClick}>{title}</Button>
      </StyledLink>
    </>
  )
}

export default LinkButton
