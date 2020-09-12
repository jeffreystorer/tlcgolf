import {get, set} from './localStorage';


export function requestGHIN() {
  let requests = [];
  let players = get("players");
  players.forEach(buildRequests);

  Promise.all(requests).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(data => (addGHINDataToPlayers(data)));

  function addGHINDataToPlayers(data) {
    players.forEach(addData);
    function addData(item, index) {
      try {
      item[2] =  data[index].golfers[0].FirstName;
    } catch (error){
      item[2] = 'BAD PLAYER';
      item[3] = '-.-'
      return
    };
      item[3] = data[index].golfers[0].Value;
      item[4] = data[index].golfers[0].Gender;
    }
    set("players", players);
}

  function buildRequests(item, index) {
    let ghinNumber = item[0];
    let lastName = item[1];
    let ghinRequest = 'https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=' + ghinNumber + '&lastName=' + lastName + '&incllsudeLowHandicapIndex=true';
    requests = [...requests, fetch(ghinRequest)];
    

  }
}
export default requestGHIN;