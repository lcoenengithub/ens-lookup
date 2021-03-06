import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import { LookupContextProvider } from './contexts/lookupContext';

const ENS_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

const client = new ApolloClient({
  uri: ENS_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

const Layout = styled.div`
    font-family: 'Quicksand', sans-serif;
	max-width: 800px;
	margin: auto;
`;

ReactDOM.render(
  <React.StrictMode>
	<LookupContextProvider>
		<ApolloProvider client={client}>
			<Layout>
			  <App />
			</Layout>
		</ApolloProvider>
	</LookupContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
