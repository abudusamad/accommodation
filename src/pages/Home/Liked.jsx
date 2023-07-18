import React, { useState } from "react";
import styled from "styled-components";

const HeartIcon = styled.span`
	color: ${(props) => (props.liked ? "red" : "gray")};
`;

const LikeButton = () => {
	const [liked, setLiked] = useState(false);

	const handleLikeClick = () => {
		setLiked(!liked);
	};

	return (
		<Button onClick={handleLikeClick}>
			<HeartIcon liked={liked}>&#9829;</HeartIcon>
			Like
		</Button>
	);
};

const Button = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	font-size: 16px;
	display: flex;
	align-items: center;
	padding: 4px;
`;

export default LikeButton;
