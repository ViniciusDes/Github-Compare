import React, { Component, Children } from "react";
// eslint-disable-next-line quotes
import moment from "moment";
import GlobalStyle from "../../styles/global";

import logo from "../../assets/logo.png";
import api from "../../services/api";

import Input from "../../components/input";
import Button from "../../components/ButtonDeletar";

import CompareList from "../../components/CompareList/index";

import { Container, Form } from "./styles";

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault(); //faz que o carregamento da pagina nao aconteca quando clicado no botao submit do form

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();
      localStorage.removeItem("respositries");
      // console.log(repository);
      this.setState({
        repositoryError: false,
        repositoryInput: "",
        repositories: [...this.state.repositories, repository], //estou setando tudo que ta no array e adcionando o reponse
      });
      var jsonAux = JSON.stringify(this.state.repositories);
      localStorage.setItem("repositories", jsonAux);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRefreshRepository = async (id) => {
    const { repositories } = this.state;
    const repository = repositories.find((repo) => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositories: repositories.map((repo) =>
          repo.id === data.id ? data : repo
        ),
      });
      localStorage.setItem("repositories", JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  handleDeleteRepository = (id) => {
    //pego a id passada no onclick
    const { repositories } = this.state;
    const filteredRepositories = repositories.filter((value) => {
      //itera sobre cada item do repositories
      const clickedId = value.id;

      return clickedId !== id; //retorna tudo que nao for clicado
    });
    // console.log(filteredRepositories);

    this.setState({ repositories: filteredRepositories });
    localStorage.setItem("repositories", JSON.stringify(filteredRepositories));
  };
  componentDidMount() {
    if (localStorage.length === 0) {
      // alert("nao tem repositorio");
    } else {
      var jsonData = JSON.parse(localStorage.repositories);
      console.log(jsonData);
      this.setState({
        repositories: jsonData,
      });
    }
  }

  render() {
    return (
      <Container>
        <GlobalStyle />
        <img src={logo} alt="GITHUBCOMPARE"></img>

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <Input
            onChange={(e) => this.setState({ repositoryInput: e.target.value })}
            // value={localStorage.repositories}
          ></Input>
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "OK"
            )}
          </button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          refreshRepository={this.handleRefreshRepository}
          deleteRepository={this.handleDeleteRepository}
        />
        <Button />
      </Container>
    );
  }
}
