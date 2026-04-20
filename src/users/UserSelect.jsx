import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function UserSelect() {
  const { login } = useUserContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Haal alle gebruikers op uit de API
  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Kon gebruikers niet laden");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      px="4"
    >
      <VStack gap="8" w="100%" maxW="400px">
        <VStack gap="1" textAlign="center">
          <Heading
            fontSize="2xl"
            fontWeight="800"
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Welkom bij EventPlanner
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Kies een gebruiker om door te gaan
          </Text>
        </VStack>

        <VStack gap="3" w="100%">
          {loading && (
            <Text fontSize="sm" color="gray.500">
              Laden...
            </Text>
          )}

          {!loading && users.length === 0 && (
            <Text fontSize="sm" color="gray.500">
              Geen gebruikers gevonden
            </Text>
          )}

          {!loading &&
            users.map((user) => {
              const name = user?.name || "Onbekend";
              const initial = name.charAt(0).toUpperCase();

              return (
                <HStack
                  key={user.id}
                  w="100%"
                  p="4"
                  borderWidth="1px"
                  borderRadius="xl"
                  borderColor="gray.200"
                  _dark={{ borderColor: "gray.700", bg: "gray.800" }}
                  bg="white"
                  cursor="pointer"
                  transition="all 0.15s"
                  _hover={{
                    borderColor: "teal.400",
                    boxShadow: "md",
                    transform: "translateY(-1px)",
                  }}
                  onClick={() => login?.(user)}
                >
                  <Avatar.Root size="md">
                    <Avatar.Image src={user.image} />
                    <Avatar.Fallback>{initial}</Avatar.Fallback>
                  </Avatar.Root>

                  <Text
                    fontWeight="600"
                    fontSize="md"
                    color="gray.900"
                    _dark={{ color: "white" }}
                  >
                    {name}
                  </Text>
                </HStack>
              );
            })}
        </VStack>
      </VStack>
    </Box>
  );
}
