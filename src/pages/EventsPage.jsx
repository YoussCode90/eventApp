import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useEventContext } from "../components/EventContext";
import CheckboxList from "../shared/CheckboxList";
import EventCard from "../shared/EventCard";

export const EventsPage = () => {
  const { events, categories, loading } = useEventContext();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((p) =>
      p.includes(id) ? p.filter((c) => c !== id) : [...p, id],
    );
  };

  // useMemo zodat filtering alleen herberekent als data verandert
  const filtered = useMemo(() => {
    return events.filter((e) => {
      const title = e?.title ?? "";
      const matchSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selected.length === 0 ||
        selected.some((id) => e?.categoryIds?.includes(id));
      return matchSearch && matchCategory;
    });
  }, [events, search, selected]);

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1100px" mx="auto">
      <Heading
        mb="1"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="800"
        color="gray.900"
        _dark={{ color: "white" }}
      >
        Upcoming Events
      </Heading>

      <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }} mb="6">
        {filtered.length} event{filtered.length !== 1 ? "s" : ""} gevonden
      </Text>

      <Input
        mb="4"
        placeholder="Zoek op naam..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="md"
        borderRadius="lg"
        borderColor="gray.300"
        bg="white"
        _dark={{ borderColor: "gray.600", bg: "gray.800", color: "white" }}
        _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal" }}
      />

      <Box mb="6">
        <Text
          fontSize="xs"
          fontWeight="600"
          color="gray.400"
          _dark={{ color: "gray.300" }}
          mb="2"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Filter op categorie
        </Text>
        <CheckboxList
          categories={categories}
          selectedCategories={selected}
          toggleCategory={toggle}
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} h="260px" borderRadius="xl" />
            ))
          : filtered.map((e) => (
              <Link
                key={e.id}
                to={`/event/${e.id}`}
                style={{ textDecoration: "none" }}
              >
                <EventCard event={e} categories={categories} />
              </Link>
            ))}
      </SimpleGrid>

      {!loading && filtered.length === 0 && (
        <Box
          textAlign="center"
          py="16"
          color="gray.400"
          _dark={{ color: "gray.500" }}
        >
          <Text fontSize="lg">Geen events gevonden</Text>
          <Text fontSize="sm" mt="1">
            Probeer een andere zoekterm of filter
          </Text>
        </Box>
      )}
    </Box>
  );
};
