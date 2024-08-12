import { motion } from 'framer-motion';
import classNames from 'classnames';

const Caret = ({ side }: { side: 'left' | 'right' }) => {
  const CaretClass = classNames({
    'inline-block bg-primary-500 w-0.5 h-5 sm:h-8 rounded absolute top-1': true,
    'left-0': side === 'left',
    'right-0': side === 'right',
  });
  return (
    <motion.span
      aria-hidden={true}
      className={CaretClass}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
    />
  );
};

export default Caret;
