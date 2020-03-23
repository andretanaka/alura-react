import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';

import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import Form from '../../Components/Formulario/Formulario';
import PopUp from '../../Utils/PopUp';
import ApiService from "../../Utils/ApiService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autores: [],
    };
  };

  removeAutor = id => {

    const { autores } = this.state;

    const autoresAtualizado = autores.filter(autor => {
      return autor.id !== id;
    });

    ApiService.RemoveAutor(id)
      .then(res => {
        if (res.message === 'deleted') {
          this.setState({ autores: [...autoresAtualizado] });
          PopUp.exibeMensagem('error', "Autor removido com sucesso.")

        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro ao remover"))
  }

  escutadorDeSubmit = dados => {
    const autor = {
      nome: dados.nome,
      livro: dados.livro,
      preco: dados.preco
    }
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        if (res.message === 'success') {
          this.setState({ autores: [...this.state.autores, autor] })
          PopUp.exibeMensagem('success', "Autor adicionado com sucesso");
        }
      })
      .catch(err => PopUp.exibeMensagem('error', "Erro ao criar")
      )
  }

  componentDidMount() {
    ApiService.ListaAutores()
      .then(res => {
        if (res.message === 'success') {
          this.setState({ autores: [...this.state.autores, ...res.data] });
        }
      })
      .catch(err => PopUp.exibeMensagem('error', "Erro ao listar autores"));
  }

  render() {

    const campos = [
      { titulo: 'Autores', dado: 'nome' },
      { titulo: 'Livros', dado: 'livro' },
      { titulo: 'Precos', dado: 'preco' }
    ]
    return (
      <Fragment>
        <Header />
        <div className="mb-10">
          <h1>Casa do codigo</h1>
          <Form
            escutadorDeSubmit={this.escutadorDeSubmit}
          />
          <Tabela
            campos={campos}
            dados={this.state.autores}
            removeDados={this.removeAutor}
          />
          
        </div>
      </Fragment>
    );
  }

}

export default App;
