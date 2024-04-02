import React from 'react';
import Slider from './SliderThing.jsx';
const Genre = ({genre,shows}) => {

    return (
        <div className='flex flex-col w-11/12 mb-16 '>
            <h1 className='text-3xl mb-5 font-bold text-glowy-pink alegreya-normal'>
                {genre}
            </h1>
            <Slider shows={shows}/>
        </div>
    );
}

export default Genre;