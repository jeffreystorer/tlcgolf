import LineupDataService from "../services/LineupService";
export default function saveLineupToFirebase (
  playersInLineup,
  players,
  game,
  games,
  course, 
  playingDate, 
  teeTimeCount, 
  linkTime, 
  progs069,
  progAdj, 
  teamTables,
  textAreaValue,
  teesSelected,
  ratings,
  slopes,
  pars,
  firebaseRef){
 
  const saveLineup = () => {
    var data = {
      title: game + ", " + playingDate + " at " + linkTime + " at " + course.toUpperCase(),
      lineup: {
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
        teesSelected: teesSelected,
        ratings: ratings,
        slopes: slopes,
        pars: pars,
      }
    };

    if (firebaseRef === 'lineup') LineupDataService.removeAll(firebaseRef)

    LineupDataService.create(data, firebaseRef)
      .then(() => { 
      })
      .catch(e => {
        console.log(e);
      });
  };

  saveLineup();
}

