import React, { useState, useEffect } from 'react'
import style from "../carousel.module.css";
import Image from './Image';
import LinkedList from '../LinkedList';


export default function Carousel({ slides, infinite }) {

    const [nextButton, setNextButton] = useState(false);
    const [preButton, setPrevButton] = useState(false);

    const [list, setList] = useState(null);
    const [size, setSize] = useState(1);
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
                setSize(linkedList.getCount());
                setCurrent(linkedList.getHead());
            });
    }


    useEffect(() => {
        getSlides();
        setNextButton(false);
        setPrevButton(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides, infinite]);


    const prevSlide = () => {
        if (list !== null) {
            // infine or not
            const prev = current?.prev;
            if (infinite) {
                // get the next item in the list
                if (prev === null || prev === undefined) {
                    setCurrent(list.getLast());
                } else {
                    setCurrent(prev);
                }
            } else {
                if (size < list?.getCount() && prev !== null) {
                    setSize((prev) => prev + 1);
                    setCurrent(prev);
                } else {
                    setPrevButton(true);
                    return;
                }
            }
        } else {
            setPrevButton(true);
            return;
        }

    }

    const nextSlide = () => {
        if (list !== null) {
            // infine or not
            const next = current?.next;
            if (infinite) {
                setCurrent(next);
            } else {
                if (size > 1) {
                    setSize((prev) => prev - 1);
                    setCurrent(next);
                } else {
                    setNextButton(true);
                    return;
                }
            }

        } else {
            setNextButton(true);
            return;
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
