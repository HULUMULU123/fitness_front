// hooks/useTrainings.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

// Получение тренировок
export const useWorkout = (workoutId: string | number) => {
  const queryClient = useQueryClient();

  const workoutQuery = useQuery({
    queryKey: ["workout", workoutId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const res = await api.get(`/workout/${id}/`);
      return res.data;
    },
    enabled: !!workoutId, // чтобы запрос не выполнялся без id
    // staleTime: 10 * 60 * 1000,
  });

  const updateWorkout = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/workout/update/", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["workout", workoutId], (old: any) => {
        if (!old) return data;
        return { ...old, ...data };
      });
    },
  });

  return { workout: workoutQuery.data, updateWorkout };
};
