"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { addClient, addRent, successPayment } from "./actions/actions";
import { Result } from "antd";
import "./page.css";

const Success = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const checkPayment = async () => {
    if (sessionId) {
      const session = await successPayment(sessionId);
      if (session.payment_status === "paid") {
        const client = JSON.parse(session.metadata.client);
        const vehicle = JSON.parse(session.metadata.vehicle);
        const rent = {
          ...session.metadata,
          vehicle,
          client,
        };
        addClient(client);
        addRent(rent);
      }
    }
  };

  useEffect(() => {
    if (sessionId) {
      checkPayment();
    }
  }, []);

  return (
    <div className="result">
      <Result
        status="success"
        title="Tu pago fue generado exitosamente."
        subTitle=""
      />
    </div>
  );
};

export default Success;
