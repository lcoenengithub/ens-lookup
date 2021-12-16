import { gql } from "@apollo/client";

export const GET_REGISTRATION = gql`
  query GetRegistration($id: String) {
    registration(id: $id) {
      registrant {
        id
      }
      registrationDate
      expiryDate
	  domain {
		  resolvedAddress { id }
		  name
	  }
    }
  }
`;


