import { createContext, useEffect, useState } from "react";
import { escuro, claro } from "../estilosGlobais";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const TemaContext = createContext({});

export function TemaProvider({ children }) {
    const [temaAtual, setTemaAtual] = useState("escuro");

    const temas = {
        escuro: escuro,
        claro: claro,
    };

    useEffect(() => {
        const carregaTemaSalvo = async () => {
            const temaSalvo = await AsyncStorage.getItem("tema");
            if (temaSalvo) {
                setTemaAtual(temaSalvo);
            }
        };
        carregaTemaSalvo();
    }, []);

    async function salvaTemaUsuario(tema) {
        setTemaAtual(tema);
        await AsyncStorage.setItem("tema", tema);
    }

    return (
        <TemaContext.Provider
            value={{
                temaAtual,
                setTemaAtual,
                temaEscolhido: temas[temaAtual],
                salvaTemaUsuario,
            }}>
            {children}
        </TemaContext.Provider>
    );
}
