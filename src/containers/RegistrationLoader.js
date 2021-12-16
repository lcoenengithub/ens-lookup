import { useState, useEffect } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { GET_REGISTRATION } from '../queries';

import { Registration } from '../components';

export const RegistrationLoader = ({ id, resolvedAddress }) => {
  const { data, loading, error } = useQuery(GET_REGISTRATION, {
    variables: { id },
  });
  const { registration } = data || {};

  return (
    <div>
      {error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        <Registration {...registration} resolvedAddress={resolvedAddress} />
      ) : null}
    </div>
  );
};

