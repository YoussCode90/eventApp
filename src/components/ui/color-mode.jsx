import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function ColorModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    const isDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;

    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <HStack
      onClick={toggle}
      cursor="pointer"
      px="3"
      py="2"
      borderRadius="full"
      bg={dark ? "gray.700" : "gray.200"}
      transition="all 0.25s"
      spacing="3"
      userSelect="none"
    >
      {/* Switch track */}
      <Box
        position="relative"
        w="42px"
        h="22px"
        borderRadius="full"
        bg={dark ? "teal.400" : "gray.400"}
        transition="all 0.25s"
      >
        {/* Switch knob */}
        <Box
          position="absolute"
          top="2px"
          left={dark ? "22px" : "2px"}
          w="18px"
          h="18px"
          borderRadius="full"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.25s"
        >
          <Icon as={dark ? LuSun : LuMoon} fontSize="12px" />
        </Box>
      </Box>

      <Text fontSize="sm" fontWeight="500" color={dark ? "white" : "gray.700"}>
        {dark ? "Light mode" : "Dark mode"}
      </Text>
    </HStack>
  );
}
