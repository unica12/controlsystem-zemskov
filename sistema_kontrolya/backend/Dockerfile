# Используем Node.js
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем всё остальное
COPY . .

# Открываем порт (если backend будет на 3000)
EXPOSE 3000

# Команда по умолчанию
CMD ["npm", "run", "dev"]
