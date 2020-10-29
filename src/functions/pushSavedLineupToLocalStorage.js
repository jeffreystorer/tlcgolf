import {set} from '../functions/localStorage';

export default function pushSavedLineupToLocalStorage({
course, 
game, 
linkTime, 
playingDate, 
progs069, 
progsAdj, 
teamHcpAndProgs, 
teamTables, 
teeTimeCount, 
textAreaValue
}){
    set("course", course);
    set("game", game);
    set('savedLinkTime', linkTime);
    set('savedPlayingDate', playingDate);
    set('savedProgs069', progs069);
    set('savedProgsAdj', progsAdj)
    set('savedTeamHcpAndProgs', teamHcpAndProgs);
    set('savedTeamTables', teamTables);
    set('savedTeeTimeCount', teeTimeCount);
    set('savedTextAreaValue', textAreaValue);
}