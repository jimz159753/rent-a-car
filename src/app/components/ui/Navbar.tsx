import React from "react";
import "./Navbar.css";

export const Navbar = () => {
  const scrolltoHash = function (element_id: string) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div className="navbar">
      <ul className="list">
        <li onClick={() => scrolltoHash("about")}>Nosotros</li>
        <li onClick={() => scrolltoHash("cars")}>Autos</li>
        <li onClick={() => scrolltoHash("contact")}>Oficinas</li>
        <li onClick={() => scrolltoHash("contact")}>Contacto</li>
      </ul>
    </div>
  );
};
