
import { gql } from "@apollo/client";


export const GET_REVERSE_DOMAIN = gql`
	query ReverseLookup($query: String) {
		domains(where: { resolvedAddress: $query }) {
		  name
		  id
		  labelName
		  labelhash
		}

	}
`;

