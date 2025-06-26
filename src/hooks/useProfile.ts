import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

// Получение тренировок
export const useProfile = () => {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile/");
      console.log(res);
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 5 минут в миллисекундах
  });

  return {
    start_weight: planQuery.data?.first_weight,
    wish_weight: planQuery.data?.wish_weight,
    exercises: planQuery.data?.exercises,
    isLoading: planQuery.isLoading,
    error: planQuery.error,
    refetch: planQuery.refetch,
  };
};
