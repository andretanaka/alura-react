import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';

import Tabela from '../../Components/Tabela/Tabela';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';

class Autores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomes: []
        }
    }

    componentDidMount() {
        ApiService.ListaNomes()
            .then(res => {
                if (res.message === 'success') {
                    PopUp.exibeMensagem('success', 'Autores listados com sucesso.');
                    this.setState({ nomes: [...this.state.nomes, ...res.data] })
                }
            })
            .catch(err => PopUp.exibeMensagem('error', 'Erro ao listar os autores'));
    }


    render() {
        const campos =[{titulo: 'Autores', dado: 'nome'}]
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <h1>Autores</h1>
                    <Tabela
                        campos={campos}
                        dados={this.state.nomes}
                    />

                </div>

            </Fragment>
        );
    }
}
export default Autores;