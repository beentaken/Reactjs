import React from 'react';

export const AnotherComponent = ({ data }) => {
    console.log(data.role);
    return <div>{data.role}</div>;
};

