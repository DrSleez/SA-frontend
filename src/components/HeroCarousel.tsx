import { Carousel } from "@mantine/carousel";
import { Container, Image } from "@mantine/core";

export default function HeroCarousel() {
  const plants = [
    "/heroPlants/Goldfruchtpalme16zu9.webp",
    "/heroPlants/Palmlilie.webp",
    "/heroPlants/Zebra-Korbmarante.webp",
  ];

  const slides = plants.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} h={1000} fit="contain" />
    </Carousel.Slide>
  ));
  return (
    <Container fluid>
      <Carousel withIndicators h="100vh">
        {slides}
      </Carousel>
    </Container>
  );
}
