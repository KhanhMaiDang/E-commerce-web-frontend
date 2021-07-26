import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Star from '../components/Star';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const [selectedStar, setSelectedStar] = useState(0);

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const convertToString = (price) => {
        return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }

    const handleSelectStar = (star) => { setSelectedStar(star) }

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <div>
                            <div className="row top" >
                                <div className="col-2">
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
                                            Price: {convertToString(product.price)}
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

                                    <Star onSelectStar={handleSelectStar} defaultStar={selectedStar} />
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>


    )
}
