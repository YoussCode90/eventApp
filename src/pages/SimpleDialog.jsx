import { Box, Button, Text } from "@chakra-ui/react";

export default function SimpleDialog({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
      px="4"
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.800", color: "white" }}
        p="6"
        borderRadius="2xl"
        w="100%"
        maxW="480px"
        boxShadow="2xl"
        maxH="90vh"
        overflowY="auto"
      >
        <Text
          fontWeight="700"
          fontSize="lg"
          mb="5"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          {title}
        </Text>

        {children}

        <Button
          mt="5"
          w="full"
          variant="ghost"
          onClick={() => onClose(false)}
          borderRadius="lg"
        >
          Sluiten
        </Button>
      </Box>
    </Box>
  );
}
