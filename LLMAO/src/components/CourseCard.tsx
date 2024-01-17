// CourseCard.jsx

import React from 'react';
import { Box, Text, Stack, Badge, Heading } from '@chakra-ui/react';
import { Chart } from 'react-google-charts';

interface QuizData {
  accuracy: number;
  completeness: number;
  clarity: number;
  relevance: number;
  understanding: number;
  feedback: string;
}

interface CourseData {
  moduleTopic: string;
  moduleSummary: string;
  quiz: [number | null, number | null, QuizData | null];
}

interface CardProps {
  courseData: CourseData;
}

const CourseCard: React.FC<CardProps> = ({ courseData }) => {
  const [quiz1Score, quiz2Score, quiz3Data] = courseData.quiz;

  const chartData = [['Quiz', 'Score'], ['Quiz 1', quiz1Score || 0], ['Quiz 2', quiz2Score || 0]];

  return (
    <Box
      variant="outline"
      key={courseData.moduleTopic}
      mb={4}
      boxShadow="md"
      borderRadius="md"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: 'scale(1.03)' }}
    >
      <Stack p={4}>
        <Heading size="md">{courseData.moduleTopic}</Heading>
        <Text py="2">{courseData.moduleSummary}</Text>
      </Stack>
      <Stack p={4} borderTopWidth="1px">
        <Chart
          width={'100%'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            chart: {
              title: 'Quiz Scores',
              subtitle: 'Quiz 1 and Quiz 2',
            },
            vAxis: {
              ticks: [0, 2, 4, 6, 8, 10], // Explicitly set the ticks
            },
          }}
        />



        {quiz3Data !== null && (
          <>
            <Text className="content" fontSize={20}>Quiz 3 Score:</Text>
            <Text className="content">
              Accuracy: {quiz3Data.accuracy !== null ? `${quiz3Data.accuracy}/10` : 'Not taken'}
              <br />
              Completeness: {quiz3Data.completeness !== null ? `${quiz3Data.completeness}/10` : 'Not taken'}
              <br />
              Clarity: {quiz3Data.clarity !== null ? `${quiz3Data.clarity}/10` : 'Not taken'}
              <br />
              Relevance: {quiz3Data.relevance !== null ? `${quiz3Data.relevance}/10` : 'Not taken'}
              <br />
              Understanding: {quiz3Data.understanding !== null ? `${quiz3Data.understanding}/10` : 'Not taken'}
            </Text>
            <Box>
              <Badge variant="solid" colorScheme="purple" fontSize={18}>
                Quiz 3 Feedback
              </Badge>
              <Text className="content">{quiz3Data.feedback}</Text>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default CourseCard;
