import React from "react"
import { RecoilRoot } from "recoil"
import { get } from "../helpers/localStorage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom"
import "../styles/App.css"
import Header from "./Header"
import IndividualPage from "./IndividualPage"
import GamesPage from "./GamesPage"
import LoginPage from "./LoginPage"
import LogoutPage from "./LogoutPage"
import SelectTeesPage from "./SelectTeesPage"
import LineupPage from "./LineupPage"
import PlayersPage from "./PlayersPage"
import HelpPage from "./HelpPage"
import ExportPage from "./ExportPage"

export default function App() {
  let isLoggedIn = get("isLoggedIn")
  if (isLoggedIn === "true") {
    return (
      <RecoilRoot>
        <Router>
          <Header />
          <br />
          <nav className="app-nav">
            <NavLink
              exact
              to="/individual"
              className="app-navlink"
              activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
            >
              Individual
            </NavLink>
            <NavLink
              exact
              to="/games"
              className="app-navlink"
              activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
            >
              Games
            </NavLink>
            <NavLink
              exact
              to="/players"
              className="app-navlink"
              activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
            >
              Players
            </NavLink>
            <NavLink
              exact
              to="/lineup"
              className="app-navlink"
              activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
            >
              Lineup
            </NavLink>
            <NavLink
              exact
              to="/export"
              className="app-navlink"
              activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
            >
              Export
            </NavLink>
          </nav>
          <br />
          <nav className="app-nav">
            <NavLink
              exact
              to="/settings"
              className="app-navlink-last"
              activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
            >
              Settings
            </NavLink>
          </nav>
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
            <Route path="/lineup">
              <Lineup />
            </Route>
            <Route exact path="/">
              <Redirect to="/lineup" />>
            </Route>
          </Switch>
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
      <nav className="app-nav">
        <NavLink
          exact
          to={`${url}/logout`}
          className="app-navlink"
          activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
        >
          Log Out
        </NavLink>
        <NavLink
          exact
          to={`${url}/selecttees`}
          className="app-navlink"
          activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
        >
          Select Tees
        </NavLink>
        <NavLink
          exact
          to={`${url}/help`}
          className="app-navlink-last"
          activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
        >
          Help
        </NavLink>
      </nav>
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
