import { gql } from "@apollo/client";
import { N_PER_PAGE } from  '../constants';


export const GET_REGISTRATIONS_STREAM = gql`
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
