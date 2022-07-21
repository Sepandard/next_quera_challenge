import React from "react";
// import styles from "../styles/layout.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar/Navbar";
import { Box } from "@chakra-ui/react";
const Layout = ({ children }) => {
  return (
    <div className="h-100">
      <Navbar />
      <div className="container">
        <Box bg="palette.100" borderRadius='lg'>
          <main className="w-100">{children}</main>
        </Box>
      </div>
    </div>
  );
};

export default Layout;
