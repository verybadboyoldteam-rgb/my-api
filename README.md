# API с авторизацией

Этот API возвращает персонализированный JSON-ответ. Доступ защищён двумя способами авторизации.

---

## 🔗 Ссылка на сервис

[https://my-api-pde9.vercel.app/api](https://my-api-pde9.vercel.app/api)

---

## 📦 Что возвращает API

| Ключ | Тип | Пример |
|------|-----|--------|
| `name` | строка | "Алексей" |
| `age` | число | 35 |
| `profession` | строка | "Руководитель отдела мобильной разработки" |
| `hobbies` | массив строк | ["менять скины в Quake 3", ...] |
| `location` | объект | { "currentCity": "Минск", ... } |

---

## 🔐 Способ 1 — Bearer-токен

Добавьте в запрос заголовок:
Authorization: Bearer leha_krepko_divigatesya

text

**Пример через curl:**
```bash
curl -H "Authorization: Bearer leha_krepko_divigatesya" https://my-api-pde9.vercel.app/api
Пример через JavaScript (консоль браузера):

javascript
fetch('https://my-api-pde9.vercel.app/api', {
  headers: {
    'Authorization': 'Bearer leha_krepko_divigatesya'
  }
})
.then(r => r.json())
.then(data => console.log(data));
🔐 Способ 2 — логин и пароль (POST)
Отправьте POST-запрос с телом:

json
{
  "login": "admin",
  "password": "12345"
}
Пример через curl:

bash
curl -X POST -H "Content-Type: application/json" -d '{"login":"admin","password":"12345"}' https://my-api-pde9.vercel.app/api
Пример через JavaScript (консоль браузера):

javascript
fetch('https://my-api-pde9.vercel.app/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    login: 'admin',
    password: '12345'
  })
})
.then(r => r.json())
.then(data => console.log(data));
📄 Пример успешного ответа
json
{
  "name": "Алексей",
  "age": 35,
  "profession": "Руководитель отдела мобильной разработки",
  "hobbies": [
    "менять скины в Quake 3",
    "читать стихи Есенина",
    "тащиться от Тринити из Матрицы"
  ],
  "location": {
    "currentCity": "Минск",
    "currentCountry": "Беларусь",
    "dreamCountry": "Франция"
  }
}
❌ Ошибка при неверной авторизации
Если токен, логин или пароль неверны — сервер вернёт ошибку:

json
{
  "error": "Unauthorized: invalid or missing token or credentials"
}
🛠️ Технологии
JavaScript (Node.js)

Vercel (Serverless Functions)

GitHub

📌 Важно
Оба способа авторизации работают одновременно.

Токен и логин/пароль защищены переменными окружения на сервере.
