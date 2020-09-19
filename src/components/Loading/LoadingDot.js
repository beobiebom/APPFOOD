import React from 'react';
import {DotIndicator} from 'react-native-indicators'

const LoadingDot=({size,color,count})=>{
    return(
        <DotIndicator size={size} color={color} count={count||3}/>
    )
}
export default LoadingDot;