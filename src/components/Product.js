import React from 'react'
import Rating from './Rating'

export default function Product(props) {
    const { product } = props
    let price = (product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
    return (
        <div key={product._id} className="card">
            <a href={`/product/${product.id}`}>
                <img className="large" src={`data:image/jpg;base64, ${product.image}`} alt={product.name} />
            </a>
            <div className="card-body">
                <a href={`/product/${product.id}`}>
                    <h2>{product.name}</h2>
                </a>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}>
                </Rating>
                <div className="price">{price}</div>
            </div>
        </div>
    )
}
