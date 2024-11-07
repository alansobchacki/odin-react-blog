import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  font-family: Public Sans;
  color: white;
  background-color: #282c34;
  padding: 20px;
  width: 100%;
  gap: 50px;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
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
  padding-bottom: 30px;
  border-bottom: 1px solid lightgray;
`;

export const BlogPostTitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 15px;
`;

export const BlogPostMessage = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  padding: 5px;
  margin-bottom: 25px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;

export const CommentsTitle = styled.h4`
  font-family: Public Sans;
  font-size: 1.45rem;
  margin-bottom: 10px;
`;

export const CommentInput = styled.input`
  font-family: inherit;
  width: 450px;
  height: 75px;
  border: 0;
  outline: 0;
  font-size: 1rem;
  color: white;
  padding: 7px 0;
  background: #424d5c;
  margin-bottom: 5px;
  padding-left: 5px;
  transition: border-color 0.2s;
  border-radius: 6px;

  &::placeholder {
    color: gray;
    font-weight: 300;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
`;

export const SubmitButton = styled.button`
  font-family: "Public Sans";
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  background-color: white;
  padding: 5px;
  margin-top: 10px;
  width: 150px;
  height: 40px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 5px;
  max-width: 400px;
`;

export const DeleteButton = styled.button`
  font-family: "Public Sans";
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  background-color: white;
  padding: 5px;
  width: 100px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const Comment = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  font-style: ${(props) => (props.isDeleted ? 'italic' : 'normal')};
  font-weight: ${(props) => (props.isDeleted ? '300' : '600')};
  color: ${(props) => (props.isDeleted ? 'lightgray' : 'white')};
`;
