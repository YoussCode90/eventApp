import { Checkbox, HStack } from "@chakra-ui/react";

export default function CheckboxList({
  categories,
  selectedCategories,
  toggleCategory,
}) {
  return (
    <HStack wrap="wrap" gap="3">
      {categories.map((c) => (
        <Checkbox.Root
          key={c.id}
          checked={selectedCategories.includes(c.id)}
          onCheckedChange={() => toggleCategory(c.id)}
          colorPalette="teal"
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control borderRadius="md" />
          <Checkbox.Label
            fontSize="sm"
            color="gray.700"
            _dark={{ color: "gray.300" }}
          >
            {c.name}
          </Checkbox.Label>
        </Checkbox.Root>
      ))}
    </HStack>
  );
}
