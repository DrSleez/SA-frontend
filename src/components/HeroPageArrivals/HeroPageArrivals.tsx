import { Card, Grid, Group, Image, Text, Badge } from "@mantine/core";
import "./HeroPageArrivals.css";

export default function HeroPageArrivals() {
  const plants = [
    { src: "/newArrivals/1.webp", name: "Goldfruchtpalme", price: 29.99 },
    { src: "/newArrivals/2.webp", name: "Flamingoblume", price: 49.99 },
    { src: "/newArrivals/3.webp", name: "Bonsai", price: 109.99 },
    { src: "/newArrivals/4.webp", name: "Monstera", price: 19.99 },
    { src: "/newArrivals/5.webp", name: "Gummibaum", price: 34.99 },
    { src: "/newArrivals/1.webp", name: "Goldfruchtpalme2", price: 29.99 },
    { src: "/newArrivals/2.webp", name: "Flamingoblume2", price: 49.99 },
    { src: "/newArrivals/3.webp", name: "Bonsai2", price: 109.99 },
    { src: "/newArrivals/4.webp", name: "Monstera2", price: 19.99 },
    { src: "/newArrivals/5.webp", name: "Gummibaum2", price: 34.99 },
  ];

  const cards = plants.map((item) => (
    <Grid.Col span={3} key={item.name}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="card-container"
      >
        <Card.Section>
          <Image src={item.src} h={400} fit="cover" />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{item.name}</Text>
          <Badge color="pink">New</Badge>
        </Group>
        <Text fw={50}>{item.price}€</Text>
      </Card>
    </Grid.Col>
  ));

  return (
    <>
      <Grid justify="flex-start" mt={20}>
        {cards}
      </Grid>
    </>
  );
}
