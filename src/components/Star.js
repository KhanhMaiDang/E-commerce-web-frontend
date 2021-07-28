import React, { useRef, useState } from 'react'

export default function Star({ onSelectStar, defaultStar = 0 }) {
    const [previewStar, setPreviewStar] = useState(defaultStar);

    const stars = useRef([1, 2, 3, 4, 5]).current;

    const handleMouseEnter = (star) => {
        setPreviewStar(star)
    }


    return (
        <div className="rating" onMouseLeave={() => setPreviewStar(defaultStar)}>
            {
                stars.map((star) =>

                    <span key={star} onMouseEnter={() => handleMouseEnter(star)} onClick={() => onSelectStar?.(star)}>
                        <i className={star <= previewStar ? "fa fa-star" : 'fa fa-star-o'} ></i>
                    </span>
                )
            }
            <span></span>
        </div>
    )
}
