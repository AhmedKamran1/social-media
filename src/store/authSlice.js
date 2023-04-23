import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  currentUser: {
    email: null,
    password: null,
    bgPhoto: null,
    profilePhoto: null,
  },
  isLoggedIn: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialUserState,
  reducers: {
    loginHandler(state, action) {
      if (action.payload.type === "ISLOGGEDIN") {
        if (action.payload.email === null) {
          state.isLoggedIn = false;
        } else {
          const users = JSON.parse(localStorage.getItem("users")) ?? [];
          const userIndex = users.findIndex(
            (user) => user.email === action.payload.email
          );
          state.isLoggedIn = true;
          const { email, password, bgPhoto, profilePhoto } = users[userIndex];
          state.currentUser = {
            email,
            password,
            bgPhoto,
            profilePhoto,
          };
        }
      } else if (action.payload.type === "LOGIN") {
        const users = JSON.parse(localStorage.getItem("users")) ?? [];
        const userIndex = users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (userIndex !== -1) {
          if (users[userIndex].password === action.payload.password) {
            state.isLoggedIn = true;
            const { email, password, bgPhoto, profilePhoto } = users[userIndex];
            state.currentUser = {
              email,
              password,
              bgPhoto,
              profilePhoto,
            };
            localStorage.setItem(
              "currentUser",
              JSON.stringify(state.currentUser.email)
            );
          }
        }
      } else if (action.payload.type === "LOGOUT") {
        state.currentUser = {
          email: null,
          password: null,
          bgPhoto: null,
          profilePhoto: null,
        };
        state.isLoggedIn = false;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(state.currentUser.email)
        );
      }
    },
    signupHandler(state, action) {
      const users = JSON.parse(localStorage.getItem("users")) ?? [];
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
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
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
