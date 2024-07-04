import { createContext, useEffect, useState } from "react";
import { pegarProduto, salvarProduto } from "../servicos/requisicoes/produtos";

export const ProdutosContext = createContext({});

export function ProdutosProvider({ children }) {
    const [quantidade, setQuantidade] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [ultimosVistos, setUltimosVistos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    useEffect(() => {
        async function pegaLista() {
            const resultado = await pegarProduto();
            resultado.forEach(produto => { 
                setValorTotal(valorTotal + produto.preco);
            })
            setCarrinho(resultado);
            setQuantidade(resultado.length);
            
        }
        pegaLista();
    }, []);

    async function viuProduto(produto) {
        const resultado = await salvarProduto(produto);
        setQuantidade(quantidade + 1);

        let novoCarrinho = carrinho;
        novoCarrinho.push(resultado);
        setCarrinho(novoCarrinho);

        let novoUltimosVistos = new Set(ultimosVistos);
        novoUltimosVistos.add(produto);
        setUltimosVistos([...novoUltimosVistos]);

        setValorTotal(valorTotal + produto.preco);
    }

    return (
        <ProdutosContext.Provider
            value={{
                quantidade,
                setQuantidade,
                carrinho,
                setCarrinho,
                ultimosVistos,
                setUltimosVistos,
                viuProduto,
                valorTotal,
                setValorTotal,
            }}>
            {children}
        </ProdutosContext.Provider>
    );
}
