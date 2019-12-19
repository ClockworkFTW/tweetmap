import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import twitterServices from "./services/twitter";

import Splash from "./components/Splash";
import Main from "./components/Main";
import Tweets from "./components/Tweets";

library.add(fas, fab);

const GlobalStyle = createGlobalStyle`
  html {
	box-sizing: border-box;
	font-family: 'Open Sans', sans-serif;
	font-size: 1px;
	-webkit-font-smoothing: antialiased;
	background: #2d3539;
  }
  *, *:before, *:after {
  	box-sizing: inherit;
  }
`;

const Container = styled.div`
	display: flex;
`;

const App = () => {
	useEffect(() => {
		twitterServices.getToken();
	}, []);

	return (
		<>
			<GlobalStyle />
			<Container>
				<Main />
				<Tweets />
			</Container>
			{/* <Splash /> */}
		</>
	);
};

export default App;
