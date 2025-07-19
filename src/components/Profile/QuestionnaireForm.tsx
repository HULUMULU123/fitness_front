import React from "react";
import { useForm } from "react-hook-form";
import {
  ErrorText,
  Field,
  FormContainer,
  Input,
  SubmitButton,
  Title,
  Label,
  Textarea,
  FileInput,
} from "./forms.styles"; // добавьте Textarea и FileInput в styles
import { useQuestions } from "../../hooks/useQuestions";

type FormData = {
  fullName: string;
  ageHeightWeight: string;
  location: string;
  contacts: string;
  goals: string;
  injectionsAllowed: string;
  testResults: string;
  complaints: string;
  diagnoses: string;
  activity: string;
  sleep: string;
  nutrition: string;
  medsAndSupps: string;
  children: string;
  familyDiseases: string;
  dailyRoutine: string;
  water: string;
  stool: string;
  urination: string;
  alcohol: string;
  smoking: string;
  stressLevel: string;
  sportExperience: string;
  files: FileList;
};

const QuestionnaireForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { submitQuestionsAsync, isSubmitting, submitError, submitSuccess } =
    useQuestions();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      // Текстовые поля
      for (const key in data) {
        if (key !== "attachments") {
          formData.append(key, data[key as keyof FormData] || "");
        }
      }

      // Файлы
      if (data.attachments && data.attachments.length > 0) {
        Array.from(data.attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      await submitQuestionsAsync(formData);
      reset();
      alert("Анкета успешно отправлена!");
    } catch (e) {
      console.error("Ошибка при отправке анкеты:", e);
      alert("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Анкета клиента</Title>

      <Field>
        <Label>Фамилия, Имя:</Label>
        <Input {...register("full_name", { required: true })} />
        {errors.full_name && <ErrorText>Введите ФИО</ErrorText>}
      </Field>

      <Field>
        <Label>Возраст, рост, вес:</Label>
        <Input {...register("age_height_weight", { required: true })} />
      </Field>

      <Field>
        <Label>Страна и город проживания:</Label>
        <Input {...register("location", { required: true })} />
      </Field>

      <Field>
        <Label>Контакты (телефон и email):</Label>
        <Input {...register("contacts", { required: true })} />
      </Field>

      <Field>
        <Label>Цели в плане коррекции фигуры и здоровья:</Label>
        <Textarea {...register("goals", { required: true })} />
      </Field>

      <Field>
        <Label>Допустимы ли капельницы, инъекции?</Label>
        <Input {...register("injections_allowed", { required: true })} />
      </Field>

      <Field>
        <Label>Результаты анализов (менее 3 месяцев):</Label>
        <Textarea {...register("recent_tests", { required: true })} />
      </Field>

      <Field>
        <Label>Жалобы на здоровье:</Label>
        <Textarea {...register("complaints", { required: true })} />
      </Field>

      <Field>
        <Label>Заболевания, травмы, операции:</Label>
        <Textarea {...register("diseases", { required: true })} />
      </Field>

      <Field>
        <Label>Физическая активность:</Label>
        <Textarea {...register("physical_activity", { required: true })} />
      </Field>

      <Field>
        <Label>Сон:</Label>
        <Textarea {...register("sleep", { required: true })} />
      </Field>

      <Field>
        <Label>Особенности питания:</Label>
        <Textarea {...register("nutrition", { required: true })} />
      </Field>

      <Field>
        <Label>Лекарства и БАД:</Label>
        <Textarea {...register("medications", { required: true })} />
      </Field>

      <Field>
        <Label>Дети и их возраст:</Label>
        <Input {...register("children")} />
      </Field>

      <Field>
        <Label>Заболевания родственников:</Label>
        <Textarea {...register("relatives_diseases")} />
      </Field>

      <Field>
        <Label>Режим дня:</Label>
        <Textarea {...register("day_schedule")} />
      </Field>

      <Field>
        <Label>Питьевой режим:</Label>
        <Textarea {...register("water_intake")} />
      </Field>

      <Field>
        <Label>Частота и форма стула:</Label>
        <Textarea {...register("stool")} />
      </Field>

      <Field>
        <Label>Мочеиспускания в сутки:</Label>
        <Textarea {...register("urination")} />
      </Field>

      <Field>
        <Label>Алкоголь (частота и объем):</Label>
        <Textarea {...register("alcohol")} />
      </Field>

      <Field>
        <Label>Курение:</Label>
        <Textarea {...register("smoking")} />
      </Field>

      <Field>
        <Label>Уровень стресса (0-10):</Label>
        <Input type="number" min="0" max="10" {...register("stress_level")} />
      </Field>

      <Field>
        <Label>Спортивный стаж и достижения:</Label>
        <Textarea {...register("sport_experience")} />
      </Field>

      <Field>
        <Label>Файлы (фото языка, ногтей и др.):</Label>
        <FileInput type="file" multiple {...register("attachments")} />
      </Field>

      <SubmitButton type="submit">Отправить</SubmitButton>
    </FormContainer>
  );
};

export default QuestionnaireForm;
