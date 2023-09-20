import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');

  async function buscarCep() {
    if (cep == '') {
      Alert.alert('CEP Inválido!');
      setCep('');
    }
    try {
      const response = await api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log('ERRO' + error);
    }
  }

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>BUSCA CEP</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput
          style={{
            borderColor: '#552244',
            borderWidth: 2,
            width: 200,
            fontSize: 18,
            marginTop: 30,
            marginEnd: 20,
            borderRadius: 5,
            marginLeft: 5,
            padding: 15
          }}
          value={cep}
          onChangeText={texto => setCep(texto)}
          placeholder='CEP'
        />
        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotaoBuscar}>BUSCAR</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={texto => setLogradouro(texto)}
        placeholder='Logradouro'
      />
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={texto => setBairro(texto)}
        placeholder='Bairro'
      />
      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        onChangeText={texto => setCidade(texto)}
        placeholder='Cidade'
      />
      <TextInput
        style={{
          borderColor: '#552244',
          borderWidth: 2,
          width: 100,
          fontSize: 18,
          marginTop: 10,
          marginEnd: 20,
          borderRadius: 5,
          padding: 15,
          marginHorizontal: 20
        }}
        value={uf}
        onChangeText={texto => setUf(texto)}
        placeholder='Estado'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  topBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#552244',
    marginTop: 40
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20
  },
  containerCep: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20
  },
  botaoBuscar: {
    backgroundColor: '#552244',
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 5,
    padding: 20
  },
  textoBotaoBuscar: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  caixaTexto: {
    borderColor: '#552244',
    borderWidth: 2,
    fontSize: 18,
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 20
  }
});
