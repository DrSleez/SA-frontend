import { useForm } from "@mantine/form";
import {
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Button,
  Container,
  Title,
} from "@mantine/core";
import getUserIsAdmin from "../utility/getUserIsAdmin";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthenticatedUser } from "../interfaces/AuthenticatedUser";

interface PlantFormValues {
  name: string;
  latinName: string;
  price: number;
  amount: number;
  category: string;
  height: string;
  waterDemand: string;
  description: string;
  imageLink: string;
}

export default function NewPlant() {
  const authUser = useAuthUser<AuthenticatedUser>();
  const token = authUser?.access_token;
  const isAdmin = getUserIsAdmin(authUser);

  if (!isAdmin) {
    return <Title>Kein Admin, sorry</Title>;
  }
  const form = useForm<PlantFormValues>({
    initialValues: {
      name: "",
      latinName: "",
      price: 0,
      amount: 0,
      category: "",
      height: "",
      waterDemand: "",
      description: "",
      imageLink: "",
    },

    validate: {
      name: (value) => (value ? null : "Name is required"),
      latinName: (value) => (value ? null : "Latin name is required"),
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      amount: (value) => (value > 0 ? null : "Amount must be greater than 0"),
      category: (value) => (value ? null : "Category is required"),
      height: (value) => (value ? null : "Height is required"),
      waterDemand: (value) => (value ? null : "Water demand is required"),
      description: (value) => (value ? null : "Description is required"),
      imageLink: (value) => (value ? null : "Image link is required"),
    },
  });

  const handleSubmit = (values: PlantFormValues) => {
    console.log(values);
    // Hier können Sie die Formulardaten verarbeiten, z.B. an eine API senden
  };

  return (
    <Container>
      <Title order={2} mb="xl">
        Neue Pflanze erstellen
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          placeholder='Spalier-Kirschbaum "Stella"'
          {...form.getInputProps("name")}
          required
        />

        <TextInput
          label="Lateinischer Name"
          placeholder='Prunus avium "Stella"'
          {...form.getInputProps("latinName")}
          required
        />

        <NumberInput
          label="Preis"
          placeholder="84.99"
          {...form.getInputProps("price")}
          required
        />

        <NumberInput
          label="Menge"
          placeholder="9999"
          {...form.getInputProps("amount")}
          required
        />

        <Select
          label="Kategorie"
          placeholder="BAUM"
          data={[
            { value: "BAUM", label: "Baum" },
            { value: "GARTENPFLANZE", label: "Gartenpflanze" },
            { value: "HECKENPFLANZE", label: "Heckenpflanze" },
            { value: "ZIMMERPFLANZE", label: "Zimmerpflanze" },
          ]}
          {...form.getInputProps("category")}
          required
        />

        <Select
          label="Höhe"
          placeholder="L"
          data={[
            { value: "S", label: "Small" },
            { value: "M", label: "Medium" },
            { value: "L", label: "Large" },
          ]}
          {...form.getInputProps("height")}
          required
        />

        <Select
          label="Wasserbedarf"
          placeholder="Wählen Sie einen Wert"
          data={[
            { value: "LOW", label: "Low" },
            { value: "MEDIUM", label: "Medium" },
            { value: "HIGH", label: "High" },
          ]}
          {...form.getInputProps("waterDemand")}
          required
        />

        <Textarea
          label="Beschreibung"
          placeholder="Prunus avium 'Stella' ist ein Kirschbaum..."
          {...form.getInputProps("description")}
          required
        />

        <TextInput
          label="Bildlink"
          placeholder="https://example.com/image"
          {...form.getInputProps("imageLink")}
          required
        />

        <Button type="submit" mt="md">
          Absenden
        </Button>
      </form>
    </Container>
  );
}
