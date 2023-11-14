import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    light: {
      // Define your light mode colors here
      primary: "#303179",
      secondary: "#FF0000",
      accent: "#ffff",
    },
    dark: {
      // Define your dark mode colors here
      primary: "#1a202c",
      secondary: "#2d3748",
      accent: "#ffcc00",
    },
  },
})

export default theme
