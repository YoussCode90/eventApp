import { Badge, Box, HStack, Image, Text } from "@chakra-ui/react";

// Formateer datum en tijd naar Nederlands formaat
function formatDateTime(str) {
  if (!str) return "";
  return new Date(str).toLocaleString("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function EventCard({ event = {}, categories = [] }) {
  const {
    title = "Onbekend event",
    description = "",
    image,
    startTime,
    endTime,
    categoryIds = [],
  } = event;

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.700", bg: "gray.800" }}
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        borderColor: "teal.300",
      }}
    >
      <Image
        src={image}
        alt={title}
        fallbackSrc="https://cdn.vectorstock.com/i/1000v/70/01/no-image-symbol-missing-available-icon-gallery-vector-42607001.jpg"
        h="180px"
        w="100%"
        objectFit="cover"
      />

      <Box p="4">
        <Text
          fontWeight="700"
          fontSize="md"
          mb="1"
          noOfLines={1}
          color="gray.900"
          _dark={{ color: "white" }}
        >
          {title}
        </Text>

        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.400" }}
          noOfLines={2}
          mb="3"
          lineHeight="1.5"
        >
          {description}
        </Text>

        {/* startTime & endTime */}
        <Box mb="3">
          <Text fontSize="xs" color="gray.400" _dark={{ color: "gray.500" }}>
            {formatDateTime(startTime)} — {formatDateTime(endTime)}
          </Text>
        </Box>

        <HStack wrap="wrap" spacing="1">
          {categoryIds.map((id) => {
            const cat = categories.find((c) => c.id === id);

            if (!cat) return null;

            return (
              <Badge
                key={id}
                colorScheme="teal"
                variant="subtle"
                fontSize="xs"
                borderRadius="full"
                px="2"
              >
                {cat.name}
              </Badge>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
}
