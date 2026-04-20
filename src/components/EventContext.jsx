import { createContext, useContext, useEffect, useState } from "react";
import { fetchCategories, fetchEvents } from "../api/ApiPage";

const EventContext = createContext();
export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Haal alle data op (events + categories)
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [e, c] = await Promise.all([fetchEvents(), fetchCategories()]);
      setEvents(e);
      setCategories(c);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, categories, loading, error, refresh: fetchData }}
    >
      {children}
    </EventContext.Provider>
  );
};
