import { createContext, useState } from "react";

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {
    const [usuario, setUsuario] = useState({});
    return (
        <AutenticacaoContext.Provider
            value={{
                usuario, setUsuario
            }}>
            {children}
        </AutenticacaoContext.Provider>
    );
}
