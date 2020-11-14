import LineupDataService from "../services/LineupService";
export default function saveHandicapsToFirebase (
  players,
  game, 
  course,
  games,
  teesSelected,
  ratings,
  slopes,
  pars,
  firebaseRef){
 
  const saveHandicaps = () => {
    var data = {
      title: game +  " at " + course.toUpperCase(),
      handicaps: {
        players: players,
        game: game,
        course: course,
        games: games,
        teesSelected: teesSelected,
        ratings: ratings,
        slopes: slopes,
        pars: pars,
      }
    };

    if (firebaseRef === 'handicaps') LineupDataService.removeAll(firebaseRef)

    LineupDataService.create(data, firebaseRef)
      .then(() => { 
      })
      .catch(e => {
        console.log(e);
      });
  };

  saveHandicaps();
}

