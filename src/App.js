import { useState } from "react";
import  format  from "date-fns/format";
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
	  registration(id: $id ){
		registrant {
		  id
		}
		registrationDate
		expiryDate
		labelName
	  }
	}
`;

const formatTimestamp = timestamp => format(new Date(parseInt(timestamp * 1000)), 'dd/MM/yyyy') 

const RegistrationData = ({ id }) => {
  const { data, loading, error } = useQuery(GET_REGISTRATION, { variables: { id } });
	return <div>	
	  {error ? (
		<p>Error: {error?.message}</p>
	  ) : loading ? (
		<p data-testid="loading">Loading</p>
	  ) : data ? (
		  <>
			<div>Registrant: <span data-testid="registrant">{data.registration.registrant.id}</span></div>
			<div>Registration date: <span data-testid="registration-date">{formatTimestamp(data.registration.registrationDate)}</span></div>
			<div>Expiration date: <span data-testid="expiry-date">{formatTimestamp(data.registration.expiryDate)}</span></div>
		  </>
	  ) : null
	  }
  </div>

}

const App = () => {
  const [query, setQuery] = useState("");
  const [resolveName, { data, loading, error }] = useLazyQuery(GET_ADDRESS);

  const resolve = () => {
    resolveName({ variables: { name: query } });
  };

  return (
    <div>
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
			  <p>
				Resolved to
				<span data-testid="address">
				  {data.domains[0].resolvedAddress.id}
				</span>
			  </p>
				<RegistrationData id={data.domains[0].labelhash}/>
			</>
        )
      ) : null}
    </div>
  );
};

export default App;
