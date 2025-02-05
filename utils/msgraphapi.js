import axios from "axios";

// Function to fetch events after retrieving the authorization token
export async function fetchEvents() {
  try {
    const response = await axios.get('/api/calendarToken');
    const token = response.data.token;
    
    if (!token) {
      throw new Error("Unable to retrieve authorization token");
    }

    const eventsResponse = await axios.get(
      `https://graph.microsoft.com/v1.0/users/RENCI_PublicWeb.rmb@ad.unc.edu/calendar/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return eventsResponse.data.value; // Return the fetched events
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
