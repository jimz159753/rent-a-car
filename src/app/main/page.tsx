"use client";
import React from "react";
import Image from "next/image";
import { Categories } from "../components/ui/Categories";
import { MainForm } from "./form/form";
import { Form } from "antd";
import { Ifields } from "./interface/main.interface";
import { Container } from "../components/ui/Container";
import { useRouter } from "next/navigation";
import "./page.css";

const Main = () => {
  const aboutUsImg = require("../../../public/about_us.png");
  const freeWorriesImg = require("../../../public/free_worries.png");
  const aboutUs = `
    Líder en la industria de alquiler de vehículos, comprometida a proporcionar a nuestros clientes una experiencia de conducción excepcional. Con una flota diversa de automóviles de alta calidad, nos esforzamos por satisfacer las necesidades y expectativas de cada cliente.`;
  const freeWorries = `
    Asistencia personalizada 24/7 sin costo adicional a tu renta en caso de emergencias de salud o contratiempos de viaje
    `;
  const cityBackground = require("../../../public/city_background.png");
  const [form] = Form.useForm();
  const router = useRouter();

  const handleAction = (values: Ifields) => {
    const { agency, startDate, endDate } = values;
    const startDateFormat = startDate.format("YYYY-MM-DD");
    const endDateFormat = endDate.format("YYYY-MM-DD");
    router.push(
      `/vehicles?agency=${agency}&startDate=${startDateFormat}&endDate=${endDateFormat}`,
    );
  };
  return (
    <Container>
      <div>
        <Image
          src={cityBackground}
          className="h-5/6 mx-0 bg-cover mb-32 w-full"
          alt="rent a car"
        />
        <MainForm handleAction={handleAction} form={form} />
        <div id="about" className="main-container">
          <div className="about-us">
            <div className="about-us-text">
              <h1>Nosotros</h1>
              <p>{aboutUs}</p>
            </div>
            <Image src={aboutUsImg} className="about-us-img" alt="rent a car" />
          </div>
          <div className="free-worries">
            <Image
              src={freeWorriesImg}
              className="free-worries-img"
              alt="rent a car"
            />
            <div className="free-worries-text">
              <h1>Viaja libre de preocupaciones</h1>
              <p>{freeWorries}</p>
            </div>
          </div>
          <h1 className="text-center font-quando text-[24px] opacity-60">
            Tipo de vehículos
          </h1>
          <Categories />
        </div>
      </div>
    </Container>
  );
};

export default Main;
