import { Badge, Box, HStack, Image, Text } from "@chakra-ui/react";

function formatDateTime(str) {
  if (!str) return "";
  return new Date(str).toLocaleString("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function EventCard({ event, categories }) {
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
        src={event.image}
        fallbackSrc="https://placehold.co/600x300?text=No+Image"
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
          {event.title}
        </Text>

        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.400" }}
          noOfLines={2}
          mb="3"
          lineHeight="1.5"
        >
          {event.description}
        </Text>

        {/* startTime & endTime */}
        <Box mb="3">
          <Text fontSize="xs" color="gray.400" _dark={{ color: "gray.500" }}>
            {formatDateTime(event.startTime)} — {formatDateTime(event.endTime)}
          </Text>
        </Box>

        <HStack wrap="wrap" gap="1">
          {event.categoryIds?.map((id) => {
            const cat = categories.find((c) => c.id === id);
            return cat ? (
              <Badge
                key={id}
                colorPalette="teal"
                variant="subtle"
                fontSize="xs"
                borderRadius="full"
                px="2"
              >
                {cat.name}
              </Badge>
            ) : null;
          })}
        </HStack>
      </Box>
    </Box>
  );
}
