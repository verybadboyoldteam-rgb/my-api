# API с авторизацией

Сервис возвращает JSON с данными пользователя.

**Ссылка:** https://my-api-pde9.vercel.app/api

---

## Авторизация

Есть два способа получить доступ.

### 1. Токен
Передайте заголовок:
Authorization: Bearer leha_krepko_divigatesya

### 2. Логин и пароль
Отправьте POST-запрос с телом:
```json
{
  "login": "admin",
  "password": "12345"
}
Ответ
При успешной авторизации придёт:
{
  "name": "Алексей",
  "age": 35,
  "profession": "Руководитель отдела мобильной разработки",
  "hobbies": ["менять скины в Quake 3", "читать стихи Есенина", "тащиться от Тринити из Матрицы"],
  "location": {
    "currentCity": "Минск",
    "currentCountry": "Беларусь",
    "dreamCountry": "Франция"
  }
}
При ошибке — 401 Unauthorized.

Технологии
JavaScript, Vercel, GitHub
