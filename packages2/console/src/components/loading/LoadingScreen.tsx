import { motion } from 'framer-motion';

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
  width: 50%;
  height: 3rem;
  margin-top: -5rem;
  display: flex;
  justify-content: space-around;
`;

const Circle = styled(motion.span)`
  display: block;
  width: 3rem;
  height: 3rem;
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

const LoadingScreen = () => {
  return (
    <Wrapper>
      <Container variants={loadingContainerVariants} initial="start" animate="end" exit={{ opacity: 0 }}>
        <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} />
        <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} />
        <Circle variants={loadingCircleVariants} transition={loadingCircleTransition} />
      </Container>
    </Wrapper>
  );
};

export default LoadingScreen;
