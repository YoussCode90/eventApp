import { Box, Input, Text } from "@chakra-ui/react";

function Field({ label, children }) {
  return (
    <Box w="100%">
      <Text fontSize="xs" fontWeight="600" color="gray.500" mb="1" textTransform="uppercase" letterSpacing="wide">
        {label}
      </Text>
      {children}
    </Box>
  );
}

const inputStyle = {
  borderRadius: "lg",
  borderColor: "gray.300",
  _dark: { borderColor: "gray.600", bg: "gray.700" },
  _focus: { borderColor: "teal.400", boxShadow: "0 0 0 1px teal" },
  bg: "white",
  size: "md",
};

export default function EventFormFields({ register }) {
  return (
    <>
      <Field label="Titel">
        <Input required placeholder="Bijv. Tech Meetup Amsterdam" {...inputStyle} {...register("title")} />
      </Field>

      <Field label="Beschrijving">
        <Input required placeholder="Korte omschrijving van het event" {...inputStyle} {...register("description")} />
      </Field>

      <Field label="Afbeelding URL">
        <Input required placeholder="https://..." {...inputStyle} {...register("image")} />
      </Field>

      <Field label="Starttijd">
        <Input required type="datetime-local" {...inputStyle} {...register("startTime")} />
      </Field>

      <Field label="Eindtijd">
        <Input required type="datetime-local" {...inputStyle} {...register("endTime")} />
      </Field>
    </>
  );
}
