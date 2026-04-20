import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function SimpleDialog({
  open = false,
  onClose,
  title,
  children,
}) {
  const overlayRef = useRef(null);

  // Sluit met Escape (alleen als open)
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Sluit bij klik buiten dialog
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  if (!open) return null;

  return (
    <Box
      ref={overlayRef}
      position="fixed"
      inset="0"
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
      px="4"
      onClick={handleOverlayClick}
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.800", color: "white" }}
        p="6"
        borderRadius="2xl"
        w="100%"
        maxW="480px"
        boxShadow="2xl"
        maxH="90vh"
        overflowY="auto"
        onClick={(e) => e.stopPropagation()} // voorkomt sluiten bij klik binnen
      >
        <Text
          fontWeight="700"
          fontSize="lg"
          mb="5"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          {title}
        </Text>

        {children}

        <Button
          mt="5"
          w="full"
          variant="ghost"
          onClick={() => onClose?.()}
          borderRadius="lg"
        >
          Sluiten
        </Button>
      </Box>
    </Box>
  );
}
