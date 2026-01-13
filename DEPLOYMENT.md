# Guía de Despliegue en Firebase

Este documento proporciona instrucciones detalladas para desplegar la aplicación Day Bills Tracker en Firebase.

## Opción 1: Despliegue con Vercel (Recomendado para Next.js)

La forma más sencilla de desplegar una aplicación Next.js es usar Vercel:

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno de Firebase en Vercel
4. Haz clic en "Deploy"

## Opción 2: Despliegue en Firebase Hosting

### Requisitos Previos

- Node.js 18+ instalado
- Firebase CLI instalado: `npm install -g firebase-tools`
- Un proyecto de Firebase creado

### Pasos para el Despliegue

1. **Inicia sesión en Firebase**
   ```bash
   firebase login
   ```

2. **Inicializa Firebase en tu proyecto** (si no lo has hecho)
   ```bash
   firebase init
   ```
   - Selecciona "Hosting" y "Firestore"
   - Elige tu proyecto de Firebase existente o crea uno nuevo
   - Para el directorio público, usa `.next`
   - Configura como single-page app: Sí
   - No sobrescribas archivos existentes

3. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` con tus credenciales de Firebase:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
   ```

4. **Despliega las reglas de Firestore**
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   ```

5. **Construye y despliega la aplicación**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

   O usa el comando combinado:
   ```bash
   npm run deploy
   ```

## Opción 3: Despliegue con Firebase Functions (SSR)

Para aprovechar Server-Side Rendering de Next.js con Firebase:

1. Instala las dependencias necesarias:
   ```bash
   npm install -g firebase-tools
   npm install firebase-admin firebase-functions
   ```

2. Inicializa Firebase Functions:
   ```bash
   firebase init functions
   ```

3. Configura Next.js para exportación:
   En `next.config.ts`, agrega:
   ```typescript
   const nextConfig = {
     output: 'export',
     distDir: 'out',
   };
   ```

4. Despliega:
   ```bash
   firebase deploy
   ```

## Configuración de Firestore

Asegúrate de que las reglas de Firestore estén correctamente configuradas:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expenseId} {
      // Recomendación: Agrega autenticación en producción
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANTE:** En producción, debes agregar reglas de autenticación apropiadas.

## Verificación del Despliegue

Después del despliegue:

1. Visita la URL proporcionada por Firebase
2. Verifica que el calendario se cargue correctamente
3. Prueba agregar un gasto
4. Verifica que los datos se guarden en Firestore

## Solución de Problemas

### Error: "Firebase not configured"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que el archivo `.env.local` no esté en `.gitignore`

### Error: "Permission denied"
- Revisa las reglas de Firestore
- Verifica que el proyecto de Firebase esté activo

### Error de compilación
- Ejecuta `npm run build` localmente para verificar errores
- Revisa que todas las dependencias estén instaladas

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Documentación de Firestore](https://firebase.google.com/docs/firestore)
