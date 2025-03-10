import apiClient from "./axiosInstance";
import { startOfMonth, endOfMonth, format, startOfDay, endOfDay } from "date-fns";

export async function fetchEvents(year, month, day = null) {
  try {
    let startDate, endDate;

    if (day) {
      // Fetch events for a single day
      const specificDate = new Date(year, month - 1, day);
      startDate = format(startOfDay(specificDate), "yyyy-MM-dd'T'00:00:00'Z'");
      endDate = format(endOfDay(specificDate), "yyyy-MM-dd'T'23:59:59'Z'");
    } else {
      // Fetch events for the whole month
      startDate = format(startOfMonth(new Date(year, month - 1)), "yyyy-MM-dd'T'00:00:00'Z'");
      endDate = format(endOfMonth(new Date(year, month - 1)), "yyyy-MM-dd'T'23:59:59'Z'");
    }

    const response = await apiClient.get(
      `/users/RENCI_PublicWeb.rmb@ad.unc.edu/calendar/events?$filter=start/dateTime ge '${startDate}' and end/dateTime le '${endDate}'`
    );

    return response.data.value;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
