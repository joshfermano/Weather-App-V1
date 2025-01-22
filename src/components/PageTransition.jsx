import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}>
      {children}
    </motion.div>
  );
};

export default PageTransition;
