import styled from "styled-components";

export const FormContainer = styled.form`
  margin: 0 auto;
  background: #000;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  justify-self: center;
  padding: 1rem 0;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

export const Field = styled.div`
  width: 80%;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #fff;
`;

export const Input = styled.input`
  width: 90%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    border-color: #0077ff;
    outline: none;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

export const SubmitButton = styled.button`
  width: 50%;
  padding: 0.75rem;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #005ed3;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

export const FileInput = styled.input`
  font-size: 1rem;
  padding-top: 5px;
`;
