import { Grid, Box, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../components/navbar_landing';
import MyCard from '../components/myCard';
import axios from "axios";
import { useState, useEffect, useRef } from "react";


function Trending() {
  const [trendingData1, setTrendingData1] = useState([]);
  const [trendingData2, setTrendingData2] = useState([]);
  const [trendingData3, setTrendingData3] = useState([]);

  const fetchData = async (route: string, setDataFunction: any) => {
    try {
      const response = await axios.get(route);
      const DataArray = response.data.content
        ? Object.entries(response.data.content).map(([title, content]) => ({ title, content }))
        : [];
      setDataFunction(DataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataForTrending1 = async () => {
      await fetchData("http://127.0.0.1:5000/query2/trending/Computer Vision", setTrendingData1);
    };

    const fetchDataForTrending2 = async () => {
      await fetchData("http://127.0.0.1:5000/query2/trending/Machine Learning", setTrendingData2);
    };

    fetchDataForTrending1();
    fetchDataForTrending2();
    // fetchData("http://127.0.0.1:5000/query2/trending/Generative AI", setTrendingData2);
  }, []);


  return (
    <>
      <Navbar />
      <Box h="100vh" w="100%" bg={useColorModeValue('white', 'gray.800')} overflow="hidden">
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(200px, 1fr))",
            md: "repeat(4, 1fr)",
          }}
          gap={8}
          mt={2}
          mx={8}
          mb={10}
        >
          {trendingData1.map(({ title, content }) => (
            <MyCard key={title} title={title} content={content as string} />
          ))}
        </Grid>
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(200px, 1fr))",
            md: "repeat(4, 1fr)",
          }}
          gap={8}
          mt={2}
          mx={8}
          mb={10}
        >
          {trendingData2.map(({ title, content }) => (
            <MyCard key={title} title={title} content={content as string} />
          ))}
        </Grid>
        {/* <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(200px, 1fr))",
            md: "repeat(4, 1fr)",
          }}
          gap={8}
          mt={2}
          mx={8}
          mb={10}
        >
          {trendingData3.map(({ title, content }) => (
            <MyCard key={title} title={title} content={content as string} />
          ))}
        </Grid> */}
      </Box>
    </>
  );
}

export default Trending;
