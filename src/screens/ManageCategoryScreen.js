import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateCategory, deleteCategory, listProductCategories } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ManageCategoryScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const categorySave = useSelector(state => state.categoryCreateOrUpdate);
    const { loading: loadingSave, error: errorSave, success: successSave } = categorySave;

    const categoryDelete = useSelector(state => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

    const dispatch = useDispatch();
    const productCategoryList = useSelector(state => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

    useEffect(() => {
        if (successSave) {
            // alert("Category is saved successfully")
            setModalVisible(false);
        }
        dispatch(listProductCategories());

    }, [dispatch, successSave, successDelete])

    // useEffect(() => {
    //     if (successSave) {
    //         alert("Category is saved successfully")
    //     }

    // }, [successSave])

    // useEffect(() => {
    //     if (successDelete) {
    //         alert("Category is deleted successfully")
    //     }

    // }, [successDelete])


    const openModal = (category) => {
        setModalVisible(true);
        setId(category.id);
        setName(category.name);
        setDescription(category.description);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // if (id)
        dispatch(createOrUpdateCategory({ id, name, description }));
        //else put request
    }

    const deleteHandler = (category) => {
        dispatch(deleteCategory(category.id));
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Categories</h3>
                <button className="button primary" onClick={() => openModal({})}>Create category</button>
            </div>
            {modalVisible &&
                <div>
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h1>{id ? "Update category" : "Create category"}</h1>
                        </div>
                        {loadingSave && <LoadingBox></LoadingBox>}
                        {errorSave && <MessageBox variant="danger">{errorSave}</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter category name" required
                                onChange={e => setName(e.target.value)} value={name}></input>
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" placeholder="Enter description" required
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
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

            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loadingCategories ? <LoadingBox></LoadingBox> : errorCategories ? <MessageBox variant="danger">{errorCategories}</MessageBox>
                                : categories?.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <button className="button" onClick={() => openModal(category)}>
                                                Edit
                                            </button>{' '}
                                            <button
                                                className="button"
                                                onClick={() => deleteHandler(category)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                                )
                        }
                    </tbody>
                </table>
            </div>

        </div >
    )
}
