import { LookUp, RegistrationStream } from './containers';
import styled from 'styled-components';

const Title = styled.h1`
	font-size: 40px;
`;

const Subtitle = styled.h2`
	font-size: 30px;
`;

const App = () => (
  <>
	<Title>ENS Lookup</Title>
	<Subtitle>Search for an address or a domain name</Subtitle>
    <LookUp />
	<Subtitle>Latest registrations</Subtitle>
    <RegistrationStream />
  </>
);

export default App;
