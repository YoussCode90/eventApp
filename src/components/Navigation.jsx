import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AddEventForm from "../pages/AddEventForm";
import SimpleDialog from "../pages/SimpleDialog";
import { ColorModeToggle } from "./ui/color-mode";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
        <Flex align="center" justify="space-between" maxW="1100px" mx="auto">
          {/* Logo / App naam */}
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
          <HStack gap="2">
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

            <Link
              px="4"
              py="2"
              borderRadius="full"
              fontSize="sm"
              fontWeight="500"
              color="white"
              bg="teal.500"
              _hover={{
                bg: "teal.600",
                textDecoration: "none",
              }}
              _dark={{ bg: "teal.600", _hover: { bg: "teal.500" } }}
              onClick={() => setOpen(true)}
              cursor="pointer"
              transition="all 0.15s"
            >
              + Add Event
            </Link>

            <ColorModeToggle />
          </HStack>
        </Flex>
      </Box>

      <SimpleDialog open={open} onClose={setOpen} title="Add Event">
        <AddEventForm onClose={() => setOpen(false)} />
      </SimpleDialog>
    </>
  );
};
