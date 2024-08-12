import getCharsAndColors from '../utils/getCharsAndColors';
import Caret from './Caret';

const Word = ({
  isLast,
  current,
  expected,
}: {
  isLast?: boolean;
  current?: string;
  expected: string;
  className?: string;
}) => {
  if (current !== undefined && isLast !== undefined) {
    const charsAndColors = getCharsAndColors(expected, current, isLast);
    return (
      <div className='flex'>
        {charsAndColors.map(({ color, char }, index) => {
          return (
            <span key={index} className={`${color} relative`}>
              {char}
              {isLast && 0 == index && 0 == current.length && (
                <Caret side={'left'} />
              )}
              {isLast && index + 1 === current.length && (
                <Caret side={'right'} />
              )}
            </span>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {expected.split('').map((char, index) => {
        return (
          <span key={index} className={`text-slate-500`}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
