import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CLEAR_REGISTERED_SUCCESS_MESSAGE, USER_SIGNOUT } from '../constants/userConstants';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const redirect = '/signin'
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleRegisteredSuccess = () => {
        history.push(redirect);
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and confirm password are not match")
        } else {
            dispatch(register(name, username, password, phoneNumber, handleRegisteredSuccess));
        }
    }

    // useEffect(() => {
    //     // if (registerMessage) {
    //     //     // alert(registerMessage);
    //     //     // console.log(registerMessage);
    //     //     props.history.push(redirect);
    //     // }

    //     props.history.push(redirect);

    // }, [props.history, redirect]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required
                        onChange={e => setName(e.target.value)} maxLength="50"></input>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter username" required
                        onChange={e => setUsername(e.target.value)} minLength="3" maxLength="20"></input>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)} minLength="6" maxLength="20"></input>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="Password" id="confirmPassword" placeholder="Re-enter your password" required
                        onChange={e => setConfirmPassword(e.target.value)} minLength="6" maxLength="20"></input>
                </div>

                <div>
                    <label htmlFor="phone">Phone number</label>
                    <input type="tel" id="phone" name="phone" placeholder="123-456-789" pattern="[0-9]{10}" required
                        onChange={e => setPhoneNumber(e.target.value)}></input>
                </div>

                <div>
                    <label />
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? {' '}
                        <Link to="/signin">Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
