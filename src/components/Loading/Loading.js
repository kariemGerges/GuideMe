import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color}) => {

    const balls = 'balls';
    const colors = '#ffffff';
    return (
        <div className="loading">
             <ReactLoading type={balls} color={colors} height={'20%'} width={'20%'} />
        </div>
    );
};


export default Loading;