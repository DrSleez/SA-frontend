import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plant } from "../interfaces/Plant";

const plantURL = import.meta.env.VITE_PLANTS_SERVICE;

async function getPlants(): Promise<Plant[]> {
  try {
    const response = await axios.get<Plant[]>(`${plantURL}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get all plants " + error);
  }
}

export default function useAllPlants() {
  const query = useQuery({
    queryKey: ["plants", "all"],
    queryFn: getPlants,
  });
  return query;
}
