import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

// Получение тренировок
export const useExercise = (exerciseId: string | number) => {
  const queryClient = useQueryClient();

  const exerciseQuery = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const res = await api.get(`/exercise/${id}/`);
      return res.data;
    },
    enabled: !!exerciseId, // чтобы запрос не выполнялся без id
    // staleTime: 10 * 60 * 1000,
  });

  return {
    exercise: exerciseQuery.data,
  };
};
