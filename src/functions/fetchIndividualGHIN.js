import {set} from './localStorage';
export default function fetchIndividualGHIN (ghinNumber, lastName){  
    const ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
    fetch(ghinRequest)
    .then((response) => response.json())
    .then(data => (processGHINData(data)))

    function processGHINData(data){
    set('isLoggedIn', 'true');
    try {
      //eslint-disable-next-line
      let aGolfer =  data.golfers[0].FirstName + ' ' + data.golfers[0].LastName;
    } catch (error){
      set('isLoggedIn', 'false');
    }
  }
};