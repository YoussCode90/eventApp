import { HStack, IconButton, Text } from "@chakra-ui/react";
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
      py="1.5"
      borderWidth="1px"
      borderRadius="full"
      bg="transparent"
      _hover={{ bg: "blackAlpha.200" }}
      transition="0.2s"
    >
      <IconButton aria-label="toggle theme" size="sm" variant="ghost">
        {dark ? <LuMoon /> : <LuSun />}
      </IconButton>

      <Text fontSize="sm">{dark ? "Dark" : "Light"}</Text>
    </HStack>
  );
}
