# 🛡️ Patrón de Diseño Proxy - Ejemplo Interactivo

Un ejemplo visual e interactivo del patrón de diseño **Proxy** implementado con React, TypeScript y Vite.

## 📋 Escenario

La agencia de inteligencia de Argentina tiene un documento confidencial en su sistema. Un hacker quiere perjudicar a la nación robando dicha información para venderla en la deepweb.

Por suerte, los ingenieros de la agencia diseñaron un **objeto Proxy** que:

- ✅ Registra todos los intentos de acceso (logs)
- ✅ Permite o deniega accesos según el usuario
- ✅ Devuelve información falsa a usuarios no autorizados
- ✅ El hacker queda satisfecho sin saber que fue engañado

## 🎮 Cómo usar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - El proyecto se ejecutará en `http://localhost:5173`

## 📱 Navegación

El proyecto cuenta con dos secciones principales:

### 🎮 Juego Interactivo
- Interfaz tipo juego donde puedes intentar acceder al documento
- Sistema de logs en tiempo real
- Usuarios predefinidos para probar
- Visualización de documentos reales y falsos

### 📐 Diagrama Visual
- Diagrama interactivo del flujo del patrón Proxy
- Animación paso a paso del proceso
- Selector de tipo de usuario (autorizado/no autorizado)
- Explicación visual de cada componente
- Beneficios del patrón
- Ejemplos de código

## 🏗️ Estructura del Patrón Proxy

### 1. **RealDocument** (Objeto Real)
- Contiene el documento confidencial real
- Solo el Proxy tiene acceso directo a él
- Ubicación: `src/proxy/RealDocument.ts`

### 2. **DocumentProxy** (Proxy)
- Actúa como intermediario entre el cliente y el objeto real
- Controla el acceso según el usuario
- Registra todos los intentos de acceso
- Devuelve información falsa a usuarios no autorizados
- Ubicación: `src/proxy/DocumentProxy.ts`

### 3. **Cliente** (Usuario/Hacker)
- Interactúa solo con el Proxy
- Nunca tiene acceso directo al objeto real
- No sabe si recibió información real o falsa

## 🎯 Usuarios de Prueba

### Usuarios Autorizados (Acceso Real):
- `director` 👔
- `agente007` 🕵️

### Usuarios No Autorizados (Reciben documento falso):
- `hacker_dark` 🦹‍♂️
- `anonymous_user` 🎭
- Cualquier otro nombre de usuario

## 🛠️ Tecnologías

- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **CSS3** - Estilos y animaciones

## 📚 Concepto del Patrón Proxy

El patrón Proxy proporciona un sustituto o marcador de posición para otro objeto para controlar el acceso a él. Es útil cuando:

- Se necesita control de acceso
- Se requiere logging de operaciones
- Se desea lazy loading
- Se necesita protección del objeto real

En este ejemplo, el Proxy actúa como un **Protection Proxy** que:
1. Valida las credenciales del usuario
2. Registra todos los intentos de acceso
3. Protege el documento real de accesos no autorizados
4. Engaña a los atacantes con información falsa

## 🎨 Características

- ✨ Interfaz visual atractiva y moderna
- 📊 Sistema de logs en tiempo real
- 🎭 Simulación de accesos autorizados y no autorizados
- 🎮 Experiencia interactiva tipo juego
- 📱 Diseño responsive

## 📖 Aprendizaje

Este proyecto es ideal para:
- Entender el patrón de diseño Proxy
- Ver una aplicación práctica del patrón
- Aprender sobre control de acceso y seguridad
- Practicar React y TypeScript

---

💡 **Nota:** Este es un ejemplo educativo del patrón de diseño Proxy. En aplicaciones reales, la seguridad debe implementarse en el backend, no en el frontend.

