export function getTodayFormatted(): string {
  const today = new Date();
  const day = today.getDate();

  const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const weekday = weekdays[today.getDay()];
  const month = months[today.getMonth()];

  return `${weekday}, ${day} ${month}`;
}

type Training = {
  day: string; // дата в формате ISO, например "2025-06-01"
  weekday: number; // 0-Пн, 6-Вс или 0-Вс в зависимости от реализации, уточни ниже
  completed_exercise_count: number;
  // другие поля не важны
};

const weekdaysShort = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function buildWeekData(
  weekTrainings: any[]
): { day: string; exercises: number }[] {
  const weekdaysShort = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  // Преобразование строки в индекс дня недели
  const dayNameToIndex = (dayName: string): number => {
    const map: Record<string, number> = {
      Понедельник: 0,
      Вторник: 1,
      Среда: 2,
      Четверг: 3,
      Пятница: 4,
      Суббота: 5,
      Воскресенье: 6,
    };
    return map[dayName] ?? -1;
  };

  const trainingsMap = new Map<number, any>();
  for (const t of weekTrainings) {
    const dayIndex = dayNameToIndex(t.weekday);
    if (dayIndex >= 0) {
      trainingsMap.set(dayIndex, t);
    }
  }

  const result = [];
  for (let i = 0; i < 7; i++) {
    const training = trainingsMap.get(i);
    console.log(training, "test training");
    result.push({
      day: weekdaysShort[i],
      exercises: training ? training.completed_exercise_count : 0,
    });
  }

  return result;
}
