import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UUID } from "crypto";
import { Plant } from "../interfaces/Plant";

const plantURL = import.meta.env.VITE_PLANT_SERVICE;

async function getPlant(id: UUID): Promise<Plant> {
  try {
    const response = await axios.get<Plant>(`${plantURL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get paginated books");
  }
}

export default function usePlant(id: UUID) {
  const query = useQuery({
    queryKey: ["plant", id],
    queryFn: () => getPlant(id),
  });
  return query;
}
