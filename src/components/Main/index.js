import React from "react";
import styled from "styled-components";

import Search from "./Search";
import Map from "./Map";
import Filter from "./Filter";
import Loading from "./Loading";

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
`;

const Logo = () => {
	return (
		<Container>
			<Search />
			<Map />
			<Filter />
			<Loading />
		</Container>
	);
};

export default Logo;
