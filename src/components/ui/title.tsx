import React from 'react';

interface TitleProps {
	name: string;
}

const Title: React.FC<TitleProps> = ({ name }) => {
	return <h1 className="font-medium text-4xl m-4">{name}</h1>;
};

export default Title;
