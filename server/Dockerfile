# Podstawowy obraz z Node.js
FROM node

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /usr/src/app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty kodu źródłowego
COPY . .

# Eksponowanie portu 4000
EXPOSE 4000

# Zdefiniowanie komendy startowej
CMD ["npm", "run", "start:dev"]
