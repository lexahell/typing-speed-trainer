import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

const initialState: {
  words: string[];
  inputWords: string[][];
  status: 'start' | 'run' | 'end';
  errors: number;
  totalWordsCount: number;
} = {
  errors: 0,
  totalWordsCount: 0,
  words: faker.word.words(20).toLowerCase().split(' '),
  inputWords: [[]],
  status: 'start',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setWords: (state) => {
      state.words = faker.word.words(20).toLowerCase().split(' ');
    },
    setStatus: (state, action) => {
      if (action.payload === 'end') {
        state.totalWordsCount += state.inputWords.filter(
          (el: string[]) => el.length
        ).length;
      }
      if (action.payload === 'start') {
        state.inputWords = [[]];
        state.errors = 0;
        state.totalWordsCount = 0;
        state.words = faker.word.words(20).toLowerCase().split(' ');
      }
      state.status = action.payload;
    },
    resetInputWords: (state) => {
      state.inputWords = [[]];
    },
    pushInputChar: (state, action) => {
      state.inputWords[state.inputWords.length - 1].push(action.payload);
    },
    popInputChar: (state) => {
      state.inputWords[state.inputWords.length - 1].pop();
    },
    nextInputWord: (state) => {
      state.inputWords.push([]);
    },
    prevInputWord: (state) => {
      if (state.inputWords.length > 1) {
        state.inputWords.pop();
      }
    },
    incrementErrors: (state) => {
      state.errors++;
    },
    updateTotalWordsCount: (state) => {
      state.totalWordsCount += state.totalWordsCount += state.inputWords.filter(
        (el: string[]) => el.length
      ).length;
    },
  },
});

export const {
  setWords,
  setStatus,
  resetInputWords,
  pushInputChar,
  popInputChar,
  nextInputWord,
  prevInputWord,
  incrementErrors,
  updateTotalWordsCount,
} = appSlice.actions;

export default appSlice.reducer;
