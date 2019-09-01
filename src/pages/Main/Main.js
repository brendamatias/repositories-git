import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Form, SubmitButton, List, Error } from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: '',
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      error: '',
      loading: true,
    });

    const { newRepo, repositories } = this.state;
    const repository = repositories.filter(r => r.name === newRepo);

    if (newRepo === '') {
      this.setState({
        error: 'Por favor, informe um repositório.',
        loading: false,
      });

      return;
    }
    if (repository.length > 0) {
      this.setState({
        newRepo: '',
        error:
          'Repositório já cadastrado, por favor, informe outro repositório.',
        loading: false,
      });
      return;
    }

    const response = await api.get(`/repos/${newRepo}`).catch(
      this.setState({
        newRepo: '',
      })
    );

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  handleDelete = repository => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter(r => r !== repository),
    });
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt color="#12B886" size={40} />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            text="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <Error>{error}</Error>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <button
                  type="submit"
                  onClick={() => this.handleDelete(repository)}
                >
                  <FaTimes color="#fff" size={11} />
                </button>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
