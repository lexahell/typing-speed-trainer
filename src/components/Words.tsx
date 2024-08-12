import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import Word from './Word';
import {
  pushInputChar,
  popInputChar,
  setWords,
  prevInputWord,
  nextInputWord,
  resetInputWords,
  incrementErrors,
  setStatus,
  updateTotalWordsCount,
} from '../redux/appSlice';
import React, { useCallback } from 'react';

const Words = () => {
  const { words, inputWords, status } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch = useAppDispatch();
  const isKeyboardCodeAllowed = useCallback((code: string) => {
    return (
      code.startsWith('Key') ||
      code.startsWith('Digit') ||
      code === 'Backspace' ||
      code === 'Space' ||
      code === 'Minus'
    );
  }, []);
  const wordsShouldBeUpdated =
    words.length < inputWords.length && status === 'run';
  const isStarting =
    status === 'start' && (inputWords[0].length > 0 || inputWords.length > 1);

  React.useEffect(() => {
    if (wordsShouldBeUpdated) {
      dispatch(updateTotalWordsCount());
      dispatch(resetInputWords());
      dispatch(setWords());
    }
  }, [dispatch, wordsShouldBeUpdated]);

  React.useEffect(() => {
    if (isStarting) {
      dispatch(setStatus('run'));
    }
  }, [isStarting, dispatch]);

  React.useEffect(() => {
    const keydownHandler = ({ key, code }: KeyboardEvent) => {
      if (!isKeyboardCodeAllowed(code)) {
        return;
      }
      switch (key) {
        case 'Backspace':
          if (inputWords[inputWords.length - 1].length === 0) {
            dispatch(prevInputWord());
          } else {
            dispatch(popInputChar());
          }
          break;
        case ' ':
          if (
            words[inputWords.length - 1] !==
            inputWords[inputWords.length - 1].join('')
          ) {
            dispatch(incrementErrors());
          }
          dispatch(nextInputWord());
          break;
        default:
          if (
            words[inputWords.length - 1][
              inputWords[inputWords.length - 1].length
            ] !== key
          ) {
            dispatch(incrementErrors());
          }
          dispatch(pushInputChar(key));
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [dispatch, inputWords, isKeyboardCodeAllowed, words]);

  return (
    <>
      <div
        className={`text-left text-xl sm:text-3xl flex flex-wrap gap-x-3 max-w-3xl mt-3`}
      >
        {words.map((word, index) => {
          if (!inputWords || index >= inputWords.length) {
            return <Word key={index} expected={word}></Word>;
          } else {
            return (
              <Word
                isLast={index === inputWords.length - 1}
                key={index}
                expected={word}
                current={inputWords[index].join('')}
              ></Word>
            );
          }
        })}
      </div>
    </>
  );
};

export default Words;
