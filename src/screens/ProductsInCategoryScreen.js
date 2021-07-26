import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';


export default function ProductsInCategoryScreen(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/bookstore/public/categories/${props.match.params.id}/books`);
                setLoading(false);
                setProducts(data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();


    }, [props.match.params.id]);

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <div>
                            <div className="row center">
                                {products.map(product => (
                                    <Product key={product.id} product={product}></Product>
                                ))
                                }
                            </div>
                        </div>)
            }

        </div>
    )
}



