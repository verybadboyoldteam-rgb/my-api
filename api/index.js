module.exports = (req, res) => {
  try {
    const expectedToken = process.env.API_TOKEN;

    if (!expectedToken) {
      return res.status(500).json({
        error: 'Ошибка конфигурации: API_TOKEN не задан в переменных окружения.'
      });
    }

    const authHeader = req.headers.authorization;
    const isAuthorized = authHeader === `Bearer ${expectedToken}`;

    if (!isAuthorized) {
      return res.status(401).json({ error: 'Unauthorized: invalid or missing token' });
    }

    res.status(200).json({
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
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};
