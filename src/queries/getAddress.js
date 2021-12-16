import { gql } from "@apollo/client";

export const GET_ADDRESS = gql`
  query GetDomain($query: String) {
    domains(where: { name: $query }) {
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
