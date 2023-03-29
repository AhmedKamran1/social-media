import axios from "axios";
import Wrapper from "../components/wrapper/Wrapper";
import classes from "./UserProfile.module.css";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const users = useSelector((state) => state.authentication.users);
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const params = useParams();
  const dispatch = useDispatch();

  const userIndex = users.findIndex((user) => user.email === params.userId);

  // checking params then analyzing if request was sent to another person
  const friendRequestSent = users[userIndex]?.friendRequests.some(
    (request) => request.requestRecievedFrom === currentUser.email
  );

  const friendRequestRecieved = currentUser?.friendRequests.some(
    (request) => request.requestRecievedFrom === users[userIndex].email
  );

  const isFriends = currentUser?.friendList.some(
    (friend) => friend.email === params.userId
  );

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

  const friendRequestHandler = (event) => {
    if (event.target.innerText === "Add Friend") {
      dispatch(
        authActions.friendRequestHandler({
          type: event.target.innerText,
          currentUser: currentUser,
          requestSentTo: params.userId,
        })
      );
    } else if (event.target.innerText === "Cancel Request") {
      dispatch(
        authActions.friendRequestHandler({
          type: event.target.innerText,
          currentUser: currentUser,
          requestSentTo: params.userId,
        })
      );
    } else if (event.target.innerText === "Accept Request") {
      dispatch(
        authActions.friendRequestHandler({
          type: event.target.innerText,
          currentUser: currentUser,
          requestSentTo: params.userId,
        })
      );
    } else if (event.target.innerText === "Decline") {
      dispatch(
        authActions.friendRequestHandler({
          type: event.target.innerText,
          currentUser: currentUser,
          requestSentTo: params.userId,
        })
      );
    }
  };

  return (
    <Wrapper className={classes.userprofilecontainer}>
      <Wrapper className={classes.bgpiccontainer}>
        <Image
          className={classes.bgpic}
          cloudName="dhs1iquvc"
          publicId={users[userIndex]?.bgPhoto}
        />
        {params.userId === currentUser.email ? (
          <Wrapper>
            <input
              className={classes.bgfile}
              type="file"
              name="profilephoto"
              onChange={bgPhotoHandler}
            />
          </Wrapper>
        ) : null}
      </Wrapper>
      <Wrapper className={classes.profilepiccontainer}>
        <Image
          className={classes.profilepic}
          cloudName="dhs1iquvc"
          publicId={users[userIndex]?.profilePhoto}
        />
        {params.userId === currentUser.email ? (
          <Wrapper>
            <input
              className={classes.profilefile}
              type="file"
              name="profilephoto"
              onChange={profilePhotoHandler}
            />
          </Wrapper>
        ) : null}
      </Wrapper>
      <Wrapper className={classes.infocontainer}>
        {params.userId !== currentUser.email &&
          !isFriends &&
          friendRequestRecieved && (
            <button type="submit" onClick={friendRequestHandler}>
              Accept Request
            </button>
          )}
        {params.userId !== currentUser.email &&
          !isFriends &&
          friendRequestRecieved && (
            <button type="submit" onClick={friendRequestHandler}>
              Decline
            </button>
          )}
        {params.userId !== currentUser.email &&
          !isFriends &&
          !friendRequestRecieved && (
            <button type="submit" onClick={friendRequestHandler}>
              {friendRequestSent ? "Cancel Request" : "Add Friend"}
            </button>
          )}
        {isFriends && <button type="submit">Friends</button>}
      </Wrapper>
    </Wrapper>
  );
};

export default UserProfile;
