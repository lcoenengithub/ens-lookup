
import { gql } from "@apollo/client";


export const GET_REVERSE_REGISTRATION = gql`
	query ReverseLookup($registrant: String) {
	  registrations(where: { registrant: $registrant }) {
		domain { name }
		registrant { id }
		expiryDate
		registrationDate
	  }
	}
`;

