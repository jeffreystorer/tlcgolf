import { atom, selector } from "recoil";

export const ghinNumberState = atom({
  key: "ghinNumberState",
  default: 0,
})

export const lastNameState = atom({
  key: "lastNameState",
  default: "",
})
export const courseState = atom({
  key: "courseState",
  default: "",
});

export const gameState = atom({
  key: "gameState",
  default: "",
});

export const indexState = atom({
  key: "indexState",
  default: "0.0",
})

export const firstNameState = atom({
  key: "firstNameState",
  default: "First"
})

export const genderState = atom({
  key: "genderState",
  default: "M"
})

export const playersState = atom({
  key: "playersState",
  default: [],
})

export const gamesState = atom({
  key: "gamesState",
  default: [],
})

export const sheetURLState = atom ({
  key: "sheetURLState",
  default: []
})

export const hasGoogleSheetState = atom ({
  key: "hasGoogleSheetState",
  default: "false",
})

export const teesSelectedState = atom ({
  key: "teesSelectedState",
  default: [],
})

export const golferStateSelector = selector({
  key: "golferStateSelector",
  get:  ({ get }) => {
    const golfer = 
      get(firstNameState)+ " " + 
      get(lastNameState) +
      " (" + 
      get(indexState) +
       ")";
  return golfer;
  }
})