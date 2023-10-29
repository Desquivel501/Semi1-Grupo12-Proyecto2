# Version node
FROM node

#Creacion del directorio de trabajo
WORKDIR /app
COPY . .
ENV HOST 0.0.0.0
#Comando para instalar dependencias
RUN npm install -g npm@10.2.1
RUN npm install --force

#Puerto a exponer
EXPOSE 5173 

CMD ["npm", "run","dev"]
