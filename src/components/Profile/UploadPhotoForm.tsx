import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { usePhotos } from "../../hooks/usePhotos";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin-top: 5rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const UploadPhotoForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { updatePhoto, isLoading, error } = usePhotos();
  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    updatePhoto(formData);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <div>
        <Label>Загрузите фото прогресса:</Label>
        <Input type="file" {...register("photo", { required: true })} />
      </div>
      <Button type="submit">Отправить</Button>
    </Form>
  );
};

export default UploadPhotoForm;
