import React from "react"
import styled from "styled-components"

const StyledHeader = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  overflow: hidden;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  top: 0;
  height: fit-content;
  color: #ffffff;
  font-size: 24px;
  background-color: #00365f;
  text-align: center;
  z-index: 1;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.28);
`

export default function Header() {
  return (
    <>
      <StyledHeader>TLC Golf</StyledHeader>
    </>
  )
}
