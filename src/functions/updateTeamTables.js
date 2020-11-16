  function updateTeamTables(
      teeTimeCount,
      teamTables,
      playersArray
  ){
    for (let i = 0; i < teeTimeCount; i++) {
      let aTeamName = "team" + i;
      try {
      let aPlayerCount = teamTables[aTeamName].length;
      for (let j = 0; j < aPlayerCount; j++){
        let aTeamMemberId = teamTables[aTeamName][j].id;
        let aPlayerObj = playersArray.find(obj => 
          obj.id === aTeamMemberId
        )
        teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
        teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps;
      }
      } catch (error) {
        console.log("error updating Team Tables");
      }

    }
  }