import { Box, Button, Text } from "@chakra-ui/react";

export default function DeleteDialog({ open, onClose, onConfirm, loading }) {
  if (!open) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
      px="4"
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        p="6"
        borderRadius="2xl"
        w="100%"
        maxW="400px"
        boxShadow="2xl"
      >
        <Text
          fontSize="lg"
          fontWeight="700"
          mb="2"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          Event verwijderen?
        </Text>

        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.400" }}
          mb="6"
        >
          Deze actie kan niet ongedaan worden gemaakt.
        </Text>

        <Box display="flex" justifyContent="flex-end" gap="3">
          <Button
            variant="ghost"
            onClick={onClose}
            borderRadius="lg"
          >
            Annuleren
          </Button>

          {/* Chakra v3 gebruikt `loading` niet `isLoading` */}
          <Button
            colorPalette="red"
            onClick={onConfirm}
            loading={loading}
            borderRadius="lg"
          >
            Verwijderen
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
