// Fetch alle events
export const fetchEvents = async () => {
  try {
    const res = await fetch("http://localhost:3000/events");
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return [];
  }
};

// Fetch alle categorieën
export const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/categories");
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return [];
  }
};
