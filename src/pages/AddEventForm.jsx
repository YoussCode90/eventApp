import { Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEventContext } from "../components/EventContext";
import { toaster } from "../components/ui/toaster";
import CheckboxList from "./CheckboxList";
import EventFormFields from "./EventFormFields";

export default function AddEventForm({ onClose }) {
  const { refresh, categories } = useEventContext();
  const { register, handleSubmit, reset } = useForm();

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = (id) => {
    setSelected((p) =>
      p.includes(id) ? p.filter((c) => c !== id) : [...p, id]
    );
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, categoryIds: selected }),
      });
      if (!res.ok) throw new Error();
      await refresh();
      reset();
      onClose();
      toaster.success({ title: "Event aangemaakt!" });
    } catch {
      toaster.error({ title: "Aanmaken mislukt" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="4" align="stretch">
        <EventFormFields register={register} />

        <CheckboxList
          categories={categories}
          selectedCategories={selected}
          toggleCategory={toggle}
        />

        <Button
          type="submit"
          loading={loading}
          w="full"
          colorPalette="teal"
          borderRadius="lg"
          size="md"
          mt="2"
        >
          Event aanmaken
        </Button>
      </VStack>
    </form>
  );
}
