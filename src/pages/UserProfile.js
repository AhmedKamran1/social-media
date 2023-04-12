import React from "react";
import axios from "axios";
import Wrapper from "../components/wrapper/Wrapper";
import classes from "./UserProfile.module.css";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const users = JSON.parse(localStorage.getItem("users"));

const UserProfile = () => {
  // ek user ki state for friendreqsent/recieve/isfriends
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //filtering se karna  hai ye
  const userIndex = users.findIndex((user) => user.email === params.userId);
  const [viewingUser, setViewingUser] = useState(
    users.find((user) => user.email === params.userId)
  );
  const [{ friendRequests, friendList }] = users.filter(
    (user) => user.email === currentUser.email
  );
  // checking params then analyzing if request was sent to another person
  const friendRequestSent = viewingUser.friendRequests.some(
    (request) => request === currentUser.email
  );

  const friendRequestRecieved = friendRequests.some(
    (request) => request === viewingUser.email
  );

  const isFriends = friendList.some((friend) => friend === params.userId);
  //optional
  const profilePhotoHandler = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "zpzzsofa");

    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dhs1iquvc/image/upload",
      formData
    );
    const { url: profilePicUrl } = data.data;
    dispatch(
      authActions.profileUpdateHandler({
        type: "PROFILEPHOTO",
        profilePicUrl: profilePicUrl,
      })
    );
  };
  //optional
  const bgPhotoHandler = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "zpzzsofa");

    const data = await axios.post(
      "https://api.cloudinary.com/v1_1/dhs1iquvc/image/upload",
      formData
    );
    const { url: bgPicUrl } = data.data;
    dispatch(
      authActions.profileUpdateHandler({ type: "BGPHOTO", bgPicUrl: bgPicUrl })
    );
  };
  // currentUser state has to  be updated   using  dispatch
  const addFriendHandler = (event) => {
    const friendRequestIndex = viewingUser.friendRequests.findIndex(
      (request) => request === currentUser.email
    );
    if (friendRequestIndex === -1) {
      setViewingUser((viewingUser) => ({
        ...viewingUser,
        friendRequests: [...viewingUser.friendRequests, currentUser.email],
        friendList: [...viewingUser.friendList],
      }));
      users[userIndex].friendRequests.push(currentUser.email);
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const cancelRequestHandler = () => {
    const friendReqIndex = viewingUser.friendRequests.findIndex(
      (request) => request === currentUser.email
    );
    setViewingUser((viewingUser) => ({
      ...viewingUser,
      friendRequests: viewingUser.friendRequests.filter(
        (request) => request !== currentUser.email
      ),
      friendList: [...viewingUser.friendList],
    }));
    users[userIndex].friendRequests.splice(friendReqIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
  };

  //users(main array)
  //viewing user
  //current user{}

  const acceptRequestHandler = (event) => {
    const currentUserIndex = users.findIndex(
      (user) => user.email === currentUser.email
    );
    const friendReqIndex = friendRequests.findIndex(
      (request) => request === params.userId
    );
    users[currentUserIndex].friendRequests.splice(friendReqIndex, 1);

    setViewingUser((viewingUser) => ({
      ...viewingUser,
      friendRequests: viewingUser.friendRequests.filter(
        (request) => request !== currentUser.email
      ),
      friendList: [...viewingUser.friendList, params.userId],
    }));
    users[currentUserIndex].friendList.push(params.userId);
    users[userIndex].friendList.push(currentUser.email);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const declineRequestHandler = () => {
    const currentUserIndex = users.findIndex(
      (user) => user.email === currentUser.email
    );
    const friendReqIndex = friendRequests.findIndex(
      (request) => request === params.userId
    );
    users[currentUserIndex].friendRequests.splice(friendReqIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    navigate(`/profiles/${params.userId}`);
  };

  return (
    <Wrapper className={classes.userprofilecontainer}>
      <Wrapper className={classes.bgpiccontainer}>
        <Image
          className={classes.bgpic}
          cloudName="dhs1iquvc"
          publicId={
            params.userId === currentUser.email
              ? currentUser?.bgPhoto
              : viewingUser?.bgPhoto
          }
        />
        {params.userId === currentUser.email && (
          <Wrapper>
            <input
              className={classes.bgfile}
              type="file"
              name="profilephoto"
              onChange={bgPhotoHandler}
            />
          </Wrapper>
        )}
      </Wrapper>
      <Wrapper className={classes.profilepiccontainer}>
        <Image
          className={classes.profilepic}
          cloudName="dhs1iquvc"
          publicId={
            params.userId === currentUser.email
              ? currentUser?.profilePhoto
              : viewingUser?.profilePhoto
          }
        />
        {params.userId === currentUser.email && (
          <Wrapper>
            <input
              className={classes.profilefile}
              type="file"
              name="profilephoto"
              onChange={profilePhotoHandler}
            />
          </Wrapper>
        )}
      </Wrapper>
      {/*check  mujtaba work for  optimize */}
      <Wrapper className={classes.infocontainer}>
        {!friendRequestSent &&
          !friendRequestRecieved &&
          !isFriends &&
          currentUser.email !== params.userId && (
            <button onClick={addFriendHandler}>Add Friend</button>
          )}
        {friendRequestSent && (
          <button onClick={cancelRequestHandler}>Cancel Request</button>
        )}
        {friendRequestRecieved && (
          <>
            <button onClick={acceptRequestHandler}>Accept Request</button>
            <button onClick={declineRequestHandler}>Decline</button>
          </>
        )}
        {isFriends && <button type="submit">Friends</button>}
        {/* {params.userId !== currentUser.email &&
          !isFriends &&
          friendRequestRecieved && (
            <button type="submit" onClick={acceptRequestHandler}>
              Accept Request
            </button>
          )}
        {params.userId !== currentUser.email &&
          !isFriends &&
          friendRequestRecieved && (
            <button type="submit" onClick={declineRequestHandler}>
              Decline
            </button>
          )}
        {params.userId !== currentUser.email &&
          !isFriends &&
          !friendRequestRecieved &&
          friendRequestSent && (
            <button type="submit" onClick={cancelRequestHandler}>
              Cancel Request
            </button>
          )}
        {params.userId !== currentUser.email &&
          !isFriends &&
          !friendRequestRecieved &&
          !friendRequestSent && (
            <button type="submit" onClick={addFriendHandler}>
              Add Friend
            </button>
          )} */}
      </Wrapper>
    </Wrapper>
  );
};

export default UserProfile;
