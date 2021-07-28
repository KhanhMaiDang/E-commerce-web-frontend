import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateCategory, deleteCategory, listProductCategories } from '../actions/productActions';
import { deleteUser, listCustomers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ManageCustomerScreen(props) {
    const [modalVisible, setModalVisible] = useState(true);
    // const [id, setId] = useState('');
    // const [name, setName] = useState('');

    // const categorySave = useSelector(state => state.categoryCreateOrUpdate);
    // const { loading: loadingSave, error: errorSave, success: successSave } = categorySave;

    const customerDelete = useSelector(state => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, successUserDelete: successDelete } = customerDelete;

    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const { loading: loadingUsers, error: errorUsers, users } = userList;

    useEffect(() => {
        if (successDelete) {
            // alert("Category is saved successfully")
            console.log(modalVisible)
            setModalVisible(false);
        }
        dispatch(listCustomers());

        // }, [dispatch, successSave, successDelete])
    }, [dispatch, successDelete, modalVisible])


    const deleteHandler = (customer) => {
        dispatch(deleteUser(customer.id));
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Customers</h3>

            </div>

            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loadingUsers ? <LoadingBox></LoadingBox> : errorUsers ? <MessageBox variant="danger">{errorUsers}</MessageBox>
                                : users?.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="button"
                                                onClick={() => deleteHandler(user)}
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
