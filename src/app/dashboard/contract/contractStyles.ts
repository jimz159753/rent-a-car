import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    container: {
        width: "95%",
        marginHorizontal: "auto",
    },
    title: {
        fontSize: "20px",
        textAlign: "center",
        marginVertical: "15px",
    },
    description: {
        fontSize: "14px",
        marginVertical: "10px",
    },
    textTable: {
        fontSize: "14px",
    },
    table: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid black",
        height: "25px",
        width: "80%",
        marginHorizontal: "auto",
        paddingHorizontal: "5px",
    },
    signContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: "100px",
    },
    sign: {
        fontSize: "14px",
        borderTop: "1px solid black",
        width: "200px",
        textAlign: "center",
        paddingTop: "10px",
    },
    note: {
        textAlign: "center",
    },
});