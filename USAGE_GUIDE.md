# Guía de Uso - Day Bills Tracker

Esta guía te ayudará a comenzar a usar la aplicación de seguimiento de gastos diarios.

## Primeros Pasos

### 1. Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/IsaiasFer/day-bills-tracker.git
cd day-bills-tracker

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Firebase

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 2. Configuración de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Activa **Firestore Database**:
   - Ve a "Build" > "Firestore Database"
   - Haz clic en "Create database"
   - Selecciona modo de prueba (para desarrollo)
4. Obtén las credenciales de tu proyecto:
   - Ve a "Project Settings" (⚙️)
   - En "Your apps", selecciona la app web
   - Copia las credenciales de configuración
5. Pega las credenciales en `.env.local`

## Uso de la Aplicación

### Vista del Calendario

Al abrir la aplicación, verás un calendario mensual con:
- **Días del mes** en formato de cuadrícula
- **Día actual** resaltado con un borde verde
- **Día seleccionado** resaltado con un borde azul
- **Indicadores de gastos** (puntos de colores) en días con gastos registrados

### Navegación del Calendario

- **Mes anterior**: Haz clic en la flecha izquierda (◀)
- **Mes siguiente**: Haz clic en la flecha derecha (▶)
- **Ir a hoy**: Haz clic en el botón "Hoy"
- **Seleccionar día**: Haz clic en cualquier fecha del calendario

### Agregar un Gasto

1. Selecciona la fecha deseada en el calendario
2. Haz clic en el botón **"Agregar Gasto"**
3. En el formulario modal:
   - **Fecha**: Se muestra automáticamente (no editable)
   - **Categoría**: Selecciona una de las tres opciones:
     - 🍽️ **Comida** (verde)
     - 🚌 **Transporte** (azul)
     - 📦 **Otros** (morado)
   - **Monto**: Ingresa el valor en pesos argentinos (ARS)
   - **Descripción** (opcional): Agrega detalles como "Almuerzo", "Uber", etc.
4. Haz clic en **"Agregar"**

El gasto se guardará en la base de datos y aparecerá en:
- La lista de gastos del día
- El calendario (indicador de color)
- El resumen mensual

### Ver Gastos de un Día

1. Haz clic en cualquier día del calendario
2. La sección inferior muestra todos los gastos de ese día
3. Cada gasto muestra:
   - Ícono y color de la categoría
   - Nombre de la categoría
   - Descripción (si se agregó)
   - Monto
   - Botón para eliminar (🗑️)

### Eliminar un Gasto

1. Selecciona el día con el gasto a eliminar
2. En la lista de gastos, haz clic en el ícono de basura (🗑️)
3. Confirma la eliminación en el diálogo

### Panel de Resumen

El panel derecho muestra un resumen del mes actual:

- **Período**: Fechas de inicio y fin del mes
- **Total Gastado**: Suma de todos los gastos del mes en ARS
- **Desglose por Categoría**:
  - Comida: Total y porcentaje
  - Transporte: Total y porcentaje
  - Otros: Total y porcentaje
- **Barras de Progreso**: Visualización proporcional del gasto por categoría

### Entender los Indicadores

En el calendario, cada día con gastos muestra:
- **Punto verde** 🟢: Hay gastos de comida
- **Punto azul** 🔵: Hay gastos de transporte
- **Punto morado** 🟣: Hay gastos de otros
- **Monto total**: Se muestra debajo de los puntos

## Consejos de Uso

### Organización

- Registra tus gastos diariamente para un mejor seguimiento
- Usa descripciones detalladas para identificar patrones
- Revisa el resumen mensual regularmente

### Categorías

- **Comida**: Supermercado, restaurantes, delivery, café
- **Transporte**: Combustible, transporte público, taxis, peajes
- **Otros**: Entretenimiento, ropa, servicios, misceláneos

### Planificación

- Observa los porcentajes por categoría
- Identifica en qué categorías gastas más
- Establece objetivos de ahorro basados en los datos

## Atajos de Teclado

La aplicación actualmente no tiene atajos de teclado, pero puedes:
- Hacer Tab para navegar entre campos del formulario
- Presionar Enter para enviar el formulario
- Presionar Esc para cerrar modales (próximamente)

## Problemas Comunes

### "Error al agregar el gasto"
- Verifica tu conexión a internet
- Asegúrate de que Firebase esté configurado correctamente
- Revisa las reglas de Firestore

### Los datos no se cargan
- Verifica las credenciales en `.env.local`
- Comprueba que Firestore esté habilitado en Firebase Console
- Revisa la consola del navegador para errores

### La aplicación está lenta
- Firebase puede tardar en cargar la primera vez
- Los datos se cachean después de la primera carga
- En producción, considera usar índices de Firestore

## Próximas Funciones (Roadmap)

- 🔐 Autenticación de usuarios
- 📊 Gráficos y estadísticas avanzadas
- 📅 Vista semanal y anual
- 💾 Exportar datos a CSV/Excel
- 🔍 Búsqueda y filtros avanzados
- 📱 Aplicación móvil nativa
- 🌙 Modo oscuro
- 💱 Soporte para múltiples monedas

## Soporte

Si encuentras problemas o tienes sugerencias:
1. Abre un issue en el repositorio de GitHub
2. Incluye detalles sobre el error
3. Adjunta capturas de pantalla si es posible

---

¡Disfruta usando Day Bills Tracker! 💰📊
