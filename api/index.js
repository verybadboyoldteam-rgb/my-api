module.exports = (req, res) => {
  const validToken = process.env.API_TOKEN;

  const token = req.headers.authorization;
  const isTokenValid = token === `Bearer ${validToken}`;

  const { login, password } = req.body;
  const isLoginPasswordValid = login === "admin" && password === "12345";

  if (!isTokenValid && !isLoginPasswordValid) {
    return res.status(401).json({
      error: "Доступ запрещён. Неверный токен, логин или пароль."
    });
  }

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
