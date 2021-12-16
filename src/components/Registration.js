import { useState, useEffect } from "react";
import format from "date-fns/format";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import styled, { keyframes } from 'styled-components';
import { AddressResolver } from '../containers';

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

const FadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

const RegistrationBox = styled.div`
	border-top: 1px solid black;
	margin: 32px;
	width: 100%;
	 animation-name: ${FadeIn};
	 animation-duration: 1s;
`;

const Label = styled.div`
	min-width: 200px;
	width: 30%;
	color: black;
`;

export const Registration = ({
  registrant,
  registrationDate,
  expiryDate,
  domain,
}) => {

  return <RegistrationBox>
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
		<AddressResolver address={domain.resolvedAddress.id} />
    </Line>
    <Line>
		<Label>
			Registrant: 
		</Label>
		<AddressResolver address={registrant.id} />
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
}

