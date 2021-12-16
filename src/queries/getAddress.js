import { gql } from "@apollo/client";

export const GET_ADDRESS = gql`
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
