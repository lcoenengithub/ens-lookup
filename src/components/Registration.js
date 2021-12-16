import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import ReactTooltip from 'react-tooltip';

const formatTimestamp = (timestamp) =>
  format(new Date(parseInt(timestamp * 1000)), "dd/MM/yyyy hh:mm:ss");

const Line = styled.div`
	border-bottom: 1px solid black;
	padding: 16px;
	display: flex;
	flex-direction: row;
	justify-content: start;
	font-size: 18px;
	color: grey;
`;

const RegistrationBox = styled.div`
	border-top: 1px solid black;
	margin: 32px;
`;

const Label = styled.div`
	min-width: 200px;
	width: 30%;
	color: black;
`;

const AddressDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

const Icon = styled(FeatherIcon)`
	cursor: pointer;	
`;

const Address = ({ address }) => {
	const [ copied, setCopied ] = useState(false);
	const copy = (id) => {
		navigator.clipboard.writeText(id)	
		setCopied(true)
		console.log('oi')
	}

	const mouseOut = () => {
		setCopied(false)
	}


	return <AddressDiv>
      <span data-testid="registrant">{address}</span>
	<div>
		{
			!copied ? <Icon icon="copy" size="22"  data-tip="Copy" onClick={() => copy(address)} onMouseOut={mouseOut} /> : 
			 <Icon icon="check" size="22"  onClick={() => copy(address)} onMouseOut={mouseOut} /> 
		}
		<Icon icon="search" size="22"  data-tip="Lookup"  />
	</div>
	</AddressDiv>

}

export const Registration = ({
  registrant,
  registrationDate,
  expiryDate,
  domain,
	resolvedAddress
}) => {

	return <>
  <RegistrationBox>
    <Line>
		<Label>
		  Domain name:
	    </Label> 
		<span data-testid="domain-name">{domain.name}</span>
    </Line>
    <Line>
		<Label>
		  Resolved Adress:
	    </Label> 
		<Address address={resolvedAddress} />
    </Line>
    <Line>
		<Label>
			Registrant: 
		</Label>
		<Address address={registrant.id} />
    </Line>
    <Line>
		<Label>
		  Registration date:{" "}
		</Label>
      <span data-testid="registration-date">
        {formatTimestamp(registrationDate)}
      </span>
    </Line>
    <Line>
		<Label>
		  Expiration date:{" "}
		</Label>
      <span data-testid="expiry-date">{formatTimestamp(expiryDate)}</span>
    </Line>
  </RegistrationBox>
	<ReactTooltip />
	</>
}

