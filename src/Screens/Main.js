import React, { useState, useRef } from 'react'

import Carousel from '../Components/Carousel'

export default function Main() {
    const [slides, setSlides] = useState(2);
    const [infinite, setInfinite] = useState(false);
    const slideCount = useRef(0);
    const infiniteCheckbox = useRef(true);

    const onSubmit = (e) => {
        e.preventDefault();
        setSlides(slideCount.current.value === '' ? 2 : parseInt(slideCount.current.value));
        setInfinite(infiniteCheckbox.current.checked);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1rem',
                marginBottom: '1rem',
            }}
        >
            <form>
                <label style={{ marginRight: "1rem" }}>Number of slides</label>
                <input type="number" ref={slideCount} />
                <input name="infinite" type="checkbox" value="true" ref={infiniteCheckbox} /> Infinite
                <h1>slides {slides}</h1>
                <button onClick={onSubmit}>Submit</button>
            </form>
            <Carousel slides={slides} infinite={infinite} />
        </div>
    )
}
