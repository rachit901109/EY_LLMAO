import { Grid } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import MyCard from '../components/myCard';

function Trending() {
  const data = {
    "Title 1": "Content 1",
    "Title 2": "Content 2",
    "Title 3": "Content 3",
    "Title 4": "Content 4",
    "Title 5": "Content 5",
    "Title 6": "Content 6",
    // Add more titles and content as needed
  };

  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2} mx={4}>
        {Object.entries(data).map(([title, content]) => (
          <MyCard key={title} title={title} content={content} />
        ))}
      </Grid>
    </>
  );
}

export default Trending;
