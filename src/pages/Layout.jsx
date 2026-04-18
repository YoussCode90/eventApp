import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      color="gray.900"
      _dark_color="white"
    >
      {children}
    </Box>
  );
}
