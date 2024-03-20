"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image';
import classes from './image-picker.module.css'

function ImagePicker({ label, name }) {

    const [pickedImage, setPickedImage] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);

        // setPickedImage(null);

    }

    const imageInputRef = useRef();

    const ImagePickHandler = () => {
        imageInputRef.current.click();
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && (<p>No image is picked</p>)}
                    {pickedImage && (<Image src={pickedImage} alt='Image which ever is picked by user' fill />)}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    name={name}
                    id={name}
                    accept='image/png, image/jpg'
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    required />
                <button className={classes.button} type='button' onClick={ImagePickHandler}>Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker