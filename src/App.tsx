import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ToDo from './components/ToDo';

const App: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center"
        bgGradient="linear(to-l, #ca28b5, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        textShadow="-3px -3px blue"
      >
        ToDo App
        </Heading>
      <ToDo />
    </Box>
  );
}

export default App;
