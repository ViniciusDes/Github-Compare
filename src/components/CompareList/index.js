import React from "react";

import PropTypes from "prop-types";

import { Container, Repository } from "./styles";

import Button from "../ButtonDeletar";

const CompareList = ({
  repositories,
  event,
  refreshRepository,
  deleteRepository,
}) => (
  <Container>
    {repositories.map((repository) => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt="facebook"></img>
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small>last commit</small>
          </li>
        </ul>

        <button
          type="submit"
          onClick={() => deleteRepository(repository.id)}
          className="btn-deletar"
        >
          Deletar repositório
        </button>
        <button
          type="submit"
          onClick={() => refreshRepository(repository.id)}
          className="btn-update"
        >
          Atualizar repositório
        </button>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      // estou falando que minha proptype
      //repositories é um array de objeto

      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    })
  ).isRequired,
};

export default CompareList;
