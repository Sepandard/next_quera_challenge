import "../styles/globals.css";
import "antd/dist/antd.css";
import Layout from "../components/Layout/layout";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    palette: {
      100: "#ffffff",
      200: "#F7F7FA",
      800: "#6698ff",
      900: "#3E7BFA",
    },
  },
});
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box className="vh-100" bg="palette.200">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
