import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { GET_ADDRESS } from '../queries';

import { RegistrationLoader } from './RegistrationLoader';

export const DomainResolver = ({ query }) => {
  const { data, loading, error } = useQuery(GET_ADDRESS, { variables: { name: query }});

  return error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        !data.domains.length ? (
          <p>We could not find this domain</p>
        ) : (
          <>
            <RegistrationLoader id={data.domains[0].labelhash} resolvedAddress={data.domains[0].resolvedAddress.id} />
          </>
        )
      ) : null

}
