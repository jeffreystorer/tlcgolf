import LineupDataService from "../services/LineupService";
import { get } from '../functions/localStorage';
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
  textAreaValue,){
  
  const firebaseRef = get('firebaseRef');
 

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
      }
    };

    if (firebaseRef === 'mondaylineup') LineupDataService.removeAll()

    LineupDataService.create(data)
      .then(() => { 
      })
      .catch(e => {
        console.log(e);
      });
  };

  saveLineup();
}

