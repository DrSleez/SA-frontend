import { Container, Title } from "@mantine/core";
import HeroCarousel from "../components/HeroCarousel";
import HeroPageArrivals from "../components/HeroPageArrivals/HeroPageArrivals";

export default function HeroPage() {
  return (
    <>
      <HeroCarousel />
      <Container mt={20} fluid>
        <Title>New Arrivals</Title>
        <HeroPageArrivals />
      </Container>
    </>
  );
}
