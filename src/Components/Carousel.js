import React, { useState, useEffect } from 'react'
import style from "../carousel.module.css";
import Image from './Image';
import LinkedList from '../LinkedList';


export default function Carousel({ slides, infinite }) {

    const [nextButton, setNextButton] = useState(false);
    const [preButton, setPrevButton] = useState(false);

    const [list, setList] = useState(null);
    const [current, setCurrent] = useState(null);


    const getSlides = () => {
        fetch(`http://localhost:3600/api/carousel/?slides=${slides}`)
            .then((response) => response.json())
            .then((data) => {
                // add items to the linked list
                const linkedList = new LinkedList();
                data?.forEach((item, index) => {
                    linkedList.append(item);
                })
                setList(linkedList);
                setCurrent(linkedList.get(0));
                console.log("count:", linkedList.getCount());
                console.log("position:", linkedList.get(0).value);
            });
    }


    useEffect(() => {
        getSlides();
        setNextButton(false);
        setPrevButton(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides, infinite]);


    const prevSlide = () => {
        if (list?.count === 1 && current?.count === 1) {
            setPrevButton(true);
            return;
        } else if (infinite) { // go reversely to the previous node
            const prev = current.prev;
            setCurrent(prev);
        }

    }

    const nextSlide = () => {
        if (list?.count === 1 && current?.count === 1) {
            setNextButton(true);
            return;
        } else if (infinite) { // go forward to the next node
            const next = current.next;
            setCurrent(next);
        }
    }





    return (
        <div className={style.slideshowContainer}>
            <button onClick={prevSlide} disabled={preButton}>
                {"<<"}
            </button>
            <Image value={current?.value} index={current?.count} />
            <button onClick={nextSlide} disabled={nextButton}>
                {">>"}
            </button>
        </div>
    )
}
