import LineupDataService from "../services/LineupService";
import {get} from './localStorage';

export default function saveLineupToFirebase (){
  const game = get('savedGame');
  const course = get('savedCourse');
  const playingDate = get('savedPlayingDate');
  const teeTimeCount = get('savedTeeTimeCount');
  const linkTime = get('savedLinkTime');
  let progs069 = get('savedProgs069');
  if (!progs069) progs069 = 0;
  let progsAdj = get('savedProgsAdj');
  if (!progsAdj) progsAdj = 0;
  const teamTables = get('savedTeamTables');
  const teamHcpAndProgs = get('savedTeamHcpAndProgs');
  const textAreaValue = get('savedTextAreaValue');
  const initialLineupState = {
    key: null,
    title: "",
    lineup: {
      game: "",
      course: "",
      playingDate: "",
      teeTimeCount: 0,
      linkTime: "",
      progs069: "0",
      progsAdj: "0",
      teamTables: {
        times: [],
        team0:[],
        team1:[],
        team2:[],
        team3:[],
        team4:[],
        team5:[],
        team6:[],
        team7:[],
        team8:[],
        team9:[],
      },
      teamHcpAndProgs: {
        team0:[0,0],
        team1:[0,0],
        team2:[0,0],
        team3:[0,0],
        team4:[0,0],
        team5:[0,0],
        team6:[0,0],
        team7:[0,0],
        team8:[0,0],
        team9:[0,0],
      },
      textAreaValue: "",

    }
  };

  let lineup = initialLineupState;

  lineup.title = "Lineup for " + playingDate + " at " + linkTime + " at " + course.toUpperCase();
  const saveLineup = () => {
    var data = {
      title: lineup.title,
      lineup: {
        game: game,
        course: course,
        playingDate: playingDate,
        teeTimeCount: teeTimeCount,
        linkTime: linkTime,
        progs069: progs069,
        progsAdj: progsAdj, 
        teamTables: teamTables,
        teamHcpAndProgs: teamHcpAndProgs,
        textAreaValue: textAreaValue,
      }
    };

    LineupDataService.create(data)
      .then(() => {
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  saveLineup();
}

