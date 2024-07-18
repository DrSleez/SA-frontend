import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Plant } from "../interfaces/Plant";

const plantURL = import.meta.env.VITE_PLANT_SERVICE;

async function postPlant(plant: Plant, token: string): Promise<Plant> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post<Plant>(`${plantURL}`, plant, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get checkout link " + error);
  }
}

export default function useNewPlant(token: string) {
  const mutation = useMutation({
    mutationFn: (plant: Plant) => postPlant(plant, token),
  });
  return mutation;
}
