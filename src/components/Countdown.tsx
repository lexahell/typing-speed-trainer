import React, { useCallback, useRef, useState } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { setStatus } from '../redux/appSlice';
import { useSelector } from 'react-redux';

const Countdown = ({ seconds }: { seconds: number }) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.app);
  const [time, setTime] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTimerEnded = time <= 0;
  const isRunning = intervalRef.current !== null;

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTime, hasTimerEnded, isRunning]);

  React.useEffect(() => {
    if (status === 'run') {
      startCountdown();
    }
    if (hasTimerEnded) {
      dispatch(setStatus('end'));
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
    if (status === 'end' || status === 'start') {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setTime(seconds);
    }
  }, [hasTimerEnded, startCountdown, status, time, dispatch, seconds]);

  return (
    <h2 className='text-primary-400 font-medium text-lg mb-4'>
      {status === 'start' ? 'You can start' : `Time: ${time}`}
    </h2>
  );
};

export default Countdown;
