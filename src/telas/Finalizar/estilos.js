import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { tema } from "../../estilosGlobais";

export const estilos = (tema) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: tema.fundo,
            alignItems: "center",
            justifyContent: "top",
        },
        botao: {
            width: "95%",
            margin: 16,
            marginBottom: 16,
            paddingVertical: 16,
            borderRadius: 10,
            backgroundColor: tema.botao,
        },
        botaoTexto: {
            fontSize: 18,
            fontWeight: "bold",
            color: tema.preto,
            textAlign: "center",
        },
        cartao: {
            width: "95%",
            // alignItems: "center",
            // justifyContent: "space-around",
            
            // flexDirection: "row",
            backgroundColor: "#003556",
            borderRadius: 10,
            padding: 16,
            paddingVertical: 16,
            marginVertical:16,

        },
        cartaoTexto: {
            color: tema.branco,
            fontSize: 26,
            marginBottom:16 ,
        },
        informacoesTexto: {
            color: tema.branco,
            marginVertical:5,
        }
    });
};
