import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ISO6391 from "iso-639-1";

import { setFilter } from "../../reducers/filterReducer";

const Wrapper = styled.div`
	z-index: 10;
	position: absolute;
	bottom: 20px;
	left: 20px;
	right: 20px;
	display: flex;
	background: #2d3539;
	border-top: 1px solid #454d51;
	border-left: 1px solid #454d51;
	border-bottom: 1px solid #000000;
	border-right: 1px solid #000000;
	border-radius: 5px;
	overflow: scroll;
`;

const Filter = ({ tweets, filter, setFilter }) => {
	let languages = [];
	let colors = [];

	tweets.forEach(tweet => {
		if (!languages.includes(tweet.lang.name)) {
			languages.push(tweet.lang.name);
			colors.push(tweet.lang.color);
		}
	});

	return tweets.length === 0 ? null : (
		<Wrapper>
			<Language
				language="all"
				tweets={tweets}
				color="#c9d1d1"
				filter={filter}
				setFilter={setFilter}
			/>
			{languages.map((language, index) => (
				<Language
					language={language}
					tweets={tweets}
					color={colors[index]}
					filter={filter}
					setFilter={setFilter}
				/>
			))}
		</Wrapper>
	);
};

const Container = styled.div`
	flex: 0 0 140px;
	display: flex;
	align-items: center;
	padding: 10px;
	border-left: 1px solid #454d51;
	border-right: 1px solid #000000;
	background: ${props => (props.active ? "#454d51" : "none")};
	transition: all 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		background: #454d51;
	}
`;
const Color = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 100px;
	border: 2px solid #ffffff;
	background: ${props => props.color};
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
const Count = styled.div`
	margin: 0px 5px 0px 10px;
	font-size: 14rem;
	font-weight: 700;
	color: #ffffff;
`;
const Name = styled.div`
	font-size: 12rem;
	color: #c9d1d1;
`;

const Language = ({ language, tweets, color, filter, setFilter }) => {
	const count =
		language === "all"
			? tweets.length
			: tweets.filter(tweet => tweet.lang.name === language).length;
	return (
		<Container
			onClick={() => setFilter(language)}
			active={filter === language}
		>
			<Color color={color} />
			<Count>{count}</Count>
			<Name>
				{language === "all" ? "All" : ISO6391.getName(language)}
			</Name>
		</Container>
	);
};

const mapStateToProps = state => ({
	tweets: state.tweets.data,
	filter: state.filter
});

export default connect(mapStateToProps, { setFilter })(Filter);
