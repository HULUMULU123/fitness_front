import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

export const useStatistics = () => {
  const queryClient = useQueryClient();

  // 📦 Получение статистики
  const planQuery = useQuery({
    queryKey: ["statistic"],
    queryFn: async () => {
      const res = await api.get("/statistics/");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 10 минут
  });

  // ✏️ Обновление данных (например, замеров тела)
  const updateMeasurementMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/statistics/update/", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statistic"] });
    },
  });

  return {
    statistics: planQuery.data?.body_statistics,
    weight_difference: planQuery.data?.weight_difference,
    time_interval: planQuery.data?.time_interval,
    start_weight: planQuery.data?.start_weight,
    wish_weght: planQuery.data?.wish_weight,
    isLoading: planQuery.isLoading,
    error: planQuery.error,
    refetch: planQuery.refetch,

    updateMeasurement: updateMeasurementMutation.mutate,
    updateMeasurementAsync: updateMeasurementMutation.mutateAsync,
    isUpdating: updateMeasurementMutation.isPending,
    updateError: updateMeasurementMutation.error,
  };
};
