import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useOrders from "../hooks/useOrders";
import LoadingPage from "./LoadingPage/LoadingPage";
import { Container, Title, Text, Table } from "@mantine/core";
import React from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function OrdersPage() {
  const authHeader = useAuthHeader();
  const token = authHeader?.split(" ")[1];

  const query = useOrders(token);

  if (query.isLoading) {
    return <LoadingPage />;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  return (
    <>
      <Title order={2} pb={20}>
        Ihre Bestellhistorie
      </Title>
      {Array.isArray(query.data) && query.data.length > 0 ? (
        query.data.reverse().map((order) => (
          <React.Fragment key={order.id}>
            <Container pb={20}>
              <Title order={3}>
                Bestellung vom{" "}
                {format(
                  new Date(order.metadata.createdAt),
                  "dd.MM.yyyy HH:mm",
                  { locale: de }
                )}{" "}
                Uhr
              </Title>
              <Table mt="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Produktname</Table.Th>
                    <Table.Th>Artikel-ID</Table.Th>
                    <Table.Th>Preis</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {order.items.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>{item.productName}</Table.Td>
                      <Table.Td>{item.itemId}</Table.Td>
                      <Table.Td>{item.price.toFixed(2)} €</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Container>
          </React.Fragment>
        ))
      ) : (
        <Text>Keine Bestellungen verfügbar.</Text>
      )}
    </>
  );
}
