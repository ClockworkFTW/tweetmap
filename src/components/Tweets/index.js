import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tweet from "./Tweet";

const Wrapper = styled.div`
	position: relative;
	flex: ${props => (props.closed ? "0 0 60px" : "0 0 300px")};
	height: 100vh;
`;

const Container = styled.div`
	z-index: 10;
	position: relative;
	width: 100%;
	height: 100%;
	background: #2d3539;
	overflow-y: scroll;
`;

const Toggle = styled.button`
	z-index: 10;
	position: absolute;
	left: -60px;
	top: 20px;
	width: 40px;
	height: 40px;
	border-top: 1px solid #454d51;
	border-left: 1px solid #454d51;
	border-bottom: 1px solid #000000;
	border-right: 1px solid #000000;
	border-radius: 5px;
	outline: none;
	background: #2d3539;
	color: #c9d1d1;
	transition: all 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		color: #ffffff;
		background: #454d51;
	}
`;

const Icon = styled(FontAwesomeIcon)`
	font-size: 16rem;
`;

const Tweets = ({ tweets }) => {
	const [closed, setClosed] = useState(false);
	return tweets.length === 0 ? null : (
		<Wrapper closed={closed}>
			<Toggle onClick={() => setClosed(!closed)}>
				<Icon
					icon={
						closed
							? ["fas", "chevron-left"]
							: ["fas", "chevron-right"]
					}
				/>
			</Toggle>
			<Container>
				{tweets.map(tweet => (
					<Tweet key={tweet.id} tweet={tweet} closed={closed} />
				))}
			</Container>
		</Wrapper>
	);
};

const filterTweets = ({ tweets, filter }) =>
	filter === "all"
		? tweets.data
		: tweets.data.filter(tweet => tweet.lang.name === filter);

const mapStateToProps = state => ({ tweets: filterTweets(state) });

export default connect(mapStateToProps)(Tweets);
