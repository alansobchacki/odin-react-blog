import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  font-family: Public Sans;
  color: white;
  background-color: #282c34;
  padding: 20px;
  height: 100vh;
  width: 100%;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

export const BlogLatestPosts = styled.h1`
  text-align: center;
`;

export const BlogPostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BlogPostTitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 15px;
`;

export const BlogPostMessage = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
`;
