import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
	z-index: 100;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #1da1f2;
`;
const Container = styled.div`
	text-align: center;
`;
const Title = styled.div`
	font-family: "Modak", cursive;
	font-size: 80rem;
	color: #ffffff;
`;
const Icon = styled(FontAwesomeIcon)`
	font-size: 80rem;
	color: #ffffff;
`;

const Splash = () => {
	return (
		<Wrapper>
			<Container>
				<Title>TweetMap</Title>
				<Icon icon={["fab", "twitter"]} />
			</Container>
		</Wrapper>
	);
};

export default Splash;
