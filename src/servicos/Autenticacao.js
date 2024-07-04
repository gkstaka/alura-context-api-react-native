import api from "../AxiosApi";

async function autenticar(email, senha) { 
    try {
        if (!email || !senha) { 
            throw new Error("Email ou senha não informados");
        }
        const resposta = await api.get(`/usuarios`, { params: { email: email, senha: senha } });
        if (resposta.data.length === 0) { 
            return "inexistente"
        }
        return resposta.data[0];
    }
    catch (e) { 
        console.log("Erro ao logar: ", e);
        return "erro";
    }
}

export default autenticar;