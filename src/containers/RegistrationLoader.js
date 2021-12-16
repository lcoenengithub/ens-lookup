import { useState, useEffect } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { GET_REGISTRATION } from '../queries';

import styled from 'styled-components';

import { Registration } from '../components';

const Loader = styled.div`
	margin-left:8px;
	width:100%;
`

export const RegistrationLoader = ({ id, resolvedAddress }) => {
  const { data, loading, error } = useQuery(GET_REGISTRATION, {
    variables: { id },
  });
  const { registration } = data || {};

  return (
    <Loader>
      {error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        <Registration {...registration} />
      ) : null}
    </Loader>
  );
};

