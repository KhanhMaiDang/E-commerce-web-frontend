import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

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
            dispatch(register(name, username, password, phoneNumber, email, handleRegisteredSuccess));
        }
    }

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
                        onChange={e => {
                            let username = e.target.value;
                            if (username.trim().includes(" ")) {
                                console.log("www");
                                e.target.setCustomValidity("Username can not contains whitespace")
                            }
                            else {
                                e.target.setCustomValidity("");
                                setUsername(username.trim())
                            }
                        }} minLength="3" maxLength="20"></input>
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
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" required
                        onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="phone">Phone number</label>
                    <input type="tel" id="phone" name="phone" minLength="10" maxLength="10" required pattern="[0-9]{10}"
                        onChange={e => setPhoneNumber(e.target.value)}></input>
                    <small>Format: 0123456789 (10 numbers without characters)</small><br></br>
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
