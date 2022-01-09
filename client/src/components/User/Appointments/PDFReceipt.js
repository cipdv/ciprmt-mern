import React from 'react'
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer'

export function PDFReceipt (props) {

    Font.register({ family: 'ubuntu', source: "https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"})

    const styles = StyleSheet.create({
        page: {
            display: 'grid',
            textAlign: 'center',
            fontFamily: 'ubuntu',
            fontSize: 12,
            padding: 30
        },
        rmt: {
            fontSize: 20,
            marginTop: 20,
            marginBottom: 5
        },
        phone: {
            marginBottom: 5,
            fontSize: 10
        },
        header: {
            fontSize: 10
        },  
        official: {
            marginBottom: 15,
            marginTop: 25,
            fontSize: 16
        },
        details: {
            padding: 2
        }

    })

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.rmt}>Cip de Vries, RMT</Text>
                <Text style={styles.header}>268 Shuter St, Toronto ON M5A 1W3</Text>
                <Text style={styles.phone}>416-258-1230</Text>
                <Text style={styles.header}>Registration Number: U035</Text>
                <Text style={styles.header}>HST Number: 845 918 200 RT0001</Text>
                <Text style={styles.official}>Official Receipt</Text>
                <Text style={styles.details}>Date of treatment: {props.appointment.date}</Text>
                <Text style={styles.details}>Duration: {props.appointment.duration} minutes</Text>
                <Text style={styles.details}>Payment received: ${props.appointment.price}</Text>
                <Text style={styles.details}>Payment received from: {props.user.result.firstName} {props.user.result.lastName}</Text>
                <Text style={styles.details}>Receipt number: {props.appointment._id}</Text>
            </Page>
        </Document>
    )
}

