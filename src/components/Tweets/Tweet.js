import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FlyToInterpolator } from "react-map-gl";

import { setViewport } from "../../reducers/viewportReducer";
import { setFocus } from "../../reducers/focusReducer";

const Container = styled.div`
	display: flex;
	width: 100%;
	padding: 10px;
	border-left: 1px solid #454d51;
	border-top: 1px solid #454d51;
	border-right: 1px solid #000000;
	border-bottom: 1px solid #000000;
	transition: all 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		background: #454d51;
	}
`;

const Profile = styled.div`
	flex: 0 0 40px;
	height: 40px;
	margin-right: 10px;
	background-image: ${props => `url(${props.img})`};
	background-size: cover;
	border-radius: 5px;
	border: ${props => `2px solid ${props.color}`};
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

const Content = styled.div`
	width: 100%;
	overflow: hidden;
`;

const Name = styled.h1`
	font-size: 14rem;
	font-weight: 700;
	color: #ffffff;
`;

const ScreenName = styled.h3`
	margin: 5px 0px;
	font-size: 12rem;
	font-weight: 700;
	color: #1da1f3;
`;

const Text = styled.p`
	font-size: 12rem;
	line-height: 14rem;
	color: #c9d1d1;
`;

const Image = styled.img`
	margin-top: 10px;
	width: 100%;
	height: auto;
	border-radius: 5px;
`;

const Tweet = ({ tweet, setFocus, setViewport, closed }) => {
	const { media } = tweet.entities;
	const { lat, lng } = tweet.location.results[0].geometry.location;
	const viewport = { latitude: lat, longitude: lng, zoom: 5 };
	return (
		<Container
			onMouseEnter={() => setFocus(tweet.id)}
			onMouseLeave={() => setFocus(null)}
			onClick={() =>
				setViewport({
					...viewport,
					transitionDuration: 1000,
					transitionInterpolator: new FlyToInterpolator()
				})
			}
		>
			<Profile
				img={tweet.user.profile_image_url}
				color={tweet.lang.color}
			/>
			{closed ? null : (
				<Content>
					<Name>{tweet.user.name}</Name>
					<ScreenName>@{tweet.user.screen_name}</ScreenName>
					<Text>{tweet.text}</Text>
					{media && <Image src={media[0].media_url_https} />}
				</Content>
			)}
		</Container>
	);
};

export default connect(null, { setFocus, setViewport })(Tweet);
