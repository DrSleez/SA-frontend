import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plant } from "../interfaces/Plant";

const plantURL = import.meta.env.VITE_PLANT_SERVICE_SEARCH;

async function getPlantsBySearch(search: string): Promise<Plant[]> {
  try {
    const response = await axios.get<Plant[]>(`${plantURL}/${search}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get plants " + error);
  }
}

export default function usePlantSearch(search: string) {
  const query = useQuery({
    queryKey: ["plants", search],
    queryFn: () => getPlantsBySearch(search),
  });
  return query;
}
