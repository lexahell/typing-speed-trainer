import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Results = ({
  className = '',
  seconds,
}: {
  className?: string;
  seconds: number;
}) => {
  const { errors, totalWordsCount } = useSelector(
    (state: RootState) => state.app
  );
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`text-3xl  items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.2 }}
        className='font-semibold'
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        WPM: {(totalWordsCount / seconds) * 60}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.7 }}
        className='text-red-500'
      >
        Errors: {errors}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
