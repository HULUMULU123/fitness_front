// hooks/useTrainings.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

// Получение тренировок
export const useTrainings = () => {
  const queryClient = useQueryClient();

  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 5 минут в миллисекундах
  });

  const updateExercise = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/trainings/complete/", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["dashboard"], (old: any) => {
        if (!old) return { next_training: data };
        return { ...old, next_training: data };
      });
    },
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
  console.log(dashboardQuery.data?.quote);
  return {
    quote: dashboardQuery.data?.quote,
    wish: dashboardQuery.data?.wish,
    nextTraining: dashboardQuery.data?.next_training,
    week_data: dashboardQuery.data?.week_data,
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error,
    refetch: dashboardQuery.refetch,
    updateExercise,
  };
};
