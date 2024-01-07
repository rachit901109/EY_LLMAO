import Quiz from '../components/Quiz';
import {Center} from '@chakra-ui/react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const question1 = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam inventore dolorem nam aspernatur amet beatae in aut? Sequi adipisci nemo dolore! Cum deleniti vel accusantium molestiae explicabo voluptatibus placeat, voluptas voluptate dolorem quod cumque enim praesentium soluta est, amet quia veniam. Hic, facilis laborum incidunt consequuntur neque aliquam ipsam esse iusto temporibus quisquam magni rerum totam quidem blanditiis corporis perferendis in laboriosam quia earum a sed voluptatem ullam numquam! Quisquam molestiae soluta quasi ipsum explicabo inventore maiores error officiis dolor voluptatibus consequatur possimus asperiores, nisi assumenda debitis suscipit perspiciatis minima nobis dolore earum! Laborum recusandae nesciunt quaerat praesentium blanditiis quasi!'

const quizData = [

    {
      question: question1,
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 2',
      explanation: 'Explanation for Question 1',
    },
    {
        question: 'Question 2',
        options: ['Hello', 'How ', 'Does', 'This'],
        correctAnswer: 'Hello',
        explanation: 'Explanation for Question 2',
      },
      {
        question: 'Question 3',
        options: ['Page', 'Looks', 'To', 'You'],
        correctAnswer: 'Looks',
        explanation: 'Explanation for Question 3',
      },
   ];

function App() {
 return (
    <>
    <Navbar />
    <Center width={'210vh'}>
    <Quiz data={quizData}/>
    </Center>
    <Footer />
   </>
 );
}

export default App;
