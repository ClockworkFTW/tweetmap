import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchTweets } from "../../reducers/tweetsReducer";

const Container = styled.div`
	z-index: 10;
	position: absolute;
	top: 20px;
	left: 20px;
	display: flex;
	background: #2d3539;
	border-left: 1px solid #454d51;
	border-top: 1px solid #454d51;
	border-bottom: 1px solid #000000;
	border-right: 1px solid #000000;
	border-radius: 5px;
	overflow: hidden;
`;
const Input = styled.input`
	width: ${props => props.width};
	padding: 10px;
	font-family: inherit;
	font-size: 14rem;
	color: #ffffff;
	border-top: none;
	border-left: none;
	border-bottom: none;
	border-right: 1px solid #000000;
	background: none;
	outline: none;
	&::placeholder {
		color: #c9d1d1;
	}
`;
const Button = styled.button`
	padding: 10px;
	font-family: inherit;
	color: #c9d1d1;
	background: none;
	border-top: none;
	border-left: 1px solid #454d51;
	border-bottom: none;
	border-right: none;
	outline: none;
	&:hover {
		cursor: pointer;
		color: #ffffff;
	}
`;
const Icon = styled(FontAwesomeIcon)`
	font-size: 16rem;
`;

const Search = ({ fetchTweets }) => {
	const [term, setTerm] = useState("");
	// const [requests, setRequests] = useState(1);

	return (
		<Container>
			<Input
				type="text"
				placeholder="Search Tweets..."
				value={term}
				onChange={event => setTerm(event.target.value)}
				width="150px"
			/>
			{/* <Input
				type="number"
				value={requests}
				onChange={event => setRequests(event.target.value)}
				width="50px"
			/> */}
			<Button onClick={() => fetchTweets(term, 3)}>
				<Icon icon={["fas", "search"]} />
			</Button>
		</Container>
	);
};

export default connect(null, { fetchTweets })(Search);
