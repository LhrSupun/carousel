import React from 'react'
import Title from './Title';
import SubTitle from './SubTitle';

function Image({ value, index = 1 }) {
    return (
        <span key={index}>
            <Title title={value?.title} />
            <SubTitle title={value?.subTitle} />
            <img key={index} src={value?.image} alt={value?.alt} />
        </span>
    );
}

export default Image