import axios from "axios";
import { startOfMonth, endOfMonth, format } from "date-fns";

export async function fetchEvents(year, month) {
  try {
    const response = await axios.get("/api/calendarToken")
    const token = response.data.token

    if (!token) {
      throw new Error("Unable to retrieve authorization token")
    }

    // Ensure `month - 1` since JavaScript months are zero-based
    const startDate = format(startOfMonth(new Date(year, month - 1)), "yyyy-MM-dd'T'00:00:00'Z'")
    const endDate = format(endOfMonth(new Date(year, month - 1)), "yyyy-MM-dd'T'23:59:59'Z'")

    const eventsResponse = await axios.get(
      `https://graph.microsoft.com/v1.0/users/RENCI_PublicWeb.rmb@ad.unc.edu/calendar/events?$filter=start/dateTime ge '${startDate}' and end/dateTime le '${endDate}'`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return eventsResponse.data.value
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}
