# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app    

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie o restante dos arquivos do aplicativo para o diretório de trabalho
COPY . .

RUN npm run build

# Exponha a porta em que o aplicativo está sendo executado
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "npm", "start" ]