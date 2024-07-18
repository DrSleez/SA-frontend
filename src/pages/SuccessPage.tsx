import { useSearchParams } from "react-router-dom";
import useCheckoutSuccess from "../hooks/useCheckoutSuccess";
import LoadingPage from "./LoadingPage/LoadingPage";
import {
  Container,
  Group,
  SimpleGrid,
  Table,
  Title,
  Text,
} from "@mantine/core";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchBasket } from "../redux/basketSlice";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  if (sessionId === null) {
    return <div>Keine gültige SessionID</div>;
  }
  const authHeader = useAuthHeader();
  const token = authHeader?.split(" ")[1];
  const dispatch: AppDispatch = useDispatch();

  const query = useCheckoutSuccess(sessionId, token);

  if (query.isLoading) {
    return <LoadingPage />;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  const purchasedItems = query.data?.items.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.productName}</Table.Td>
      <Table.Td>{item.itemId}</Table.Td>
      <Table.Td>{item.price.toFixed(2)} €</Table.Td>
    </Table.Tr>
  ));

  dispatch(fetchBasket(token));

  return (
    <>
      <Container>
        <Title order={2}>Vielen Dank für Ihre Bestellung!</Title>
        <Text mt="sm">Bestell-ID: {query.data?.id}</Text>

        <Table mt="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Produktname</Table.Th>
              <Table.Th>Artikel-ID</Table.Th>
              <Table.Th>Preis</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{purchasedItems}</Table.Tbody>
        </Table>
      </Container>
    </>
  );
}
