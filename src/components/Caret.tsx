import { motion } from 'framer-motion';

const Caret = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <motion.span
      aria-hidden={true}
      className={`inline-block bg-primary-500 w-0.5 h-8 rounded absolute top-1 ${side}-0`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
    />
  );
};

export default Caret;
