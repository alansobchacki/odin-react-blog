import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const FormTitle = styled.h2`
  font-family: inherit;
  font-size: 1.1rem;
  margin-bottom: 15px;
`;

export const InputField = styled.input`
  font-family: inherit;
  width: 100%;
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

export const FormButton = styled.button`
  font-family: "Public Sans";
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  background-color: white;
  padding: 5px;
  margin-top: 20px;
  width: 150px;
  height: 40px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
