import {set} from './localStorage';
export default function setIsLoggedIn (ghinNumber, lastName){
  const ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";

  var request = new XMLHttpRequest();
  request.open('GET', ghinRequest, false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    const data =JSON.parse(request.response);
    set('isLoggedIn', 'true');
    try {
      //eslint-disable-next-line
      let aGolfer =  data.golfers[0].FirstName + ' ' + data.golfers[0].LastName;
    } catch (error){
      set('isLoggedIn', 'false');
    };
  }
};