import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  useColorModeValue,
  HStack,
  Text,
  Grid,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Navbar from "../components/navbar_landing";
import Footer from "../components/footer";
import MyCard from "../components/myCard";
import axios from "axios";
import { BsFire } from "react-icons/bs";


function Modules() {
  const [beginnerData, setBeginnerData] = useState([]);
  const [advancedData, setAdvancedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");
  const [searchTerm, setSearchTerm] = useState("");

  const trendingData = [
    { title: "Trend 1", content: "Trend content 1" },
    { title: "Trend 2", content: "Trend content 2" },
    { title: "Trend 3", content: "Trend content 3" },
    { title: "Trend 4", content: "Trend content 4" },
  ];

  const fetchData = async (route: string, setDataFunction: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(route);
      const DataArray = response.data.content
        ? Object.entries(response.data.content).map(([title, content]) => ({ title, content }))
        : [];
      setDataFunction(DataArray);
      setShowTabs(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLearnClick = async () => {
    // Handle the click event for the "Start Learning" button
    // Fetch data for both beginner and advanced tabs
    await fetchData(`http://127.0.0.1:5000/query2/${searchTerm}/Beginner Level`, setBeginnerData);
    await fetchData(`http://127.0.0.1:5000/query2/${searchTerm}/Advanced Level`, setAdvancedData);
  };

  const handleTabClick = (tab: any) => {
    // Set the active tab
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />
      <HStack justifyContent={"center"}>
        <Box mt={4}>
          <Input
            type="text"
            placeholder="What do you want to learn?"
            size="lg"
            borderColor={"black"}
            width="40vw"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Button
          p={6}
          color={"white"}
          rounded="md"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "md",
            transition: "transform 0.3s ease",  // Add transition property for smooth transition
          }}
          bg={"blue.400"}
          boxShadow="lg"
          onClick={onLearnClick}
          mt={4}
        >
          Search
        </Button>
      </HStack>
      <HStack justifyContent={"center"} mt={6}>
        {showTabs && (
          <>
            <Button
              onClick={() => handleTabClick("beginner")}
              mx={2}
              variant={activeTab === "beginner" ? "solid" : "outline"}
              colorScheme="purple"
            >
              Basic Modules
            </Button>
            <Button
              onClick={() => handleTabClick("advanced")}
              mx={2}
              variant={activeTab === "advanced" ? "solid" : "outline"}
              colorScheme="purple"
            >
              Advanced Modules
            </Button>
          </>
        )}
      </HStack>

      <Flex direction={{ base: "column", md: "row" }} mb={10}>
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(200px, 1fr))",
            md: "repeat(4, 1fr)",
          }}
          gap={8}
          mt={2}
          mx={8}
          display={activeTab === "beginner" ? "grid" : "none"}
        >
          {beginnerData.map(({ title, content }) => (
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
          display={activeTab === "advanced" ? "grid" : "none"}
        >
          {advancedData.map(({ title, content }) => (
            <MyCard key={title} title={title} content={content as string} />
          ))}
        </Grid>
      </Flex>

      <Flex align="center" ml={10} mb={3}>
        <BsFire size={30} />
        <Heading ml={2}>Trending Courses</Heading>
      </Flex>

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
        {trendingData.map(({ title, content }) => (
          <MyCard key={title} title={title} content={content} />
        ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default Modules;
