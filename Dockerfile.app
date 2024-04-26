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

ENV DB_TYPE=postgres
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASS=postgres
ENV DB_NAME=postgres
ENV JWT_SECRET=b8cfcc9590927546c9dbf97ccc5b32b0f038ce37d39e82c058bacb7615f85e25

RUN npm run build

# Exponha a porta em que o aplicativo está sendo executado
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "npm", "run", "start" ]