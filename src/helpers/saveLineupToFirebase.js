import LineupDataService from "../services/LineupService"
export default function saveLineupToFirebase(
  title,
  allPlayers,
  playersInLineup,
  players,
  game,
  games,
  course,
  courseName,
  playingDate,
  teeTimeCount,
  linkTime,
  progs069,
  progAdj,
  teamTables,
  textAreaValue,
  textAreaRowCount,
  teesSelected,
  ratings,
  slopes,
  pars,
  firebaseRef
) {
  const saveLineup = () => {
    var data = {
      title: title,
      lineup: {
        allPlayers: allPlayers,
        playersInLineup: playersInLineup,
        players: players,
        game: game,
        games: games,
        course: course,
        playingDate: playingDate,
        teeTimeCount: teeTimeCount,
        linkTime: linkTime,
        progs069: progs069,
        progAdj: progAdj,
        teamTables: teamTables,
        textAreaValue: textAreaValue,
        textAreaRowCount: textAreaRowCount,
        teesSelected: teesSelected,
        ratings: ratings,
        slopes: slopes,
        pars: pars,
      },
    }

    if (firebaseRef === "lineup") LineupDataService.removeAll(firebaseRef)

    LineupDataService.create(data, firebaseRef)
      .then(() => {})
      .catch((e) => {
        console.log(e)
      })
  }

  saveLineup()
}
