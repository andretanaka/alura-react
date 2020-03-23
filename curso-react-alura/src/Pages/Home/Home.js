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

  escutadorDeSubmit = autor => {
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

    ApiService.ListaLivros()
      .then(res => console.log(res.data));
    return (
      <Fragment>
        <Header />
        <div className="mb-10">
          <h1>Casa do codigo</h1>
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Form escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }

}

export default App;
