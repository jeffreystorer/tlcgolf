export default function getPlayersInTeeTime(playersList, teamTables) {
  const {
    team0 = [],
    team1 = [],
    team2 = [],
    team3 = [],
    team4 = [],
    team5 = [],
    team6 = [],
    team7 = [],
    team8 = [],
    team9 = [],
  } = teamTables
  return playersList.filter((player) => {
    return (
      team0.find((p) => p.id === player.id) ||
      team1.find((p) => p.id === player.id) ||
      team2.find((p) => p.id === player.id) ||
      team3.find((p) => p.id === player.id) ||
      team4.find((p) => p.id === player.id) ||
      team5.find((p) => p.id === player.id) ||
      team6.find((p) => p.id === player.id) ||
      team7.find((p) => p.id === player.id) ||
      team8.find((p) => p.id === player.id) ||
      team9.find((p) => p.id === player.id)
    )
  })
}
