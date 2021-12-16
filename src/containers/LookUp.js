import { useState, useEffect, useContext } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import FeatherIcon from 'feather-icons-react';
import styled from 'styled-components';

import { LookupContext } from '../contexts/lookupContext';

import { AddressResolver, DomainResolver } from '.';


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
	display: flex;
	flex-direction: rox;
	justify-content: space-around;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Query = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-left: 64px;
`;


export const LookUp = () => {
  
  const { lookUp: lookUpInContext, reverse, queried, query, setQuery } = useContext(LookupContext);

  const result = queried? <DomainResolver query={queried} reverse={reverse} /> : null;

   const lookUp = () => lookUpInContext(query)

  return (
    <Container data-testid="look-up">
		<Query>
      <Input
        data-testid="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button data-testid="lookup-button" onClick={lookUp}>
		<FeatherIcon icon="search" size="22" />
        Look up
      </Button>
	  </Query>
	  { result }
    </Container>
  );
};

