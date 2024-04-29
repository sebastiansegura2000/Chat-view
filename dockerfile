# Usar una imagen de Node.js como base
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar dependencias globales
RUN npm install -g @angular/cli@10.2.3

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que utiliza el servidor de desarrollo de Angular (usualmente 4200)
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo de Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]

