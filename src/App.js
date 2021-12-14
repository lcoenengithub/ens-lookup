import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

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
          <p>
            Resolved to
            <span data-testid="address">
              {data.domains[0].resolvedAddress.id}
            </span>
          </p>
        )
      ) : null}
    </div>
  );
};

export default App;
