# Proyecto Angular de Chat con MQTT

## Descripción del Proyecto

Este proyecto es una aplicación de chat desarrollada en Angular que se conecta a un servidor MQTT para la comunicación en tiempo real. El objetivo principal es proporcionar una interfaz intuitiva para el usuario, donde pueda enviar y recibir mensajes instantáneamente, y los mensajes se marquen como leídos una vez que el destinatario los haya visto.

## Características

- *Autenticación de Usuarios*: Integración con JWT para la autenticación y gestión de sesiones.
- *Manejo de Roles y Permisos*: Uso de Guards para restringir el acceso a ciertas rutas basándose en los roles de los usuarios.
- *Comunicación en Tiempo Real*: Utilización de MQTT para la transmisión y recepción de mensajes instantáneos.
- *Interfaz de Usuario Intuitiva*: Diseño de UI responsivo y fácil de usar con Angular Material.
- *Gestión de Mensajes Leídos*: Funcionalidad para marcar mensajes como leídos y almacenar el estado de lectura.

## Tecnologías Utilizadas

- *Angular*: Framework principal para el desarrollo del frontend.
- *Angular Material*: Para el diseño de la interfaz de usuario.
- *MQTT*: Protocolo utilizado para la comunicación en tiempo real.
- *RxJS*: Para el manejo de programación reactiva en Angular.
- *JWT*: Para la autenticación y autorización de usuarios.
- *TypeScript*: Lenguaje de programación utilizado en Angular.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- Node.js (v12 o superior)
- Angular CLI (v11 o superior)
- Un broker MQTT (ej. Mosquitto)

## Instalación

Sigue estos pasos para clonar y configurar el proyecto en tu máquina local:

1. Clona el repositorio:
    bash
    git clone https://github.com/sebastiansegura2000/Chat-view.git
    

2. Navega al directorio del proyecto:
    bash
    cd tu-repositorio
    

3. Instala las dependencias del proyecto:
    bash
    npm install
    

4. Configura el archivo environment.ts con los detalles de conexión a tu broker MQTT y otros parámetros necesarios.

## Ejecución del Proyecto

Para ejecutar el proyecto en modo de desarrollo, usa el siguiente comando:

```bash
ng serve
