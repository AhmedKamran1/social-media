import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) ?? {
    email: null,
    password: null,
    bgPhoto: null,
    profilePhoto: null,
    friendRequests: [],
    friendList: [],
  },
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) ?? false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialUserState,
  reducers: {
    loginHandler(state, action) {
      const users = JSON.parse(localStorage.getItem("users")) ?? [];
      if (action.payload.type === "LOGIN") {
        const userIndex = users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (userIndex !== -1) {
          if (users[userIndex].password === action.payload.password) {
            state.isLoggedIn = true;
            state.currentUser.email = users[userIndex].email;
            state.currentUser.password = users[userIndex].password;
            state.currentUser.bgPhoto = users[userIndex].bgPhoto;
            state.currentUser.profilePhoto = users[userIndex].profilePhoto;
            state.currentUser.friendRequests = [
              ...users[userIndex].friendRequests,
            ];
            state.currentUser.friendList = [...users[userIndex].friendList];
            localStorage.setItem(
              "currentUser",
              JSON.stringify(state.currentUser)
            );
            localStorage.setItem(
              "isLoggedIn",
              JSON.stringify(state.isLoggedIn)
            );
          }
        }
      } else if (action.payload.type === "LOGOUT") {
        state.currentUser = {
          email: null,
          password: null,
          bgPhoto: null,
          profilePhoto: null,
          friendRequests: [],
          friendList: [],
        };
        state.isLoggedIn = false;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
      }
    },
    signupHandler(state, action) {
      const users = JSON.parse(localStorage.getItem("users")) ?? [];
      const userIndex = users.findIndex(
        (user) => user.email === action.payload.email
      );
      if (userIndex === -1) {
        users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(users));
      }
    },
    profileUpdateHandler(state, action) {
      const users = JSON.parse(localStorage.getItem("users")) ?? [];
      const userIndex = users.findIndex(
        (user) => user.email === state.currentUser.email
      );
      if (action.payload.type === "PROFILEPHOTO") {
        users[userIndex].profilePhoto = action.payload.profilePicUrl;
        state.currentUser.profilePhoto = action.payload.profilePicUrl;
      } else if (action.payload.type === "BGPHOTO") {
        users[userIndex].bgPhoto = action.payload.bgPicUrl;
        state.currentUser.bgPhoto = action.payload.bgPicUrl;
      }
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    friendRequestHandler(state, action) {
      const users = JSON.parse(localStorage.getItem("users")) ?? [];
      const userIndex = users.findIndex(
        (user) => user.email === action.payload.requestSentTo
      );
      if (action.payload.type === "Add Friend") {
        console.log("hello");
        if (users[userIndex].friendRequests.length === 0) {
          users[userIndex].friendRequests.push({
            requestRecievedFrom: action.payload.currentUser.email,
          });
          localStorage.setItem("users", JSON.stringify(users));
        } else {
          const friendReqIndex = users[
            userIndex
          ].friendRequests.findIndex(
            (request) =>
              request.requestRecievedFrom === action.payload.currentUser.email
          );
          if (friendReqIndex === -1) {
            users[userIndex].friendRequests.push({
              requestRecievedFrom: action.payload.currentUser.email,
            });
            localStorage.setItem("users", JSON.stringify(users));
          }
        }
      } else if (action.payload.type === "Cancel Request") {
        const friendReqIndex = users[userIndex].friendRequests.findIndex(
          (request) =>
            request.requestRecievedFrom === action.payload.currentUser.email
        );
        users[userIndex].friendRequests.splice(friendReqIndex, 1);
        localStorage.setItem("users", JSON.stringify(users));
      } else if (action.payload.type === "Accept Request") {
        const currentUserIndex = users.findIndex(
          (user) => user.email === action.payload.currentUser.email
        );
        const friendReqIndex = state.currentUser.friendRequests.findIndex(
          (request) =>
            request.requestRecievedFrom === action.payload.requestSentTo
        );
        users[currentUserIndex].friendRequests.splice(friendReqIndex, 1);
        state.currentUser.friendRequests.splice(friendReqIndex, 1);
        if (
          users[userIndex].friendList.length === 0 &&
          state.currentUser.friendList.length === 0 &&
          users[currentUserIndex].friendList.length === 0
        ) {
          users[userIndex].friendList.push({
            email: action.payload.currentUser.email,
          });
          users[currentUserIndex].friendList.push({
            email: action.payload.requestSentTo,
          });
          state.currentUser.friendList.push({
            email: action.payload.requestSentTo,
          });
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
        } else {
          const friendReqIndex = users[userIndex].friendList.findIndex(
            (friend) => friend.email === action.payload.currentUser.email
          );
          if (friendReqIndex === -1) {
            users[userIndex].friendList.push({
              email: action.payload.currentUser.email,
            });
            users[currentUserIndex].friendList.push({
              email: action.payload.requestSentTo,
            });
            state.currentUser.friendList.push({
              email: action.payload.requestSentTo,
            });
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem(
              "currentUser",
              JSON.stringify(state.currentUser)
            );
          }
        }
      } else if (action.payload.type === "Decline") {
        const currentUserIndex = users.findIndex(
          (user) => user.email === action.payload.currentUser.email
        );
        const friendReqIndex = state.currentUser.friendRequests.findIndex(
          (request) =>
            request.requestRecievedFrom === action.payload.requestSentTo
        );
        users[currentUserIndex].friendRequests.splice(friendReqIndex, 1);
        state.currentUser.friendRequests.splice(friendReqIndex, 1);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
