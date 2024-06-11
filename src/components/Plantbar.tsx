import { slide as Menu } from "react-burger-menu";
import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import "../styling/plantbar.css";
import Button from "react-bootstrap/Button";

export default function Plantbar() {
  return (
    <nav id="burgerNav">
      <Menu id={"burgerMenu"} width={"20%"} customBurgerIcon={<CiMenuBurger />}>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
      </Menu>
      <Button>Test</Button>
    </nav>
  );
}
