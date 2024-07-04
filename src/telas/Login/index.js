import { useState, useContext } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Alert,
} from "react-native";
import { estilos } from "./estilos";
import { TemaContext } from "../../contexts/TemaContext";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import autenticar from "../../servicos/Autenticacao";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { usuario, setUsuario } = useContext(AutenticacaoContext);
    const { temaEscolhido } = useContext(TemaContext);
    const estilo = estilos(temaEscolhido);
    
    async function logar() {
        // console.log(email, senha);
        const resposta = await autenticar(email, senha);
        if (resposta === "inexistente") {
            Alert.alert("Login inválido", "Email ou senha incorretos");
            setUsuario({});
        } else if (resposta === "erro") {
            setUsuario({});
            Alert.alert("Erro", "Erro ao logar");
        } else {
            setUsuario(resposta);
            // console.log(usuario);
            navigation.navigate("Principal");
        }
    }
    return (
        <View style={estilo.container}>
            <StatusBar />
            <Text style={estilo.titulo}>Login</Text>

            <View style={estilo.inputArea}>
                <TextInput
                    style={estilo.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={estilo.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                style={estilo.botao}
                onPress={() => {
                    logar();
                    // navigation.navigate("Principal");
                }}>
                <Text style={estilo.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
