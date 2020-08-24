import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { set, get, jget, jset } from './local-storage-functions';


function DisplayUserGameTable () {
  console.log("Displaying User Game Table");
  //if ((!get('Games') === null) & (!get("Players") === null)) {
  let games = jget('Games'));
  //const players = JSON.parse(get('Players'));
  //alert(players);
  const players = [["2898549","Ahrens","","","","YES"],["8402913","Belanger","","YES","YES",""],["2897727","Bross","","YES","YES","YES"],["3061606","Carlyle","","","YES",""],["2898357","Cogswell","","","","YES"],["1917731","Costa","","YES","YES",""],["2898770","Cronin","","","YES",""],["2898388","De Berardinis","","","","YES"],["2898782","Dills","","YES","YES","YES"],["4438481","Dooley","YES","YES","",""],["2297586","Drago","","","YES",""],["293338","Duprey","YES","YES","YES","YES"],["860478","Engles","YES","YES","",""],["2898194","Gezovich","","","","YES"],["8482976","Hayes","","YES","YES",""],["8625458","Holcombe","YES","YES","YES","YES"],["2898278","Hooper","","YES","YES","YES"],["8482977","Laist","YES","YES","YES",""],["2898197","Larson","","YES","YES","YES"],["8482980","Lieb","YES","YES","YES","YES"],["5891112","Lieberman","YES","YES","YES",""],["10220640","Long","YES","YES","",""],["2898884","Marino","","YES","YES","YES"],["2530002","McCloskey","","YES","YES",""],["2899331","Morrell","","","YES","YES"],["1884886","Nichols","YES","YES","YES","YES"],["2897876","Pajak","YES","YES","","YES"],["8482979","Pohl","YES","YES","YES","YES"],["1570352","Poore","YES","YES","YES",""],["2898560","Rankin","","","YES",""],["2145248","Saunders","","YES","YES","YES"],["8620323","Schwartz","","YES","YES",""],["2898370","Smith","","","YES",""],["5201691","Stangl","","","YES",""],["585871","Storer","YES","YES","YES","YES"],["8546778","Tate","YES","YES","YES","YES"],["482826","Tocci","","","YES",""],["8538889","Towson","","","","YES"],["2897960","Turner","","YES","YES","YES"],["1621216","Werneke","YES","YES","YES","YES"]]
  

    let columns = [
      {
        dataField: 'ghinnumber',
        text: 'GHIN Number'
      }, {
        dataField: 'lastname',
        text: 'Last Name'
      }
    ]
    let i;
    for (i=0; i < games.length; i++ ) {
      let newColumn;
      newColumn = {dataField: i, text: games[i]};
      columns = [...columns, newColumn];
    };
    return (
      <div className="display-user-game-table">
        <BootstrapTable keyField='ghinnumber' data={ players } columns={ columns } />
      </div>
    )

/*     } else {
      return null
    } */
}

export default DisplayUserGameTable;

