# Version node
FROM node:19.7

#Creacion del directorio de trabajo
WORKDIR /app
COPY . .
ENV HOST 0.0.0.0
#Comando para instalar dependencias
RUN npm install

#Puerto a exponer
EXPOSE 5173 

CMD ["npm", "run","dev"]
