import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateProduct, createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ManageProductScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [remaining, setRemaining] = useState(100);
    const [image, setImage] = useState('');
    const [imageB64, setImageB64] = useState('');

    const productSave = useSelector(state => state.productCreateOrUpdate);
    const { loading: loadingSave, error: errorSave, success: successSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            // alert("Product save successfully")
            setModalVisible(false);
        }
        dispatch(listProducts());

    }, [dispatch, successSave, successDelete])

    const openModal = (product) => {
        setModalVisible(true);
        setId(product.id);
        setName(product.name);
        setAuthor(product.author);
        setPublisher(product.publisher);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setRemaining(product.remaining);
        setImageB64(product.image);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (image) {
            formData.append("file", image);
        }
        // if (id)
        dispatch(createOrUpdateProduct({ id, name, author, publisher, description, category, price, remaining }, formData));
        //else put request
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product.id));
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={() => openModal({})}>Create product</button>
            </div>
            {modalVisible &&
                <div>
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h1>{id ? "Update product" : "Create product"}</h1>
                        </div>
                        {loadingSave && <LoadingBox></LoadingBox>}
                        {errorSave && <MessageBox variant="danger">{errorSave}</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter product name" required
                                onChange={e => setName(e.target.value)} value={name}></input>
                        </div>

                        <div>
                            <label htmlFor="author">Author</label>
                            <input type="text" id="author" placeholder="Enter author" required
                                onChange={e => setAuthor(e.target.value)} value={author}></input>
                        </div>
                        <div>
                            <label htmlFor="publisher">Publisher</label>
                            <input type="text" id="publisher" placeholder="Enter publisher" required
                                onChange={e => setPublisher(e.target.value)} value={publisher}></input>
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" placeholder="Enter description" required
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category" placeholder="Enter category" required
                                onChange={e => setCategory(e.target.value)} value={category}></input>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" placeholder="Enter price" required
                                onChange={e => setPrice(e.target.value)} value={price}></input>
                        </div>
                        <div>
                            <label htmlFor="remaining">Remaining</label>
                            <input type="number" id="remaining" placeholder="Enter remaining" required
                                onChange={e => setRemaining(e.target.value)} value={remaining}></input>
                        </div>
                        {/* style={[id ? { display: 'visibility' } : { display: "none" }, { cursor: 'pointer' }, { color: 'green' }]} */}
                        <div>
                            <button type='button' className="button" style={id ? { display: 'visibility' } : { display: "none" }}>
                                <label htmlFor="image">Select image</label>
                            </button>
                            <input type="file" id="image" placeholder="Enter image"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                    console.log(e.target.files[0].name)
                                }} style={id ? { display: "none" } : { display: 'visibility' }}></input>
                            {
                                imageB64 ? <img src={`data:image/jpg;base64, ${imageB64}`} alt={name}
                                    style={id ? { display: 'visibility' } : { display: "none" }} />
                                    : (<h2 style={id ? { display: 'visibility' } : { display: "none" }} >No file chosen</h2>)
                            }
                        </div>

                        <div>
                            <label />
                            <button className="primary" type="submit"> {id ? "Update" : "Create"}</button>
                            <label />
                            <button className="button secondary" type="button" onClick={() => setModalVisible(false)}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            }
            {/* <div>
                <StickyHeadTable />
            </div> */}
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Remaining</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.remaining}</td>
                                <td>{product.createdAt}</td>
                                <td>{product.updatedAt}</td>
                                <td>
                                    <button className="button" onClick={() => openModal(product)}>
                                        Edit
                                    </button>{' '}
                                    <button
                                        className="button"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >
    )
}
