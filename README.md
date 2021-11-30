# API Fuego de Quasar

Esta API permite identificar la fuente y contenido del mensaje de auxulio de la nave imperial, mediante la triangulación con los satelites Kenobi, Skywalker y Sato.

## Tegnologías

La API esta desarrollada con el lenguaje TypeScript, un superconjunto de JavaScript, que añade tipados estáticos y objetos basados en clases, y el Framework Express JS, corriendo sobre el servidor Node. JS.

### Librerias

- **express** - Framework para el desarrollo de aplicaciones web
- **express-validator** - Middleware para la validación de parametros
- **node-localstorage** - Libreria para almacenar datos de Manera Local

## Requisitos para ejecutar la aplicación

Antes de comenzar con la descarga y ejecución de la aplicación, es necesario tener instalado en el equipo las siguientes aplicaciones:

- **git**
- **Node.js**

Adicional a esto, se recomienda la instalación de **Visual Studio Code** para la edición de código fuente.

## Descarga de repositorio

El codigo fuente de la API se encuentra versionado con git y está alojado en el repositorio GIT https://github.com/gopichardo/quasarfire-api.git

para descargar la solución del proyecto basta con clonar el repositorio con el siguiente comando:

```sh
git clone https://github.com/gopichardo/quasarfire-api.git
```

## Instalar dependencias

Antes de iniciar la palicación es necesario instalar las dependencias de la aplicación, para esto debe seguir los siguientes pasos:

```
npm i -g typescript nodemon
cd quasarfire-api
npm install
```

## Variables de entorno

Dentro del directorio de la solución exsite un archivo de conficuración **_.env_**, el cual contiene las siguientes vaiables de entorno que pueden ser modificadas para levantar la aplicación localmente.

```
API_URL=http://localhost
PORT=8085
```

## Iniciar Aplicación

Para iniciar la aplicacion basta con situarse dentro del directorio raiz de la solución, y ejecutar el siguiente comando

```
npm start
```

automaticamente el servidor Node.JS se levantará y la aplicación estará disponible en la url y puerto establecidos en las variables de entorno, ejemplo: http://localhost:8085

## Rutas de la API

A continuación se describen las diferentes rutas con las que cuenta la API, las cuales pueden ser accedidas desde la url base donde está levantada la aplicacion ejemplo: http://localhost:8085

### /api/status

**_Verbo HTTP_**: GET
**_Descripción_**: Muestra el estatus de la API
**_Formato de la Respuesta_**: Mensaje en texto plano del estatus de la API

```
Api Online!
```

### /api/topsecret

**_Verbo HTTP_**: POST
**_Descripción_**: Calcula la ubicación de la nave imperial y retorna el mensaje interceptado por los satelites
**_Parámetros de entrada_**:

- **Body**: Lista de Satelites con los mensajes interceptados y la distancia hacia la nave imperial

```
{
    "satellites": [
        {
            "name": "kenobi",
            "distance": 100.0,
            "message": [
                "este",
                "",
                "",
                "mensaje",
                ""
            ]
        },
        {
            "name": "skywalker",
            "distance": 115.5,
            "message": [
                "",
                "es",
                "",
                "",
                "secreto"
            ]
        },
        {
            "name": "sato",
            "distance": 142.7,
            "message": [
                "este",
                "",
                "un",
                "",
                ""
            ]
        }
    ]
}
```

**_Formato de la respuesta_**: JSON que contiene el mensaje y posición de la nave imperial, con sus coordenadas X,Y

```
{
    "message": "este es un mensaje secreto",
    "position": {
        "x": 775.62,
        "y": 5166.76
    }
}
```

### /api/topsecret_split/{satellite_name}

**_Verbo HTTP_**: POST
**_Descripción_**: Calcula la ubicación de la nave imperial y retorna el mensaje interceptado por los satelites
**_Parámetros de entrada_**:

- **Parámetro URL**: Nombre del Satelite

```
/api/topsecret_split/kenobi
```

- **Body**: Información del Satelite con el mensajes interceptado y la distancia hacia la nave imperial en formato JSON

```
{
    "distance": 100.0,
    "message": [
        "este",
        "",
        "",
        "mensaje",
        ""
    ]
}
```

**_Formato de la respuesta_**: Mensaje en texto plano que indica que la información se guardó correctamente

```
Información guardada correctamente
```

### /api/topsecret_split

**_Verbo HTTP_**: GET
**_Descripción_**: Calcula la ubicación de la nave imperial y retorna el mensaje interceptado por los satelites, con la información recolectada en la ruta /api/topsecret*split/{satellite_name}
\*\*\_Formato de la respuesta*\*\*: JSON que contiene el mensaje y posición de la nave imperial, con sus coordenadas X,Y

```
{
    "message": "este es un mensaje secreto",
    "position": {
        "x": 775.62,
        "y": 5166.76
    }
}
```