import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  users: JSON.parse(localStorage.getItem("users")) ?? [],
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
      if (action.payload.type === "LOGIN") {
        const userIndex = state.users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (userIndex !== -1) {
          if (state.users[userIndex].password === action.payload.password) {
            state.isLoggedIn = true;
            state.currentUser.email = state.users[userIndex].email;
            state.currentUser.password = state.users[userIndex].password;
            state.currentUser.bgPhoto = state.users[userIndex].bgPhoto;
            state.currentUser.profilePhoto =
              state.users[userIndex].profilePhoto;
            state.currentUser.friendRequests = [
              ...state.users[userIndex].friendRequests,
            ];
            state.currentUser.friendList = [
              ...state.users[userIndex].friendList,
            ];
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
      const userIndex = state.users.findIndex(
        (user) => user.email === action.payload.email
      );
      if (userIndex === -1) {
        state.users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    profileUpdateHandler(state, action) {
      const userIndex = state.users.findIndex(
        (user) => user.email === state.currentUser.email
      );
      if (action.payload.type === "PROFILEPHOTO") {
        state.users[userIndex].profilePhoto = action.payload.profilePicUrl;
        state.currentUser.profilePhoto = action.payload.profilePicUrl;
      } else if (action.payload.type === "BGPHOTO") {
        state.users[userIndex].bgPhoto = action.payload.bgPicUrl;
        state.currentUser.bgPhoto = action.payload.bgPicUrl;
      }
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    friendRequestHandler(state, action) {
      const userIndex = state.users.findIndex(
        (user) => user.email === action.payload.requestSentTo
      );
      if (action.payload.type === "Add Friend") {
        if (state.users[userIndex].friendRequests.length === 0) {
          state.users[userIndex].friendRequests.push({
            requestRecievedFrom: action.payload.currentUser.email,
          });
          localStorage.setItem("users", JSON.stringify(state.users));
        } else {
          const friendReqIndex = state.users[
            userIndex
          ].friendRequests.findIndex(
            (request) =>
              request.requestRecievedFrom === action.payload.currentUser.email
          );
          if (friendReqIndex === -1) {
            state.users[userIndex].friendRequests.push({
              requestRecievedFrom: action.payload.currentUser.email,
            });
            localStorage.setItem("users", JSON.stringify(state.users));
          }
        }
      } else if (action.payload.type === "Cancel Request") {
        const friendReqIndex = state.users[userIndex].friendRequests.findIndex(
          (request) =>
            request.requestRecievedFrom === action.payload.currentUser.email
        );
        state.users[userIndex].friendRequests.splice(friendReqIndex, 1);
        localStorage.setItem("users", JSON.stringify(state.users));
      } else if (action.payload.type === "Accept Request") {
        const currentUserIndex = state.users.findIndex(
          (user) => user.email === action.payload.currentUser.email
        );
        const friendReqIndex = state.currentUser.friendRequests.findIndex(
          (request) =>
            request.requestRecievedFrom === action.payload.requestSentTo
        );
        state.users[currentUserIndex].friendRequests.splice(friendReqIndex, 1);
        state.currentUser.friendRequests.splice(friendReqIndex, 1);
        if (
          state.users[userIndex].friendList.length === 0 &&
          state.currentUser.friendList.length === 0 &&
          state.users[currentUserIndex].friendList.length === 0
        ) {
          state.users[userIndex].friendList.push({
            email: action.payload.currentUser.email,
          });
          state.users[currentUserIndex].friendList.push({
            email: action.payload.requestSentTo,
          });
          state.currentUser.friendList.push({
            email: action.payload.requestSentTo,
          });
          localStorage.setItem("users", JSON.stringify(state.users));
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
        } else {
          const friendReqIndex = state.users[userIndex].friendList.findIndex(
            (friend) => friend.email === action.payload.currentUser.email
          );
          if (friendReqIndex === -1) {
            state.users[userIndex].friendList.push({
              email: action.payload.currentUser.email,
            });
            state.users[currentUserIndex].friendList.push({
              email: action.payload.requestSentTo,
            });
            state.currentUser.friendList.push({
              email: action.payload.requestSentTo,
            });
            localStorage.setItem("users", JSON.stringify(state.users));
            localStorage.setItem(
              "currentUser",
              JSON.stringify(state.currentUser)
            );
          }
        }
      } else if (action.payload.type === "Decline") {
        const currentUserIndex = state.users.findIndex(
          (user) => user.email === action.payload.currentUser.email
        );
        const friendReqIndex = state.currentUser.friendRequests.findIndex(
          (request) =>
            request.requestRecievedFrom === action.payload.requestSentTo
        );
        state.users[currentUserIndex].friendRequests.splice(friendReqIndex, 1);
        state.currentUser.friendRequests.splice(friendReqIndex, 1);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
