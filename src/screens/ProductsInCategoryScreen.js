import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';


export default function ProductsInCategoryScreen(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const categoryList = useSelector(state => state.productCategoryList);
    const { categories } = categoryList;

    const getCategoryNameById = (() => {
        console.log(categories);
        const found = categories?.find(category => {
            console.log("catid" + category.id);
            console.log("propsid" + props.match.params.id);
            console.log("category.id === props.match.params.id")
            console.log(category.id == props.match.params.id);
            return category.id == props.match.params.id
        });
        console.log(found);
        return found;
    })

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
                            <h2>Description: {getCategoryNameById()?.description}</h2>
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



