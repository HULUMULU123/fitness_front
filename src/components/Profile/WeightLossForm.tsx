import React from "react";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  Title,
  Field,
  Label,
  Input,
  ErrorText,
  SubmitButton,
} from "./forms.styles"; // импорт стилей из прошлого примера
import { useStatistics } from "../../hooks/useStatistic";

type ExtendedFormData = {
  weight: number;
  neck: number;
  chest: number;
  waist: number;
  hips: number;
  bicep_right: number;
  bicep_left: number;
  thigh_right: number;
  thigh_left: number;
  forearm_right: number;
  forearm_left: number;
  calf_right: number;
  calf_left: number;
};

const WeightLossForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExtendedFormData>();
  const { updateMeasurement, isUpdating } = useStatistics();
  const onSubmit = (data: ExtendedFormData) => {
    console.log("Submitted extended data:", data);
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
        <Label>Шея (см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("neck", { required: true })}
        />
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
        <Label>Предплечье (правое, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("forearm_right", { required: true })}
        />
      </Field>

      <Field>
        <Label>Предплечье (левое, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("forearm_left", { required: true })}
        />
      </Field>

      <Field>
        <Label>Голень (правая, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("calf_right", { required: true })}
        />
      </Field>

      <Field>
        <Label>Голень (левая, см):</Label>
        <Input
          type="number"
          step="0.1"
          {...register("calf_left", { required: true })}
        />
      </Field>

      <SubmitButton type="submit">Сохранить</SubmitButton>
    </FormContainer>
  );
};

export default WeightLossForm;
