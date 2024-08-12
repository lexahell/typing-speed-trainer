import { useCallback, useRef } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useAppDispatch } from '../redux/store';
import {
  setStatus,
} from '../redux/appSlice';

const RestartButton = ({ className = '' }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = useCallback(() => {
    buttonRef.current?.blur();
    dispatch(setStatus('start'));
  }, [dispatch]);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}
    >
      <MdRefresh className='w-6 h-6' />
    </button>
  );
};
export default RestartButton;
