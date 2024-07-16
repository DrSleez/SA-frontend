import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plant } from "../interfaces/Plant";

const plantURL = import.meta.env.VITE_PLANT_SERVICE_CATEGORY;

async function getPlantsByCategory(category: string): Promise<Plant[]> {
  try {
    const response = await axios.get<Plant[]>(`${plantURL}/${category}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get plants " + error);
  }
}

export default function useCategoryPlants(category: string) {
  const query = useQuery({
    queryKey: ["plants", category],
    queryFn: () => getPlantsByCategory(category),
  });
  return query;
}
