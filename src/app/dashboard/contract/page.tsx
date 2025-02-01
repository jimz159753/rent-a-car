"use client";
import React from "react";
import {
  Document,
  Text,
  Page,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import { styles } from "./contractStyles";

interface ContractProps {
  searchParams: any;
}

const Contract = ({ searchParams }: ContractProps) => {
  const item = JSON.parse(searchParams.item);
  return (
    <PDFViewer style={{ width: "100%" }}>
      <Document>
        <Page>
          <View style={styles.container}>
            <Text style={styles.title}>Contrato de alquiler</Text>
            <Text
              style={styles.description}
            >{`CONTRATO DE PRESTACIÓN DE SERVICIOS QUE CELEBRAN ${item.client.name} Y 
                        ANTONIO MARTINEZ MORALES, A QUIENES EN LO SUCESIVO Y PARA LOS EFECTOS DE ESTE CONTRATO SE LES DENOMINARÁ PRESTADOR Y 
                        PRESTATARIO RESPECTIVAMENTE.`}</Text>
            <Text style={styles.description}>
              Este instrumento lo celebran conforme a las declaraciones y
              cláusulas siguientes:
            </Text>
            <Text style={styles.title}>Datos del Cliente</Text>
            <View style={styles.table}>
              <Text style={styles.textTable}>DOC: 123456</Text>
              <Text
                style={styles.textTable}
              >{`NOMBRE: ${item.client.name}`}</Text>
            </View>
            <View style={styles.table}>
              <Text
                style={styles.textTable}
              >{`DIRECCION: ${item.client.address}`}</Text>
              <Text
                style={styles.textTable}
              >{`TELEFONO: ${item.client.phone}`}</Text>
            </View>
            <Text style={styles.title}>Datos del Vehículo</Text>
            <View style={styles.table}>
              <Text
                style={styles.textTable}
              >{`PLACA: ${item.vehicle.plate}`}</Text>
              <Text
                style={styles.textTable}
              >{`VEHICULO: ${item.vehicle.brand}`}</Text>
            </View>
            <View style={styles.table}>
              <Text
                style={styles.textTable}
              >{`MODELO: ${item.vehicle.brand}`}</Text>
              <Text style={styles.textTable}>{`CANT. DIAS: ${item.days}`}</Text>
            </View>
            <View style={styles.table}>
              <Text
                style={styles.textTable}
              >{`PRECIO X DIA: $${item.vehicle.price}`}</Text>
              <Text
                style={styles.textTable}
              >{`ABONADO: $${item.payment}`}</Text>
            </View>
            <View style={styles.table}>
              <Text
                style={styles.textTable}
              >{`F.PRESTAMO: ${dayjs(item.startDate).format("DD-MM-YYYY")}`}</Text>
              <Text
                style={styles.textTable}
              >{`F.DEVOLUCION: ${dayjs(item.endDate).format("DD-MM-YYYY")}`}</Text>
            </View>
            <Text
              style={styles.title}
            >{`PENDIENTE: $${item.vehicle.price * item.days - (item.payment ? item.payment : 0)}`}</Text>
            <View style={styles.signContainer}>
              <Text style={styles.sign}>FIRMA</Text>
              <Text style={styles.sign}>HUELLA</Text>
            </View>
            <Text style={styles.note}>GRACIAS POR SU PREFERENCIA</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Contract;
