import { Avatar, Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import AddEventForm from "../forms/AddEventForm";
import SimpleDialog from "../shared/SimpleDialog";
import { ColorModeToggle } from "./ui/color-mode";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useUserContext();

  const navLinks = [
    { label: "Events", to: "/" },
    { label: "About", to: "/about" },
  ];

  return (
    <>
      <Box
        as="nav"
        px={{ base: 4, md: 8 }}
        py="3"
        borderBottomWidth="1px"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700", bg: "gray.900" }}
        bg="white"
        position="sticky"
        top="0"
        zIndex="100"
        backdropFilter="blur(8px)"
      >
        <Flex
          align="center"
          justify="space-between"
          maxW="1100px"
          mx="auto"
          flexWrap={{ base: "wrap", md: "nowrap" }}
          gap={{ base: 3, md: 0 }}
        >
          {/* Logo */}
          <Text
            fontWeight="800"
            fontSize="xl"
            letterSpacing="-0.5px"
            color="teal.500"
            _dark={{ color: "teal.300" }}
          >
            EventPlanner
          </Text>

          {/* Nav links */}
          <HStack
            gap="2"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            justify={{ base: "center", md: "flex-end" }}
            w={{ base: "100%", md: "auto" }}
          >
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  as={RouterLink}
                  to={to}
                  px="4"
                  py="2"
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight={isActive ? "600" : "400"}
                  color={isActive ? "teal.600" : "gray.600"}
                  bg={isActive ? "teal.50" : "transparent"}
                  _dark={{
                    color: isActive ? "teal.300" : "gray.400",
                    bg: isActive ? "teal.900" : "transparent",
                  }}
                  _hover={{
                    bg: "gray.100",
                    color: "gray.900",
                    textDecoration: "none",
                    _dark: { bg: "gray.800", color: "white" },
                  }}
                  transition="all 0.15s"
                >
                  {label}
                </Link>
              );
            })}

            {/* Add Event knop (korter gemaakt) */}
            <Link
              px="3"
              py="2"
              borderRadius="full"
              fontSize="sm"
              fontWeight="500"
              color="white"
              bg="teal.500"
              _hover={{ bg: "teal.600", textDecoration: "none" }}
              _dark={{ bg: "teal.600", _hover: { bg: "teal.500" } }}
              onClick={() => setOpen(true)}
              cursor="pointer"
              transition="all 0.15s"
              w="fit-content"
              whiteSpace="nowrap"
            >
              + Add
            </Link>

            <ColorModeToggle />

            {/* User block */}
            <HStack
              gap="2"
              px="3"
              py="1.5"
              borderWidth="1px"
              borderRadius="full"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700", bg: "gray.800" }}
              bg="white"
              w={{ base: "100%", md: "auto" }}
              justify={{ base: "space-between", md: "flex-start" }}
            >
              <Avatar.Root size="xs">
                <Avatar.Image src={currentUser?.image} />
                <Avatar.Fallback>{currentUser?.name?.[0]}</Avatar.Fallback>
              </Avatar.Root>

              <Text
                fontSize="sm"
                fontWeight="500"
                color="gray.700"
                _dark={{ color: "gray.200" }}
                noOfLines={1}
              >
                {currentUser?.name}
              </Text>

              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{ color: "gray.400" }}
                cursor="pointer"
                _hover={{ color: "red.400" }}
                transition="all 0.15s"
                onClick={logout}
                whiteSpace="nowrap"
              >
                Uitloggen
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add Event"
      >
        <AddEventForm onClose={() => setOpen(false)} />
      </SimpleDialog>
    </>
  );
};
