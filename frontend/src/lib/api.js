// Use environment variable if available, otherwise default to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getJourneyOptions(searchParams) {
  try {
    const response = await fetch(`${API_URL}/api/journey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching journey options:", error);
    throw error;
  }
}
