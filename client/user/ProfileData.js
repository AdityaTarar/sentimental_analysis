import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";
import FollowProfileButton from "./../user/FollowProfileButton";
import ProfileTabs from "./../user/ProfileTabs";
import { listByUser } from "./../post/api-post.js";

import Sentiment from "sentiment";
const sentiment = new Sentiment();

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: "1em",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

export default function ProfileData({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState([]);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        let following = checkFollow(data);
        setValues({ ...values, user: data, following: following });
        loadPosts(data._id);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == jwt.user._id;
    });
    return match;
  };
  const loadPosts = (user) => {
    listByUser(
      {
        userId: user,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
        {
          data.map((user) => setPhrase(user.text));
        }
      }
    });
  };

  const photoUrl = values.user._id
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";
  if (values.redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  const [phrase, setPhrase] = useState("");
  const [sentimentScore, setSentimentScore] = useState("");

  useEffect(() => {
    setSentimentScore(sentiment.analyze(phrase));
  }, [phrase]);
  console.log(sentimentScore);
  return (
    <Paper className={classes.root} elevation={4}>
      <div>
        {sentimentScore !== null ? (
          <h1>Sentiment Analysis Score: {sentimentScore.score}</h1>
        ) : (
          ""
        )}

        {sentimentScore ? (
          sentimentScore.score === 0 ? (
            <h3>happy</h3>
          ) : sentimentScore.score > 0 ? (
            <h3>So haapy</h3>
          ) : (
            <h3>not happy</h3>
          )
        ) : (
          ""
        )}
      </div>

      <ProfileTabs user={values.user} posts={posts} score={true} />
      {/* <PostList user={values.user} removeUpdate={props.removePostUpdate} posts={props.posts}/> */}
    </Paper>
  );
}
