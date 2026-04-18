import { createContext, useContext, useEffect, useState } from "react";
import { fetchCategories, fetchEvents } from "../pages/ApiPage";

const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Haal alle data op (events + categories)
  const fetchData = async () => {
    setLoading(true);
    try {
      const [e, c] = await Promise.all([fetchEvents(), fetchCategories()]);
      setEvents(e);
      setCategories(c);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, categories, loading, refresh: fetchData }}
    >
      {children}
    </EventContext.Provider>
  );
};
