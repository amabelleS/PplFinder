import styled from "styled-components";

export const Favorites = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-block-start: 100px;
`;

export const Header = styled.div`
  display: flex;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 500px;
  height: calc(100vh - 270px);
  margin-block-start: 30px;
  overflow-y: auto;
`;

export const User = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ActionGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 60vw;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const CSVLinkrWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 3rem;
  right: 0;
  margin: 0;
  font-size: 0.8rem;
  padding: 0.7rem;
  text-align: center;

  > a {
    display: flex;
    text-decoration: none;
    color: #84ffff;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;
