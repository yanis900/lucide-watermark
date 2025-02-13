
export const fetchItems = async () => {
  try {
    const response = await fetch("/api/readItem");
    if (response.ok) {
      const data = await response.json();
      console.log("Items Fetched Successfully:", data);
      return data; // Returning data here
    } else {
      console.error("Failed to fetch items:", response.status);
      return []; // Return empty array in case of failure
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
