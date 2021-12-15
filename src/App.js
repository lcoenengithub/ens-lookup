import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const GET_ADDRESS = gql`
  query GetDomain($name: String) {
    domains(where: { name: $name }) {
      name
      id
      labelName
      labelhash
      resolvedAddress {
        id
      }
    }
  }
`;

const GET_REGISTRATION = gql`
  query GetRegistration($id: String) {
    registration(id: $id) {
      registrant {
        id
      }
      registrationDate
      expiryDate
	  domain {
		  name
	  }
    }
  }
`;

const N_PER_PAGE = 3;

const GET_REGISTRATIONS_STREAM = gql`
  query RegistrationStream($skip: Int) {
    registrations(first: ${N_PER_PAGE}, skip: $skip, orderBy: registrationDate, orderDirection: desc) {
      id
      expiryDate
      registrationDate
      registrant {
        id
      }
	  domain {
		  name
	  }
    }
  }
`;

const formatTimestamp = (timestamp) =>
  format(new Date(parseInt(timestamp * 1000)), "dd/MM/yyyy");

const Registration = ({
  registrant,
  registrationDate,
  expiryDate,
  domain,
}) => (
  <>
    <div>
      Domain name: <span data-testid="domain-name">{domain.name}</span>
    </div>
    <div>
      Registrant: <span data-testid="registrant">{registrant.id}</span>
    </div>
    <div>
      Registration date:{" "}
      <span data-testid="registration-date">
        {formatTimestamp(registrationDate)}
      </span>
    </div>
    <div>
      Expiration date:{" "}
      <span data-testid="expiry-date">{formatTimestamp(expiryDate)}</span>
    </div>
  </>
);

const RegistrationLoader = ({ id }) => {
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
        <Registration {...registration} />
      ) : null}
    </div>
  );
};

const LookUp = () => {
  const [query, setQuery] = useState("");
  const [resolveName, { data, loading, error }] = useLazyQuery(GET_ADDRESS);

  const resolve = () => {
    resolveName({ variables: { name: query } });
  };

  return (
    <div data-testid="look-up">
      <input
        data-testid="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button data-testid="lookup-button" onClick={resolve}>
        Look up
      </button>
      {error ? (
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
      ) : null}
    </div>
  );
};

const RegistrationStream = () => {
  const [ page, setPage ] = useState(0);
  const [loadRegistrationsStream, { data, loading, error }] = useLazyQuery(GET_REGISTRATIONS_STREAM);

  useEffect(() => {
	loadRegistrationsStream({ variables: { skip: page * N_PER_PAGE } });
  }, [loadRegistrationsStream, page])

  const previousPage = () => setPage(page > 0 ? page - 1 : 0)
  const nextPage = () => setPage(page + 1)

  return (
    <div data-testid="registration-stream">
	  <h1>Latest registration</h1>
      {error ? (
        <p>Error: {error?.message}</p>
      ) : loading ? (
        <p data-testid="loading">Loading</p>
      ) : data ? (
        !data.registrations.length ? (
          <p>We could not find this domain</p>
        ) : (
          data.registrations.map((registration) => (
            <Registration {...registration} />
          ))
        )
      ) : null}
	  <div data-testid="paginator">
		<div data-testid="previous-page" onClick={previousPage}>
			&gt; Previous 		
		</div>

		<div data-testid="current-page">
			Page { page + 1 }  		
		</div>

		<div data-testid="next-page" onClick={nextPage}>
			&gt; Next		
		</div>
	  </div>
    </div>
  );
};

const App = () => (
  <>
    <LookUp />
    <RegistrationStream />
  </>
);

export default App;
