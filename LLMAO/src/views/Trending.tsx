import { Grid, Box, useColorModeValue, Spinner,Text,Flex } from '@chakra-ui/react';
import Navbar from '../components/navbar_landing';
import Footer from '../components/footer';
import MyCard from '../components/myCard';
import axios from "axios";
import { useState, useEffect, useRef } from "react";


function Trending() {
  const [trendingData1, setTrendingData1] = useState([]);
  const [trendingData2, setTrendingData2] = useState([]);
  const [trendingData3, setTrendingData3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchDataForTrending3 = async () => {
      await fetchData("http://127.0.0.1:5000/query2/trending/Generative AI", setTrendingData3);
    };
    const fetchDataForTrending = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        await Promise.all([fetchDataForTrending1(), fetchDataForTrending2(), fetchDataForTrending3()]);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data (whether successful or not)
      }
    }
    fetchDataForTrending();
  }, []);


  return (
    <>
      <Navbar />
      <Box minHeight="60vh" w="100%" bg={useColorModeValue('white', 'gray.800')} overflow="hidden">
        {isLoading ? ( // Show spinner when loading
          <Box textAlign="center" mt={"140px"}>
            <Spinner size="xl" color="purple.500" />
            <Text mt={4}>Loading...</Text>
          </Box>
        ) : (
          <>
            <Flex>
              <Text className='feature-heading' ml={"50px"} fontSize={'40px'}><b>COMPUTER VISION:</b></Text>
            </Flex>
            <Grid templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(4, 1fr)" }} gap={8} mt={2} mx={8} mb={10}>
              {trendingData1.map(({ title, content }) => (
                <MyCard key={title} level="advanced" websearch={true} title={title} content={content as string} />
              ))}
            </Grid>
            <Flex mt={10}>
              <Text className='feature-heading' ml={"50px"} fontSize={'40px'}><b>MACHINE LEARNING:</b></Text>
            </Flex>
            <Grid templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(4, 1fr)" }} gap={8} mt={2} mx={8} mb={10}>
              {trendingData2.map(({ title, content }) => (
                <MyCard key={title} level="advanced" websearch={true} title={title} content={content as string} />
              ))}
            </Grid>
            <Flex mt={10}>
              <Text className='feature-heading' ml={"50px"} fontSize={'40px'}><b>GENERATIVE AI:</b></Text>
            </Flex>
            <Grid templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(4, 1fr)" }} gap={8} mt={2} mx={8} mb={10}>
              {trendingData3.map(({ title, content }) => (
                <MyCard key={title} level="advanced" websearch={true} title={title} content={content as string} />
              ))}
            </Grid>
          </>
        )}
      </Box>
      <Footer></Footer>
    </>
  );
}

export default Trending;
