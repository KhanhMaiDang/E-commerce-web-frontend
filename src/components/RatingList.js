import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Star from './Star';
import StarReadOnly from './StarReadOnly';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '40ch',
        backgroundColor: theme.palette.background.paper,
        fontSize: 15,
    },
    inline: {
        display: 'inline',
    },
}));

export default function RatingList({ ratingList }) {
    const classes = useStyles();
    useEffect(() => {
        console.log(ratingList);
    }, [ratingList]);

    return (
        <List className={classes.root}>
            {ratingList.map((rating, index) =>
                <div key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            //primary="Brunch this weekend?"
                            disableTypography
                            primary={<StarReadOnly ratingStar={rating.star} />}
                            secondary={
                                <React.Fragment>
                                    {`${rating.comment} — `}
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {rating.nameOfUser}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <ListItemText>{`${rating.updatedAt}`}</ListItemText>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            )
            }
        </List>
    )
}
