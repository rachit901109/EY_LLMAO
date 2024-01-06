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
  Select,
  Heading,
  Switch,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MyCard from "../components/myCard";
import axios from "axios";
import { BsFire } from "react-icons/bs";
import { useSessionCheck } from "./useSessionCheck";


function Modules() {
  useSessionCheck();
  const [beginnerData, setBeginnerData] = useState([]);
  const [beginnerModuleIdData, setBeginnerModuleIdData] = useState({});
  const [advanceModuleIdData, setAdvanceModuleIdData] = useState({});
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [advancedData, setAdvancedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");
  const [searchTerm, setSearchTerm] = useState("");
  const [webSearchOn, setWebSearchOn] = useState(false);
  const languages = [
    { code: 'auto', name: 'Language : Auto' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'kn', name: 'Kannada' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'mr', name: 'Marathi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'de', name: 'German' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'en', name: 'English' },
  ];

  const fetchData = async (route: string, setDataFunction: any, setModuleIdFunction: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(route);
      setModuleIdFunction(response.data.module_ids);
      const DataArray = response.data.content
        ? Object.entries(response.data.content).map(([title, content]) => ({ title, content }))
        : [];
      setDataFunction(DataArray);
      setSourceLanguage(response.data.source_language)
      setShowTabs(true);
      let trans = response.data.topic;
      localStorage.setItem('topicname', trans);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLearnClick = async () => {
    // Handle the click event for the "Start Learning" button
    // Fetch data for both beginner and advanced tabs
    await fetchData(`/api/query2/${searchTerm}/beginner/${webSearchOn}/${sourceLanguage}`, setBeginnerData, setBeginnerModuleIdData);
    await fetchData(`/api/query2/${searchTerm}/advanced/${webSearchOn}/${sourceLanguage}`, setAdvancedData, setAdvanceModuleIdData);
  };

  const handleTabClick = (tab: any) => {
    // Set the active tab
    setActiveTab(tab);
  };

  const handleWebSearchToggle = () => {
    setWebSearchOn(!webSearchOn);
  };

  return (
    <div>
      <Navbar />
      <HStack justifyContent={"center"}>
        <Flex justify="flex-end" mt={5} mr={8}>
          <Text mr={2} className="content" mt={1}>Web Search</Text>
          <Switch
            colorScheme="purple"
            size="lg"
            isChecked={webSearchOn}
            onChange={handleWebSearchToggle}
          />
        </Flex>
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
            transform: "translateY(-2px)",
            boxShadow: "md",
            transition: "transform 0.3s ease",  // Add transition property for smooth transition
            bg: "purple.600"
          }}
          bg={"purple.400"}
          boxShadow="lg"
          onClick={onLearnClick}
          mt={4}
        >
          Search
        </Button>
        <Flex justify="flex-end" mt={5} ml={8}>
          <Select id="language" variant="outline" name="language" onChange={(e) => setSourceLanguage(e.target.value)} defaultValue="auto">
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
        </Flex>
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

      <Flex direction={{ base: "column", md: "row" }} minHeight={"60vh"} mb={10}>
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
            <MyCard key={title} title={title} module_ids={beginnerModuleIdData} content={content as string} source_language={sourceLanguage} websearch={webSearchOn} />
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
            <MyCard key={title} title={title} module_ids={advanceModuleIdData} content={content as string} source_language={sourceLanguage} websearch={webSearchOn} />
          ))}
        </Grid>
      </Flex>
      <Footer />
    </div>
  );
}

export default Modules;
