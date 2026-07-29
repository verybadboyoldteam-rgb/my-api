module.exports = (req, res) => {
  const data = {
    name: "Алексей",
    age: 35,
    profession: "Руководитель отдела мобильной разработки",
    hobbies: [
      "менять скины в Quake 3",
      "читать стихи Есенина",
      "тащиться от Тринити из Матрицы"
    ],
    location: {
      currentCity: "Минск",
      currentCountry: "Беларусь",
      dreamCountry: "Франция"
    }
  };

  res.status(200).json(data);
};
