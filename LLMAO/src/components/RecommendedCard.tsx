import React from 'react';
import { Box, Text, Stack, Heading } from '@chakra-ui/react';

interface CourseCardProps {
  moduleTopic: string;
  moduleSummary: string;
}

const RecommendedCard: React.FC<CourseCardProps> = ({ moduleTopic, moduleSummary }) => {
  return (
    <Box
      variant="outline"
      mb={4}
      boxShadow="md"
      borderRadius="md"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: 'scale(1.03)' }}
    >
      <Stack p={4}>
        <Heading size="md">{moduleTopic}</Heading>
        <Text py="2">{moduleSummary}</Text>
      </Stack>
    </Box>
  );
};

export default RecommendedCard;
