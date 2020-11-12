import LineupDataService from "../services/LineupService";
export default function saveLineupToFirebase (
  players,
  game, 
  course, 
  playingDate, 
  teeTimeCount, 
  linkTime, 
  progs069,
  progAdj, 
  teamTables,
  textAreaValue,
  teesSelected,
  firebaseRef){
 
  const saveLineup = () => {
    var data = {
      title: game + ", " + playingDate + " at " + linkTime + " at " + course.toUpperCase(),
      lineup: {
        players: players,
        game: game,
        course: course,
        playingDate: playingDate,
        teeTimeCount: teeTimeCount,
        linkTime: linkTime,
        progs069: progs069,
        progAdj: progAdj, 
        teamTables: teamTables,
        textAreaValue: textAreaValue,
        teesSelected: teesSelected
      }
    };

    if (firebaseRef === 'mondaylineup') LineupDataService.removeAll(firebaseRef)

    LineupDataService.create(data, firebaseRef)
      .then(() => { 
      })
      .catch(e => {
        console.log(e);
      });
  };

  saveLineup();
}

