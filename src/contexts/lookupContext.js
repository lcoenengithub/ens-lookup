import { useState, createContext } from 'react';

export const LookupContext = createContext();

export const LookupContextProvider = ({ children }) => {

  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState("");

  const lookUp = (query) => {
	  setQuery(query)
	  setQueried(query) 
  }

  const reverse = !isNaN(parseInt(queried));


	return <LookupContext.Provider value={{ queried, lookUp, reverse, query, setQuery }}>
		{children}
	</LookupContext.Provider>
}
