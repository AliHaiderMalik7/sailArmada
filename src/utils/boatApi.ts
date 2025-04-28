// src/api/boatApi.ts
import axios from "axios";
import { message } from "antd"; // Import Ant Design message component
import { SearchOption } from "./mockDataAutoSearch";
import { PaginatedYachtResponse } from "../types/YachtDetails";
import { getDefaultDateRange } from "./dateUtils";

// Define the type of each boat type
export interface BoatTypeOption {
  id: number;
  label: string;
}

// Fetch boat types from the API
export const fetchBoatTypes = async (): Promise<BoatTypeOption[]> => {
  try {
    const response = await axios.get("https://sailarmada.com/api/yachts/type/");
    return response.data.map((item: string, index: number) => ({
      id: index + 1,
      label: item,
    }));
  } catch (error) {
    message.error("Failed to fetch boat types");
    console.error("Failed to fetch boat types:", error);
    return [];
  }
};

export const reserveThisBoat = async (reservationData: any) => {
  try {
    const response = await axios.post(
      `https://sailarmada.com/api/yachts/reserve/`,
      reservationData // Pass the data object as the request body
    );
    return response.data;
  } catch (error) {
    message.error("Failed to reserve the boat");
    console.error("Failed to reserve the boat:", error);
    return null;
  }
};

// Fetch destinations from the API
export const fetchdestinations = async () => {
  const normalizeDateToUTC = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    return (
      new Date(date.getTime() - offset).toISOString().split("Z")[0] + "Z"
    );
  };

  // If dateRange is not selected, set default dates
  const [checkIn, checkOut] = getDefaultDateRange();

  const selectedCheckIn = normalizeDateToUTC(checkIn);
  const selectedCheckOut = normalizeDateToUTC(checkOut);
  try {
    const response = await axios.get(
      `https://sailarmada.com/api/yachts/availability-by-country/?countries=IT,GR,ES,FR,HR,TR&currency=EUR&date_to=${selectedCheckIn}&date_from=${selectedCheckOut}`
    );
    return response;
  } catch (error) {
    message.error("Failed to fetch destinations");
    console.error("Failed to fetch destinations:", error);
    return null;
  }
};

// Fetch yacht details
export const getYachtDetails = async (params: any) => {
  try {
    const response = await axios.get(
      `https://sailarmada.com/api/yachts/check-availability/?yachtId=${params.id}&year=2024`
    );
    return response;
  } catch (error) {
    message.error("Failed to fetch yacht details");
    console.error("Failed to fetch yacht details:", error);
    return null;
  }
};

// Debounce helper function to limit API calls
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// Function to fetch location search results from the API
export const fetchLocationSearch = async (
  query: string
): Promise<SearchOption[]> => {
  if (!query) return [];

  try {
    const response = await axios.get(
      `https://sailarmada.com/api/yachts/search/location/?query=${query}`
    );
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      countryName: item.country.name, // Extract country name
      shortName: item.country.short_name,
      imageUrl: item.image_url,
      yachtCount: item.yacht_count,
      city: item.city,
    }));
  } catch (error) {
    message.error("Failed to fetch locations");
    console.error("Failed to fetch locations:", error);
    return [];
  }
};

// Function to search yachts based on parameters
export const searchYachts = async (
  dateFrom: string,
  dateTo: string,
  country: string,
  currency: string,
  yachtType: string,
  beds: number = 0,
  page: number = 1, // New parameter for pagination
  city: string = "",
  base_from_id = ""
): Promise<PaginatedYachtResponse | null> => {
  try {
    // Construct the API URL with search parameters and pagination
    const searchParams = new URLSearchParams({
      date_from: `${dateFrom}T00:00:00`,
      date_to: `${dateTo}T00:00:00`,
      country,
      currency,
      yacht_type: yachtType,
      bed: beds.toString(),
      page: page.toString(), // Include the page parameter
      city,
      base_from_id,
    });

    const response = await axios.get<PaginatedYachtResponse>(
      `https://sailarmada.com/api/yachts/search/?${searchParams}`
    );
    return response.data; // Assuming response.data is the paginated result
  } catch (error) {
    message.error("Failed to fetch yacht search results");
    console.error("Failed to fetch yacht search results:", error);
    return null;
  }
};
