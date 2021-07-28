import React, { useRef } from 'react'

export default function StarReadOnly({ ratingStar }) {

    const stars = useRef([1, 2, 3, 4, 5]).current;


    return (
        <div className="rating" >
            {
                stars.map((star) =>

                    <span key={star} >
                        <i className={star <= ratingStar ? "fa fa-star" : 'fa fa-star-o'} ></i>
                    </span>
                )
            }
            <span></span>
        </div>
    )
}
