import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import auth from "./../auth/auth-helper";

export default function PostList(props) {
  console.log("props", props.sentimentScore);
  const jwt = auth.isAuthenticated();
  // console.log(jwt.user.name);
  return (
    <div style={{ marginTop: "24px" }}>
      {props.posts.map((item, i) => {
        return (
          <Post
            post={item}
            key={i}
            onRemove={props.removeUpdate}
            user={jwt.user.name}
          />
        );
      })}
    </div>
  );
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired,
};
