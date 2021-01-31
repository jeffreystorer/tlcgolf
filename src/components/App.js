import React from "react"
import { RecoilRoot } from "recoil"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom"
import "../styles/App.css"
import Header from "./Header"
import IndividualPage from "./IndividualPage"
import GamesPage from "./GamesPage"
import LoginPage from "./LoginPage"
import SelectTeesPage from "./SelectTeesPage"
import LineupPage from "./LineupPage"
import PlayersPage from "./PlayersPage"
import HelpPage from "./HelpPage"
import ExportPage from "./ExportLineupPage"

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <br />
        <nav>
          <NavLink
            exact
            to="/individual"
            className="navitem"
            activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
          >
            Individual
          </NavLink>
          <NavLink
            exact
            to="/games"
            className="navitem"
            activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
          >
            Games
          </NavLink>
          <NavLink
            exact
            to="/players"
            className="navitem"
            activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
          >
            Players
          </NavLink>
          <NavLink
            exact
            to="/"
            className="navitem"
            activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
          >
            Lineup
          </NavLink>
          <NavLink
            exact
            to="/export"
            className="navitem"
            activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
          >
            Export
          </NavLink>
          <NavLink
            exact
            to="/settings"
            className="navitem-last"
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
          <Route path="/">
            <Lineup />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  )
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
          <LoginPage />
        </>
      )
  }
}

function Settings() {
  let { path, url } = useRouteMatch()
  return (
    <>
      <br></br>
      <nav>
        <NavLink
          exact
          to={`${url}/login`}
          className="navitem"
          activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
        >
          Login
        </NavLink>
        <NavLink
          exact
          to={`${url}/selecttees`}
          className="navitem"
          activeStyle={{ color: "#3378ac", fontWeight: "bold" }}
        >
          Select Tees
        </NavLink>
        <NavLink
          exact
          to={`${url}/help`}
          className="navitem"
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
