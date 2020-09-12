import { atom, selector } from "recoil";

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
  default: 0.0,
})

export const firstNameState = atom({
  key: "firstNameState",
  default: "First"
})

export const genderState = atom({
  key: "genderState",
  default: "M"
})

export const golferStateSelector = selector({
  key: "golferStateSelector",
  get:  ({ get }) => {
    const golfer = get(firstNameState) + 
  localStorage.getItem('lastName') +
  "(" + get(indexState) + ")";
  return golfer;
  }
})
