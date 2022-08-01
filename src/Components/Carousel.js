import React, { useState, useEffect } from 'react'
import Title from './Title';
import SubTitle from './SubTitle';
import style from "./carousel.css";

export default function Carousel({ slides, infinite }) {
    const [images, setImages] = useState([]);

    const [currentImageIdx, setCurrentImagIdx] = useState(0);
    const [nextButton, setNextButton] = useState(false);
    const [preButton, setPrevButton] = useState(false);


    const getSlides = () => {
        fetch(`http://localhost:3600/api/carousel/?slides=${slides}`)
            .then((response) => response.json())
            .then((data) => setImages(data));
    };


    useEffect(() => {
        getSlides();
        setNextButton(false);
        setPrevButton(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides, infinite]);

    const prevSlide = () => {
        const resetToVeryBack = currentImageIdx === 0;

        const index = resetToVeryBack ? images.length - 1 : currentImageIdx - 1;

        setCurrentImagIdx(index);
        if (index === 0 && infinite) {
            setPrevButton(true);
        } else {
            setPrevButton(false);
        }

        if (index === images.length - 1 && infinite) {
            setNextButton(true);
        } else {
            setNextButton(false);
        }
    };

    const nextSlide = () => {
        const resetIndex = currentImageIdx === images.length - 1;

        const index = resetIndex ? 0 : currentImageIdx + 1;

        setCurrentImagIdx(index);

        if (index === 0) {
            setPrevButton(true);
        } else {
            setPrevButton(false);
        }

        if (index === images.length - 1) {
            setNextButton(true);
        } else {
            setNextButton(false);
        }
    };

    const activeImageSourcesFromState = images.slice(
        currentImageIdx,
        currentImageIdx + 1
    );

    const imageSourcesToDisplay =
        activeImageSourcesFromState.length < 3
            ? 
            activeImageSourcesFromState
            : activeImageSourcesFromState;




    return (
        <div style={{ marginTop: "1rem" }}>
            <button className={style.prev} onClick={prevSlide} disabled={preButton}>
                {"<<"}
            </button>
            {imageSourcesToDisplay?.map((image, index) => {
                return (
                    <span key={index}>
                        <Title title={image.title} />
                        <SubTitle title={image.subTitle} />
                        <img key={index} src={image?.image} alt={image.alt} />
                    </span>
                )
            }
            )}
            <button className={style.next} onClick={nextSlide} disabled={nextButton}>
                {">>"}
            </button>
        </div>
    )
}
