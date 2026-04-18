import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventContext } from "../components/EventContext";
import { toaster } from "../components/ui/toaster";
import DeleteDialog from "./DeleteDialog";
import EditEventForm from "./EditEventForm";
import SimpleDialog from "./SimpleDialog";

function formatDateTime(str) {
  if (!str) return "";
  return new Date(str).toLocaleString("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export const EventPage = () => {
  const { eventId } = useParams();
  const { categories } = useEventContext();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/events/${eventId}`);
        const data = await res.json();
        setEvent(data);
      } catch {
        setFetchError(true);
        toaster.error({ title: "Failed to load event" });
      }
    };
    loadEvent();
  }, [eventId]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toaster.success({ title: "Event deleted" });
      setDeleteOpen(false);
      navigate("/");
    } catch {
      toaster.error({ title: "Delete failed" });
    } finally {
      setLoading(false);
    }
  };

  if (fetchError) {
    return (
      <Box p="8" textAlign="center">
        <Text fontSize="lg" color="red.400">Event kon niet worden geladen.</Text>
        <Button mt="4" onClick={() => navigate("/")}>Terug naar events</Button>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box p={{ base: 4, md: 8 }} maxW="860px" mx="auto">
        <Skeleton h="10" w="60%" mb="6" borderRadius="lg" />
        <Skeleton h="420px" w="100%" mb="6" borderRadius="2xl" />
        <SkeletonText noOfLines={3} spacing="3" mb="6" />
        <HStack>
          <Skeleton h="10" w="80px" borderRadius="md" />
          <Skeleton h="10" w="80px" borderRadius="md" />
        </HStack>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="860px" mx="auto">
      <Heading
        mb="5"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="800"
        color="gray.900"
        _dark={{ color: "white" }}
      >
        {event.title}
      </Heading>

      <Image
        src={event.image}
        fallbackSrc="https://placehold.co/800x420?text=No+Image"
        borderRadius="2xl"
        mb="6"
        h={{ base: "220px", md: "420px" }}
        w="100%"
        objectFit="cover"
      />

      <Text
        mb="4"
        fontSize={{ base: "md", md: "lg" }}
        fontStyle="italic"
        color="gray.600"
        _dark={{ color: "gray.300" }}
        lineHeight="1.7"
      >
        {event.description}
      </Text>

      {/* startTime & endTime */}
      <Box
        mb="5"
        px="4"
        py="3"
        borderRadius="lg"
        bg="gray.50"
        _dark={{ bg: "gray.700" }}
        borderWidth="1px"
        borderColor="gray.200"
        _dark_borderColor="gray.600"
      >
        <HStack gap="6" wrap="wrap">
          <Box>
            <Text fontSize="xs" fontWeight="600" color="gray.400" textTransform="uppercase" letterSpacing="wide" mb="0.5">
              Start
            </Text>
            <Text fontSize="sm" fontWeight="500" color="gray.700" _dark={{ color: "gray.200" }}>
              {formatDateTime(event.startTime)}
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="600" color="gray.400" textTransform="uppercase" letterSpacing="wide" mb="0.5">
              Einde
            </Text>
            <Text fontSize="sm" fontWeight="500" color="gray.700" _dark={{ color: "gray.200" }}>
              {formatDateTime(event.endTime)}
            </Text>
          </Box>
        </HStack>
      </Box>

      <HStack mb="6" wrap="wrap" gap="2">
        {event.categoryIds?.map((id) => {
          const cat = categories.find((c) => c.id === id);
          return cat ? (
            <Badge
              key={id}
              colorPalette="teal"
              variant="subtle"
              borderRadius="full"
              px="3"
              py="1"
              fontSize="sm"
            >
              {cat.name}
            </Badge>
          ) : null;
        })}
      </HStack>

      <HStack gap="3">
        <Button
          onClick={() => setEditOpen(true)}
          variant="outline"
          colorPalette="teal"
          borderRadius="lg"
        >
          Bewerken
        </Button>
        <Button
          colorPalette="red"
          onClick={() => setDeleteOpen(true)}
          borderRadius="lg"
        >
          Verwijderen
        </Button>
      </HStack>

      <SimpleDialog open={editOpen} onClose={() => setEditOpen(false)} title="Edit Event">
        <EditEventForm event={event} onClose={() => setEditOpen(false)} />
      </SimpleDialog>

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </Box>
  );
};
