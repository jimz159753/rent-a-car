'use client'
import React from 'react'
import {
    Document,
    Text,
    Page,
    View,
    StyleSheet,
    PDFViewer
} from '@react-pdf/renderer'
import dayjs from 'dayjs'

const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginHorizontal: 'auto'
    },
    title: {
        fontSize: '20px',
        textAlign: 'center',
        marginVertical: '15px'
    },
    description: {
        fontSize: '14px',
        marginVertical: '10px'
    },
    textTable: {
        fontSize: '14px'
    },
    table: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid black',
        height: '25px',
        width: '80%',
        marginHorizontal: 'auto',
        paddingHorizontal: '5px'
    },
    signContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: '100px'
    },
    sign: {
        fontSize: '14px',
        borderTop: '1px solid black',
        width: '200px',
        textAlign: 'center',
        paddingTop: '10px'
    },
    note: {
        textAlign: 'center'
    }
})

interface ContractProps {
    searchParams: any
}

const Contract = ({ searchParams }: ContractProps) => {
    const item = JSON.parse(searchParams.item)
    return (
        <PDFViewer style={{ width: '100%' }}>
            <Document>
                <Page>
                    <View style={styles.container}>
                        <Text style={styles.title}>Contrato de alquiler</Text>
                        <Text style={styles.description}>{`CONTRATO DE PRESTACIÓN DE SERVICIOS QUE CELEBRAN ${item.client.name} Y 
                        ANTONIO MARTINEZ MORALES, A QUIENES EN LO SUCESIVO Y PARA LOS EFECTOS DE ESTE CONTRATO SE LES DENOMINARÁ PRESTADOR Y 
                        PRESTATARIO RESPECTIVAMENTE.`}</Text>
                        <Text style={styles.description}>Este instrumento lo celebran conforme a las declaraciones y cláusulas siguientes:</Text>
                        <Text style={styles.title}>Datos del Cliente</Text>
                        <View style={styles.table}>
                            <Text style={styles.textTable}>DOC: 123456</Text>
                            <Text style={styles.textTable}>{`NOMBRE: ${item.client.name}`}</Text>
                        </View>
                        <View style={styles.table}>
                            <Text style={styles.textTable}>{`DIRECCION: ${item.client.address}`}</Text>
                            <Text style={styles.textTable}>{`TELEFONO: ${item.client.phone}`}</Text>
                        </View>
                        <Text style={styles.title}>Datos del Vehículo</Text>
                        <View style={styles.table}>
                            <Text style={styles.textTable}>{`PLACA: ${item.vehicle.plate}`}</Text>
                            <Text style={styles.textTable}>{`VEHICULO: ${item.vehicle.brand}`}</Text>
                        </View>
                        <View style={styles.table}>
                            <Text style={styles.textTable}>{`MODELO: ${item.vehicle.brand}`}</Text>
                            <Text style={styles.textTable}>{`CANT. DIAS: ${item.days}`}</Text>
                        </View>
                        <View style={styles.table}>
                            <Text style={styles.textTable}>{`PRECIO X DIA: $${item.vehicle.price}`}</Text>
                            <Text style={styles.textTable}>{`ABONADO: $${item.payment}`}</Text>
                        </View>
                        <View style={styles.table}>
                            <Text style={styles.textTable}>{`F.PRESTAMO: ${dayjs(item.startDate).format('DD-MM-YYYY')}`}</Text>
                            <Text style={styles.textTable}>{`F.DEVOLUCION: ${dayjs(item.endDate).format('DD-MM-YYYY')}`}</Text>
                        </View>
                        <Text style={styles.title}>{`PENDIENTE: $${(item.vehicle.price * item.days) - item.payment}`}</Text>
                        <View style={styles.signContainer}>
                            <Text style={styles.sign}>FIRMA</Text>
                            <Text style={styles.sign}>HUELLA</Text>
                        </View>
                        <Text style={styles.note}>GRACIAS POR SU PREFERENCIA</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default Contract;