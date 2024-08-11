# Proyecto de Aplicación de Portal Paciente

Este proyecto es una aplicación de portal para pacientes que permite a los usuarios iniciar sesión y ver información sobre sus recetas médicas. Está compuesto por varias páginas y utiliza React para el renderizado y manejo de estado.

## Forma de Entrega

1. **Repositorio Git:** El proyecto se encuentra en un repositorio público de Git. Puedes acceder a él mediante el siguiente enlace: [Enlace al Repositorio](https://github.com/GonzaloBeristain/PruebaTecnica1.git).

## Implementación de SSR y CSR

### SSR (Server-Side Rendering)

Este proyecto utiliza **Server-Side Rendering (SSR)** para mejorar la velocidad de carga inicial y la optimización para motores de búsqueda. La página se renderiza en el servidor antes de ser enviada al cliente, lo que resulta en una experiencia de usuario más rápida y un mejor SEO.

### CSR (Client-Side Rendering)

**Client-Side Rendering (CSR)** es utilizado para manejar interacciones dinámicas del usuario después de que la página se ha cargado. React se encarga de renderizar el contenido en el cliente, lo que permite una experiencia de usuario interactiva y fluida.

## Pruebas con Jest y React Testing Library

Se han implementado pruebas utilizando Jest y React Testing Library para garantizar el correcto funcionamiento del proceso de autenticación, el manejo de tokens y el almacenamiento en `localStorage`.

### Objetivos de las Pruebas

- **Verificar Autenticación:** Asegurar que el proceso de inicio de sesión funcione correctamente.
- **Manejo de Tokens:** Confirmar que el token se almacene y recupere correctamente desde `localStorage`.
- **Almacenamiento de Datos:** Validar que el perfil del usuario se guarde y se recupere adecuadamente.

### Herramientas Utilizadas

- **Jest** 
- **React Testing Library**

## Ejecutar Dependencias, Servidor, y Pruebas

Para instalar dependencias, ejecutar el servidor y ejecutar las pruebas, usa los siguientes comandos:

```bash
npm install

npm run dev

npm test 