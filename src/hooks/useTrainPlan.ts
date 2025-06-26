import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

// Получение тренировок
export const useTrainPlan = () => {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const res = await api.get("/plan/");
      console.log(res);
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 5 минут в миллисекундах
  });

  //   const createTraining = useMutation({
  //     mutationFn: async (data) => {
  //       const res = await api.post("/trainings/", data);
  //       return res.data;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["trainings"] });
  //     },
  //   });

  //   const deleteTraining = useMutation({
  //     mutationFn: async (id: number) => {
  //       await api.delete(`/trainings/${id}/`);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["trainings"] });
  //     },
  //   });

  return {
    trainings: planQuery.data?.user_trainings,
    isLoading: planQuery.isLoading,
    error: planQuery.error,
    refetch: planQuery.refetch,
  };
};
