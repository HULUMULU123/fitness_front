import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  ErrorText,
  Field,
  FormContainer,
  Input,
  SubmitButton,
  Title,
  Label,
} from "./forms.styles";
import { useStatistics } from "../../hooks/useStatistic";

type FormData = {
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  bicep_right: number;
  bicep_left: number;
  thigh_right: number;
  thigh_left: number;
  buttock: number;
};

const WeightGainForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { updateMeasurement, isUpdating } = useStatistics();
  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
    updateMeasurement(data); // отправка на сервер через useMutation
    reset(); // сброс формы при необходимости
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Замеры тела</Title>

      <Field>
        <Label>Общий вес (кг):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("weight", { required: true })}
        />
        {errors.weight && <ErrorText>Введите вес</ErrorText>}
      </Field>

      <Field>
        <Label>Грудная клетка (см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("chest", { required: true })}
        />
      </Field>

      <Field>
        <Label>Талия (см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("waist", { required: true })}
        />
      </Field>

      <Field>
        <Label>Таз (см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("hips", { required: true })}
        />
      </Field>

      <Field>
        <Label>Бицепс (правый, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("bicep_right", { required: true })}
        />
      </Field>

      <Field>
        <Label>Бицепс (левый, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("bicep_left", { required: true })}
        />
      </Field>

      <Field>
        <Label>Бедро (правое, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("thigh_right", { required: true })}
        />
      </Field>

      <Field>
        <Label>Бедро (левое, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("thigh_left", { required: true })}
        />
      </Field>
      <Field>
        <Label>Ягодица (правая, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("buttock", { required: true })}
        />
      </Field>

      <SubmitButton type="submit">Сохранить</SubmitButton>
    </FormContainer>
  );
};

export default WeightGainForm;
