import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
`;

export const NavOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 25px;
  padding: 0.8em;

  &:hover{
    background-color: lightgray;
    border-radius: 4px;
  }
`;

export const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  background-size: cover;
`;

export const Icon = styled.img`
  height: 25px;
  width: 25px;
  background-size: cover;
`;

export const Option = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;
