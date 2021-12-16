import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { GET_ADDRESS, GET_REVERSE_DOMAIN } from '../queries';

import { RegistrationLoader } from './RegistrationLoader';

export const DomainResolver = ({ query, reverse }) => {
 const { data, loading, error } = useQuery(reverse? GET_REVERSE_DOMAIN : GET_ADDRESS, { variables: {  query }});

  return error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        !data.domains.length ? (
          <p>We could not find this domain</p>
        ) : (
          <>
            <RegistrationLoader id={data.domains[0].labelhash} />
          </>
        )
      ) : null

}
