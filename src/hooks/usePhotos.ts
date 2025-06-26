import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios"; // твой axios-инстанс

export const usePhotos = () => {
  const queryClient = useQueryClient();

  // 📦 Получение статистики
  const planQuery = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const res = await api.get("/photos/");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 10 минут
  });

  // ✏️ Обновление данных (например, замеров тела)
  const updatePhotoMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/photos/update/", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });

  return {
    photos: planQuery.data?.progress_photos,

    updatePhoto: updatePhotoMutation.mutate,
    updateMeasurementAsync: updatePhotoMutation.mutateAsync,
    isUpdating: updatePhotoMutation.isPending,
    updateError: updatePhotoMutation.error,
  };
};
