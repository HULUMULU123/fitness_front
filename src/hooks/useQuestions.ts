import { useMutation } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

export const useQuestions = () => {
  const submitQuestionsMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/questions/submit/", data);
      return res.data;
    },
  });

  return {
    submitQuestions: submitQuestionsMutation.mutate,
    submitQuestionsAsync: submitQuestionsMutation.mutateAsync,
    isSubmitting: submitQuestionsMutation.isPending,
    submitError: submitQuestionsMutation.error,
    submitSuccess: submitQuestionsMutation.isSuccess,
  };
};
