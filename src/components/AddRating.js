import React, { useState } from 'react'
import Star from './Star'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function AddRating({ bookId, onNewRatingAdded }) {
    const [selectedStar, setSelectedStar] = useState(0);
    const [comment, setComment] = useState('');
    //const [error, setError] = useState(false);
    const history = useHistory();

    const handleSelectStar = (star) => { setSelectedStar(star) }

    const submitRating = () => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user.token;
        console.log(user);
        console.log(token);
        console.log(bookId);
        axios.post(`/api/bookstore/user/books/${bookId}/rating`, { star: selectedStar, comment },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => onNewRatingAdded?.(res.data));

    }

    const submitHandler = () => {
        if (comment !== '' && selectedStar !== 0) {
            if (localStorage.getItem('userInfo'))
                submitRating();
            else {
                history.push('/signin');
            }
        }
        else {
            alert("You must enter the comment and star must not be 0")
        }
    }

    return (
        <div className="card card-body">
            <Star onSelectStar={handleSelectStar} defaultStar={selectedStar} />
            {/* <form className={classes.root} noValidate autoComplete="off"> */}

            <TextField
                label="Comment"
                id="outlined-size-normal"
                variant="outlined"
                inputProps={{ style: { fontSize: 17 } }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <button className="primary" type="submit" style={{ marginLeft: 10 }} onClick={submitHandler}>
                Send
            </button>

        </div>
    )
}
