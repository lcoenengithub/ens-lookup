import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Registration } from '../components';
import { GET_REVERSE_REGISTRATION } from '../queries';

export const AddressResolver = ({ query }) => {
  const { data, loading, error } = useQuery(GET_REVERSE_REGISTRATION, { variables: { registrant: query }});
  return error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        !data.registrations.length ? (
          <p>We could not find any registration from this address</p>
        ) : (
          <>
			{data.registrations.map(registration => <Registration {...registration} />)}
          </>
        )
      ) : null

}

