import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

import { AddressResolver, DomainResolver } from '.';
import FeatherIcon from 'feather-icons-react';

import styled from 'styled-components';

const Input = styled.input`
	border: 1px solid black;
	width: 100%;
	padding: 16px;
	color: grey;
	font-size: 22px;
	margin: 16px;
`;

const Button = styled.button`
	margin: 16px;
	border: 1px solid black;
	padding: 16px;
	font-size: 22px;
	background-color: white;
	width: 200px;
	cursor: pointer;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;


export const LookUp = () => {
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState("");

  const lookUp = () => setQueried(query) 

  const reverse = !isNaN(parseInt(queried));

  const result = queried? <DomainResolver query={queried} reverse={reverse} /> : null;

  return (
    <Container data-testid="look-up">
      <Input
        data-testid="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button data-testid="lookup-button" onClick={lookUp}>
		<FeatherIcon icon="search" size="22" />
        Look up
      </Button>
	  { result }
    </Container>
  );
};

