# 🛠️ Final Manual Configuration Required / Configuración Final Manual Requerida

## 📌 English

After generating the project, **some final manual steps are necessary** to integrate the generated views into your game logic:

1. 🔌 **Connect Events to Views:**
   - You must manually connect the generated forms (views) to the events or conditions that trigger them in your game.
   - Example: A `ModalForm` that opens when interacting with a character or reaching a specific location.

2. 🧩 **Assign Function Parameters:**
   - If any button is linked to a function (via `functionRef`), you must manually assign the **required parameters** for that function.
   - Parameters are not auto-generated due to the need for precise and custom behavior per use case.

3. ✅ **Review All Forms:**
   - Ensure that each view contains the correct components and logic.
   - Adjust or remove unused forms as needed.

> This final step is essential for ensuring that your game behaves exactly as intended. The generator provides structure; you provide the logic.

---

## 📌 Español

Después de generar el proyecto, es **necesario realizar algunos pasos finales manualmente** para integrar correctamente las vistas generadas con la lógica del juego:

1. 🔌 **Conectar Eventos con las Vistas:**
   - Debes conectar manualmente los formularios generados (vistas) con los eventos o condiciones que los activan en tu juego.
   - Ejemplo: Un `ModalForm` que se abre al interactuar con un personaje o llegar a cierta ubicación.

2. 🧩 **Asignar Parámetros a Funciones:**
   - Si algún botón está vinculado a una función (por medio de `functionRef`), debes asignar **manualmente los parámetros** que esa función necesita.
   - Los parámetros no se generan automáticamente para permitir personalización completa.

3. ✅ **Revisar Todos los Formularios:**
   - Verifica que cada vista contenga los componentes correctos y que tengan la lógica adecuada.
   - Ajusta o elimina formularios que no vayas a utilizar.

> Este paso final es esencial para que tu juego funcione exactamente como deseas. El generador proporciona la estructura, tú defines la lógica.

---