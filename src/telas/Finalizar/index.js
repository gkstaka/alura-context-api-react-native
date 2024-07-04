import { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    StatusBar,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Produto } from "../../componentes/Produto";
import { estilos } from "./estilos";
import { Feather } from "react-native-vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/Feather";
import { useContext } from "react";
import { TemaContext } from "../../contexts/TemaContext";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { ProdutosContext } from "../../contexts/ProdutosContext";
import { deletaProduto } from "../../servicos/requisicoes/produtos";

export default function Finalizar({ navigation }) {
    const { usuario } = useContext(AutenticacaoContext);
    const { temaEscolhido } = useContext(TemaContext);
    const { quantidade, carrinho, setCarrinho, setQuantidade, valorTotal, setValorTotal } =
        useContext(ProdutosContext);
    const estilo = estilos(temaEscolhido);

    // useEffect(() => {
    //     carrinho.forEach((produto) => {
    //         setValorTotal(valorTotal + produto.preco);
    //     });
    // }, []);

    async function finalizaCompra() {
        try {
            for (const produto of carrinho) {
                const resultado = await deletaProduto(produto.id);
                console.log(resultado);
                if (resultado === "erro") {
                    Alert.alert("Erro", "Erro ao finalizar a compra");
                    return;
                }
            }
            setCarrinho([]);
            setQuantidade(0);
            setValorTotal(0);
            navigation.navigate("Principal");
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Erro ao finalizar a compra");
        }
    }

    return (
        <View style={estilo.container}>
            <StatusBar />
            <View style={estilo.cartao}>
                <Text style={estilo.cartaoTexto}>Informações de entrega </Text>
                <Text style={estilo.informacoesTexto}>
                    Nome: {usuario.nome}
                </Text>
                <Text style={estilo.informacoesTexto}>
                    Endereço: {usuario.endereco}
                </Text>
                <Text style={estilo.informacoesTexto}>
                    Email: {usuario.email}
                </Text>
                <Text style={estilo.informacoesTexto}>
                    Telefone{usuario.telefone}
                </Text>
            </View>
            <View style={estilo.cartao}>
                <Text style={estilo.informacoesTexto}>
                    Quantidade: {quantidade}
                </Text>
                <Text style={estilo.informacoesTexto}>
                    Preco total: R$ {valorTotal}
                </Text>
            </View>
            <TouchableOpacity
                style={estilo.botao}
                onPress={() => finalizaCompra()}>
                <Text style={estilo.botaoTexto}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
}
