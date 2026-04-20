import { Box, Input, Text } from "@chakra-ui/react";

// Herbruikbaar veld met label
function Field({ label, children }) {
  return (
    <Box w="100%">
      <Text
        fontSize="xs"
        fontWeight="600"
        color="gray.500"
        _dark={{ color: "gray.400" }}
        mb="1"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {label}
      </Text>
      {children}
    </Box>
  );
}

// Gedeelde inputstijl
const inputStyle = {
  borderRadius: "lg",
  borderColor: "gray.300",
  _dark: { borderColor: "gray.600", bg: "gray.700", color: "white" },
  _focus: { borderColor: "teal.400", boxShadow: "0 0 0 1px teal" },
  bg: "white",
  size: "md",
};

export default function EventFormFields({ register }) {
  return (
    <>
      <Field label="Titel">
        <Input
          placeholder="Bijv. Tech Meetup Amsterdam"
          {...inputStyle}
          {...register("title", { required: true, maxLength: 60 })}
        />
      </Field>

      <Field label="Beschrijving">
        <Input
          placeholder="Korte omschrijving van het event"
          {...inputStyle}
          {...register("description", { required: true, maxLength: 200 })}
        />
      </Field>

      <Field label="Afbeelding URL">
        <Input
          placeholder="https://..."
          {...inputStyle}
          {...register("image")}
        />
      </Field>

      <Field label="Starttijd">
        <Input
          type="datetime-local"
          {...inputStyle}
          {...register("startTime", { required: true })}
        />
      </Field>

      <Field label="Eindtijd">
        <Input
          type="datetime-local"
          {...inputStyle}
          {...register("endTime", { required: true })}
        />
      </Field>
    </>
  );
}
