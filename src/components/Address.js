import { useState, useContext } from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import Identicon from 'react-identicons';
import ReactTooltip from 'react-tooltip';

const AddressDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	width: 100%;
	margin-left: 32px;
`;

const Icon = styled(FeatherIcon)`
	cursor: pointer;	
	margin: 8px;
`;

const Label = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 16px;
	margin-right: 16px;
	flex-grow: 4;
`;

const Main = styled.div`
	color: black;
`;

const Sub = styled.div`
	font-size: 12px;
`;

export const Address = ({ address, domain }) => {
	const [ copied, setCopied ] = useState(false);
	const copy = (id) => {
		navigator.clipboard.writeText(id)	
		setCopied(true)
	}

	const mouseOut = () => {
		setCopied(false)
	}


	return <AddressDiv>
		<Identicon string={address} size="22" />
		<Label>
      <Main data-testid="address">{domain || address}</Main>
      <Sub data-testid="address">{address}</Sub>
		</Label>
	<div>
		{
			!copied ? <Icon icon="copy" size="22"  data-tip="Copy" onClick={() => copy(address)} onMouseOut={mouseOut} /> : 
			 <Icon icon="check" size="22"  onClick={() => copy(address)} onMouseOut={mouseOut} /> 
		}
		<Icon icon="search" size="22"  data-tip="Lookup"  />
	</div>
		<ReactTooltip />
	</AddressDiv>

}

