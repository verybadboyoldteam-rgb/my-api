# API с авторизацией

Сервис возвращает персонализированный JSON-ответ. Доступ защищён двумя способами авторизации.

---

## 🔗 Ссылки

- **Страница входа (для пользователей):**  
  [https://my-api-pde9.vercel.app](https://my-api-pde9.vercel.app)
- **API (для разработчиков):**  
  [https://my-api-pde9.vercel.app/api](https://my-api-pde9.vercel.app/api)
- **Исходный код:**  
  [https://github.com/verybadboyoldteam-rgb/my-api](https://github.com/verybadboyoldteam-rgb/my-api)

---

## 👤 Для пользователей (простой способ)

1. Откройте ссылку: [https://my-api-pde9.vercel.app](https://my-api-pde9.vercel.app)
2. Введите логин и пароль:
   - **Логин:** `admin`
   - **Пароль:** `12345`
3. Нажмите кнопку **«Получить данные»**.
4. Вы увидите JSON с данными пользователя.

> Если данные неверны — появится сообщение об ошибке.

---

## 👨‍💻 Для разработчиков (программный доступ)

### Способ 1 — Bearer-токен

Передайте заголовок в каждом запросе:
Authorization: Bearer leha_krepko_divigatesya


**Пример через `curl`:**
```bash
curl -H "Authorization: Bearer leha_krepko_divigatesya" https://my-api-pde9.vercel.app/api

Способ 2 — логин и пароль (POST)
Отправьте POST-запрос с JSON-телом:
{
  "login": "admin",
  "password": "12345"
}

Пример через curl:
curl -X POST -H "Content-Type: application/json" -d '{"login":"admin","password":"12345"}' https://my-api-pde9.vercel.app/api

Пример успешного ответа
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


Ошибка авторизации
Если токен, логин или пароль неверны — сервер вернёт ошибку 401 Unauthorized с сообщением:
{
  "error": "Unauthorized: invalid or missing token or credentials"
}

Технологии
JavaScript (Node.js)

Vercel (Serverless Functions)

GitHub

HTML + CSS (интерфейс входа)

Примечания
Оба способа авторизации работают одновременно и независимо.

Токен и данные для входа не хранятся в коде — они защищены переменными окружения на сервере.

Интерфейс адаптирован для мобильных устройств.

Передайте заголовок в каждом запросе:
