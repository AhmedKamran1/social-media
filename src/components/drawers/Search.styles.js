import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 965px;
  width: 20vw;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  gap: 20px;

  &::after {
    content: "";
    position: absolute;
    top: 4.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 0;
    border: 1px solid lightgray;
  }
`;

export const BackIcon = styled.img`
  height: 25px;
  width: 25px;
  margin-left: 10px;
  background-size: cover;
`;

export const SearchIcon = styled.img`
  position: absolute;
  top: 7%;
  right: 7%;
  height: 20px;
  width: 20px;
  background-size: cover;
`;

export const Text = styled.span`
  font-size: 1.2rem;
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SearchField = styled.input`
  padding: 0.9em;
  width: 95%;
  background-color: lightgray;
  border-radius: 15px;
  border-style: none;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 850px;
  width: 100%;
  padding: 0.25em;
  overflow-y: scroll;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
  gap: 20px;
`;

export const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-size: cover;
`;

export const CrossIcon = styled.img`
  height: 20px;
  width: 20px;
  background-size: cover;
  margin-left: auto;
`;

export const Divider = styled.div`
  border: solid;
  border-width: 0;
  border-bottom-width: thin;
  width: 80%;
  margin-left: 20%;
  opacity: 0.2;
`;
