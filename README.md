# Day Bills Tracker

Una aplicación web moderna para el control de gastos diarios, desarrollada con Next.js, TypeScript y Firebase.

## Características

- 📅 **Vista de Calendario Interactivo** - Visualiza tus gastos en un calendario mensual
- 💰 **Categorías de Gastos** - Organiza tus gastos en: Comida, Transporte y Otros
- 📊 **Resúmenes Automáticos** - Ve el total gastado por categoría en cada período
- 🔥 **Firebase Integration** - Base de datos en tiempo real con Firestore
- 📱 **Diseño Responsive** - Funciona perfectamente en móviles y escritorio
- 🎨 **UI Moderna** - Interfaz limpia y fácil de usar con Tailwind CSS

## Tecnologías Utilizadas

- **Frontend**: Next.js 16 con TypeScript
- **Estilos**: Tailwind CSS 4
- **Base de Datos**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Iconos**: Lucide React
- **Manejo de Fechas**: date-fns

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/IsaiasFer/day-bills-tracker.git
cd day-bills-tracker
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura Firebase:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Activa Firestore Database
   - Copia las credenciales de configuración

4. Configura las variables de entorno:
   - Copia `.env.example` a `.env.local`
   - Actualiza los valores con tus credenciales de Firebase

```bash
cp .env.example .env.local
```

5. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Uso

### Agregar un Gasto

1. Selecciona una fecha en el calendario
2. Haz clic en "Agregar Gasto"
3. Elige la categoría (Comida, Transporte u Otros)
4. Ingresa el monto y una descripción opcional
5. Haz clic en "Agregar"

### Ver Resumen

El panel lateral muestra automáticamente:
- Total gastado en el mes actual
- Desglose por categoría con porcentajes
- Gráficos visuales de distribución

### Eliminar un Gasto

1. Selecciona la fecha del gasto en el calendario
2. Haz clic en el ícono de basura junto al gasto que deseas eliminar
3. Confirma la eliminación

## Despliegue en Firebase

1. Instala Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Inicia sesión en Firebase:
```bash
firebase login
```

3. Inicializa tu proyecto:
```bash
firebase init
```
   - Selecciona Hosting y Firestore
   - Usa el directorio `out` para hosting
   - Configura como single-page app

4. Construye la aplicación:
```bash
npm run build
```

5. Despliega a Firebase:
```bash
firebase deploy
```

## Estructura del Proyecto

```
day-bills-tracker/
├── app/                    # Páginas de Next.js
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout de la aplicación
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── CalendarView.tsx   # Vista del calendario
│   ├── ExpenseForm.tsx    # Formulario de gastos
│   ├── ExpenseList.tsx    # Lista de gastos
│   └── SummaryPanel.tsx   # Panel de resumen
├── lib/                   # Utilidades y servicios
│   ├── firebase.ts        # Configuración de Firebase
│   ├── expenseService.ts  # Servicio de gastos
│   └── utils.ts           # Funciones auxiliares
├── types/                 # Tipos de TypeScript
│   └── expense.ts         # Tipos de gastos
├── public/                # Archivos estáticos
├── firebase.json          # Configuración de Firebase
├── firestore.rules        # Reglas de seguridad de Firestore
├── firestore.indexes.json # Índices de Firestore
└── package.json           # Dependencias del proyecto
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Autor

IsaiasFer

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
