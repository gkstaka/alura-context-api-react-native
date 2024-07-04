import api from "../../AxiosApi";

export async function salvarProduto(produto) {
    try {
        const resultado = await api.post("/produtos", produto);
        return resultado.data;
    } catch (e) {
        console.log(e);
        return {};
    }
}

export async function pegarProduto() {
    try {
        const resultado = await api.get("/produtos");
        // console.log(resultado.data);
        return resultado.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function deletaProduto(id) {
    console.log(id);
    try {
        await api.delete(`/produtos/${id}`);
        return "ok";
    } catch (e) {
        console.log(e);
        return "erro";
    }
}
