import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
	z-index: 5;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(29, 161, 242, 0.5);
`;

const Container = styled.div`
	width: 300px;
	padding: 20px;
	border-radius: 10px;
	background: #2d3539;
	border-top: 1px solid #454d51;
	border-left: 1px solid #454d51;
	border-bottom: 1px solid #000000;
	border-right: 1px solid #000000;
`;

const Content = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
	font-size: 35rem;
	color: #ffffff;
`;

const Status = styled.div`
	margin-left: 15px;
`;

const Header = styled.div`
	margin-bottom: 10px;
	font-size: 14rem;
	font-weight: 700;
	color: #ffffff;
`;

const Message = styled.h1`
	font-size: 12rem;
	color: #c9d1d1;
`;

const Progress = styled.div`
	position: relative;
	width: 100%;
	height: 15px;
	border-radius: 100px;
	background: #454d51;
	overflow: hidden;
`;

const Bar = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	bottom: 0px;
	width: ${props => `${props.width * 100}%`};
	background: #2296f3;
`;

const Loading = ({ pending }) => {
	return pending.status ? (
		<Wrapper>
			<Container>
				<Content>
					<Icon icon={["fab", "twitter"]} />
					<Status>
						<Header>Loading</Header>
						<Message>{pending.message}...</Message>
					</Status>
				</Content>
				<Progress>
					<Bar width={pending.progress} />
				</Progress>
			</Container>
		</Wrapper>
	) : null;
};

const mapStateToProps = state => ({ pending: state.tweets.pending });

export default connect(mapStateToProps)(Loading);
