import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Box p={{ base: 6, md: 12 }} maxW="600px" mx="auto" textAlign="center">
      <VStack gap="6">
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          Over Eventify
        </Heading>

        <Text
          color="gray.500"
          _dark={{ color: "gray.400" }}
          fontSize="md"
          lineHeight="1.8"
        >
          Deze pagina is nog in ontwikkeling. Kom snel terug!
        </Text>

        <Image
          src="https://www.easymoving.be/wp-content/uploads/Under-Construction.jpg"
          borderRadius="2xl"
          w="100%"
          maxW="420px"
          objectFit="cover"
          boxShadow="md"
        />
      </VStack>
    </Box>
  );
}
