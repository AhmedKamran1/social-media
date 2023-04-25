import React from "react";
import { searchData } from "../../utils/mockData";
import {
  Container,
  Header,
  BackIcon,
  SearchIcon,
  Text,
  SearchBar,
  SearchField,
  ListContainer,
  UserContainer,
  ProfileImage,
  CrossIcon,
  Divider
} from "./Search.styles";
import image from "../../assets/bg.jpg";

const SearchContainer = () => {
  return (
    <Container>
      <Header>
        <BackIcon src={image} />
        <Text>Search</Text>
      </Header>
      <SearchBar>
        <SearchField type="text" placeholder="Search" />
        <SearchIcon src={image} />
      </SearchBar>
      <ListContainer>
        {searchData.map((searchData) => (
          <>
            <UserContainer>
              <ProfileImage src={searchData.photo} />
              <Text>{searchData.name}</Text>
              <CrossIcon src={image} />
            </UserContainer>
            <Divider />
          </>
        ))}
      </ListContainer>
    </Container>
  );
};

export default SearchContainer;
