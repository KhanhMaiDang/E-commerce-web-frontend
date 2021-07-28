import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import AddRating from '../components/AddRating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import RatingList from '../components/RatingList';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const [ratingList, setRatingList] = useState([]);

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        axios.get(`/api/bookstore/public/books/${productId}/ratings`)
            .then(response => { setRatingList(response.data) })
            .catch(reason => console.error(reason))
    }, [productId]);

    const convertToString = (price) => {
        return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }

    const handleNewRatingAdded = (rating) => {
        setRatingList(prev => [rating, ...prev])
    }

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
                                            <Rating rating={product.avgRating} numReviews={product.numReviews} />
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
                                    {
                                        (ratingList.length !== 0) ?
                                            <RatingList ratingList={ratingList} />
                                            : <h1>No review yet</h1>
                                    }
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

                                    <AddRating bookId={productId} onNewRatingAdded={handleNewRatingAdded} />

                                </div>
                            </div>
                        </div>
                    )
            }
        </div>


    )
}
