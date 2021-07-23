import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data'


export default function ProductScreen(props) {
    const product = data.products.find((x) => x.id === props.match.params.id);
    { console.log(product) };
    if (!product) {
        <div>Product Not Found</div>
    }
    let price = (product.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
    return (
        <div>
            <Link to="/">Back to result</Link>
            <div className="row top" >
                <div className="col-2">
                    {console.log(product.image)}
                    <img className="large" src={`data:image/jpg;base64, ${product.image}`} alt={product.name} />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            Author: {product.author}
                        </li>
                        <li>
                            Publisher: {product.publisher}
                        </li>
                        <li>
                            Category: {product.category}
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </li>
                        <li>
                            Price: {price}
                        </li>
                        <li>
                            Description:
                            <p>
                                {product.description}
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <div className="row">
                            <div>Status</div>
                            <div>
                                {product.remaining > 0 ? (
                                    <span className="success">In stock</span>
                                ) : (
                                    <span className="danger">Unavailable</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
