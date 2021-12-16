import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Registration, Address } from '../components';
import { GET_REVERSE_DOMAIN } from '../queries';

export const AddressResolver = ({ address }) => {
  const { data, loading, error } = useQuery(GET_REVERSE_DOMAIN, { variables: { query : address}});

  return error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
          <>
			<Address address={address} domain={data?.domains?.[0]?.name} />
          </>
      ) : null

}

