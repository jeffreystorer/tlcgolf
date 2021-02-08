import React from "react"
import { RecoilRoot } from "recoil"
import { get } from "../../shared/helpers/localStorage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom"
import Header from "../../shared/components/Header"
import IndividualPage from "../../screens/individual/components/IndividualPage"
import GamesPage from "../../screens/games/components/GamesPage"
import LoginPage from "../../screens/login/components/LoginPage"
import LogoutPage from "../../screens/logout/components/LogoutPage"
import SelectTeesPage from "../../screens/selecttees/components/SelectTeesPage"
import LineupPage from "../../screens/lineup/components/LineupPage"
import PlayersPage from "../../screens/players/components/PlayersPage"
import HelpPage from "../../screens/help/components/HelpPage"
import ExportPage from "../../screens/export/components/ExportPage"
import styled from "styled-components"

const StyledDiv = styled.div`
  text-align: center;
  background-color: white;
`
const StyledNav = styled.nav`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  float: none;
  text-align: center;
  list-style: none;
  background-color: #f2f2f2;
  border-bottom: 0px solid #ccc;
  border-top: 0px solid #ccc;
  height: 23px;
`
const activeClassName = "nav-item-active"

const StyledLinkNavItem = styled(NavLink).attrs({
  activeClassName,
})`
  &.${activeClassName} {
    color: #3378ac;
    font-weight: bold;
  }
  &:hover {
    color: #c00;
    background-color: #fff;
  }
  padding: 1px 5px;
  text-decoration: none;
  color: black;
  border-right: 1px solid #ccc;
  height: 23px;
`

const StyledLinkNavItemLast = styled(NavLink).attrs({
  activeClassName,
})`
  &.${activeClassName} {
    color: #3378ac;
    font-weight: bold;
  }
  &:hover {
    color: #c00;
    background-color: #fff;
  }
  padding: 1px 5px;
  text-decoration: none;
  color: black;
  border-right: 1px solid #fff;
  height: 23px;
`

export default function App() {
  let isLoggedIn = get("isLoggedIn")
  if (isLoggedIn === "true") {
    return (
      <RecoilRoot>
        <Router>
          <StyledDiv>
            <Header />
            <br />
            <StyledNav>
              <StyledLinkNavItem exact to="/individual">
                Individual
              </StyledLinkNavItem>
              <StyledLinkNavItem exact to="/games">
                Games
              </StyledLinkNavItem>
              <StyledLinkNavItem exact to="/players">
                Players
              </StyledLinkNavItem>
              <StyledLinkNavItem exact to="/">
                Lineup
              </StyledLinkNavItem>
              <StyledLinkNavItem exact to="/export">
                Export
              </StyledLinkNavItem>
              <StyledLinkNavItemLast exact to="/settings">
                Settings
              </StyledLinkNavItemLast>
            </StyledNav>
            <Switch>
              <Route path="/individual">
                <Individual />
              </Route>
              <Route path="/games">
                <Games />
              </Route>
              <Route path="/players">
                <Players />
              </Route>
              <Route path="/export">
                <Export />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/">
                <Lineup />
              </Route>
            </Switch>
          </StyledDiv>
        </Router>
      </RecoilRoot>
    )
  } else {
    return <LoginPage />
  }
}

function Setting() {
  let { settingId } = useParams()
  let aSetting = settingId
  switch (aSetting) {
    case "selecttees":
      return (
        <>
          <SelectTeesPage />
        </>
      )
    case "help":
      return (
        <>
          <HelpPage />
        </>
      )

    default:
      return (
        <>
          <LogoutPage />
        </>
      )
  }
}

function Settings() {
  let { path, url } = useRouteMatch()
  return (
    <>
      <br></br>
      <StyledNav>
        <StyledLinkNavItem exact to={`${url}/logout`}>
          Log Out
        </StyledLinkNavItem>
        <StyledLinkNavItem exact to={`${url}/selecttees`}>
          Select Tees
        </StyledLinkNavItem>
        <StyledLinkNavItemLast exact to={`${url}/help`}>
          Help
        </StyledLinkNavItemLast>
      </StyledNav>
      <Switch>
        <Route path={`${path}/:settingId`}>
          <Setting />
        </Route>
      </Switch>
    </>
  )
}

function Games() {
  return (
    <>
      <br></br>
      <GamesPage />
    </>
  )
}

function Individual() {
  return (
    <>
      <br></br>
      <IndividualPage />
    </>
  )
}

function Players() {
  return (
    <>
      <PlayersPage />
    </>
  )
}

function Lineup() {
  return (
    <>
      <LineupPage />
    </>
  )
}

function Export() {
  return (
    <>
      <ExportPage />
    </>
  )
}
