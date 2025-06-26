import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

// Получение тренировок
export const useVitamins = () => {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["vitamins"],
    queryFn: async () => {
      const res = await api.get("/vitamins/");
      console.log(res);
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 5 минут в миллисекундах
  });

  return {
    vitamins: planQuery.data?.vitamins,
    isLoading: planQuery.isLoading,
    error: planQuery.error,
    refetch: planQuery.refetch,
  };
};
