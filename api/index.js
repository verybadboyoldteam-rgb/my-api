module.exports = (req, res) => {
  try {
    const expectedToken = process.env.API_TOKEN;

    if (!expectedToken) {
      return res.status(500).json({
        error: 'Ошибка конфигурации: API_TOKEN не задан в переменных окружения.'
      });
    }

    const authHeader = req.headers.authorization;
    const isTokenValid = authHeader === `Bearer ${expectedToken}`;

    let isLoginPasswordValid = false;
    if (req.method === 'POST' && req.body) {
      const { login, password } = req.body;
      isLoginPasswordValid = login === 'admin' && password === '12345';
    }

    if (!isTokenValid && !isLoginPasswordValid) {
      return res.status(401).json({ error: 'Unauthorized: invalid or missing token or credentials' });
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
