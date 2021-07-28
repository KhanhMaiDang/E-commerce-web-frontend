import React, { useEffect } from 'react'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listFeatureProducts, listProducts } from '../actions/productActions';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productListFeature);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listFeatureProducts());
    }, [dispatch])
    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : <div className="row center">
                        {products.map(product => (
                            <Product key={product.id} product={product}></Product>
                        ))
                        }
                    </div>
            }

        </div>
    )
}
