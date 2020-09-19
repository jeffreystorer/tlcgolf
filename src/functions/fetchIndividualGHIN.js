import {get} from './localStorage'
export default function fetchIndividualGHIN (){
  const ghinNumber = get('ghinNumber');
  const lastName = get('lastName');
  const ghinRequest = "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" + ghinNumber + "&lastName=" + lastName + "&incllsudeLowHandicapIndex=true";
  
  var request = new XMLHttpRequest();
  request.open('GET', ghinRequest, false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    const data = JSON.parse(request.response);
    try {
      let index = data.golfers[0].Value;
      let gender = data.golfers[0].Gender;
      let golfer = data.golfers[0].FirstName + " " + get('lastName') + " (" + data.golfers[0].Value + ")"
      return [index, gender, golfer]
    } catch (error) {
    }
  }
};