import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../utils/axios";

const FormWrapper = styled.form`
  padding: 16px;
  background-color: #1e1e1e;
  border-radius: 16px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 4rem;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #2c2c2c;
  color: #fff;
  font-size: 16px;
`;

const ImagePreview = styled.img`
  border-radius: 12px;
  margin-top: 12px;
  max-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 12px;
  background-color: #2196f3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

type FormValues = {
  weight?: number;
  photo_front?: FileList;
};

const Wish = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormValues>();
  const [preview, setPreview] = useState<string | null>(null);

  const photo = watch("photo_front");

  React.useEffect(() => {
    const file = photo?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photo]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    if (data.weight) {
      formData.append("weight", data.weight.toString());
    }

    if (data.photo_front?.[0]) {
      formData.append("photo_front", data.photo_front[0]);
    }

    api.post("/goal/", formData);
    reset();
    setPreview(null);
  };
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Желаемый вес (кг)</Label>
        <Input
          type="number"
          placeholder="Например, 75"
          {...register("weight", { required: false, min: 30, max: 300 })}
        />
      </div>

      <div>
        <Label>Фото с желаемой формой</Label>
        <Input type="file" accept="image/*" {...register("photo_front")} />
        {preview && <ImagePreview src={preview} alt="Preview" />}
      </div>

      <SubmitButton type="submit">Сохранить цель</SubmitButton>
    </FormWrapper>
  );
};

export default Wish;
