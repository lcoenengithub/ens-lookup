import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import styled from 'styled-components';

import { Registration } from '../components';
import { GET_REGISTRATIONS_STREAM } from  '../queries';
import { N_PER_PAGE } from  '../constants';

const Paginator = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 32px;
	font-size: 22px;
`;

const Link = styled.div`
	cursor: pointer;
	visibility: ${props => props.active? `visible` : `hidden`}
`;

export const RegistrationStream = () => {
  const [ page, setPage ] = useState(0);
  const [loadRegistrationsStream, { data, loading, error }] = useLazyQuery(GET_REGISTRATIONS_STREAM, {
	pollInterval: 10000
  });

  useEffect(() => {
	loadRegistrationsStream({ variables: { skip: page * N_PER_PAGE } });
  }, [loadRegistrationsStream, page])

  const previousPage = () => setPage(page > 0 ? page - 1 : 0)
  const nextPage = () => setPage(page + 1)

  return (
    <div data-testid="registration-stream">
      {error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        !data.registrations.length ? (
          <p>We could not find this domain</p>
        ) : <>{
          data.registrations.map((registration) => (
            <Registration {...registration} />
          ))}
	  <Paginator data-testid="paginator">
		<Link data-testid="previous-page" onClick={previousPage} active={page !== 0}>
			&lt; Previous 		
		</Link>

		<div data-testid="current-page">
			Page { page + 1 }  		
		</div>

		<Link data-testid="next-page" onClick={nextPage} active={true}>
			Next &gt; 	
		</Link>
	  </Paginator>
		  </>
      ) : null}
    </div>
  );
};
