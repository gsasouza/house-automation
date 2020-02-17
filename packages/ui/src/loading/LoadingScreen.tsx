import { AnimatePresence, motion } from 'framer-motion';

import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main(
  props => `
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, ${props.theme.palette.primary} 77%, ${props.theme.palette.accent} 100%);  
`,
);

const Container = styled(motion.div)`
  width: 10rem;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  margin: auto;
`;

const Circle = styled(motion.span)`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${props => props.theme.palette.secondary};
  border-radius: 50%;
`;

const loadingContainerVariants = {
  start: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '200%',
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

export const LoadingScreenContent = () => (
  <AnimatePresence>
    <Container variants={loadingContainerVariants} initial="start" animate="end" exit={{ opacity: 0 }}>
      <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} className="loading-circle" />
      <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} className="loading-circle" />
      <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} className="loading-circle" />
    </Container>
  </AnimatePresence>
);

const LoadingScreen = () => {
  return (
    <Wrapper>
      <LoadingScreenContent />
    </Wrapper>
  );
};

export default LoadingScreen;
