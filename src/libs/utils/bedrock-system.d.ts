declare module "bedrockSystem" {
    class BedrockSystem {
        constructor() { }
        log(...data) {
            const dataFormat = []
            data.forEach(element => {
                if (isJSON(element)) {
                    dataFormat.push(format(element))
                } else {
                    dataFormat.push(element)
                }
            });
            console.warn(...dataFormat)
        }

        warn(...data) {
            const dataFormat = []
            data.forEach(element => {
                if (isJSON(element)) {
                    dataFormat.push(format(element, { type: 'r§6' }))
                } else {
                    dataFormat.push(`§6${element}`)
                }
            });
            console.warn(...dataFormat)
        }

        error(...data) {
            const dataFormat = []
            data.forEach(element => {
                if (isJSON(element)) {
                    dataFormat.push(format(element, { type: 'r§4' }))
                } else {
                    dataFormat.push(`§4${element}`)
                }
            });
            console.warn(...dataFormat)
        }
    }


    const isJSON = (output) => {
        if (typeof (output) != "string") {
            return true; // La cadena es un JSON válido
        } else {
            return false; // La cadena no es un JSON válido
        }
    }


    /**
     * Formatea un valor dado en una cadena de texto, aplicando varias opciones de formato.
     *
     * @param {any} value - El valor que se va a formatear.
     * @param {Object} [options={}] - Opciones para personalizar el formato.
     * @param {string} [options.type='r'] - Tipo de formateo para los códigos de color.
     * @param {number} [options.maxDepth=Infinity] - Profundidad máxima para la recursión al formatear objetos anidados.
     * @param {number} [options.lineLength=40] - Longitud máxima de una línea antes de insertar saltos de línea.
     * @param {boolean} [options.arrayIndex=true] - Si se deben incluir los índices de los elementos del array en el formato.
     * @param {boolean} [options.hideFunction=false] - Si se deben ocultar las funciones en la salida formateada.
     * @returns {string} - Cadena de texto que representa el valor formateado, con códigos de color opcionales.
     */
    const format = (value: any, options: { type?: string, maxDepth?: number, lineLength?: number, arrayIndex?: boolean, hideFunction?: boolean} = {}): string => {
        // Tipo de color predeterminado.
        let type = 'r';
        // Indica si se deben omitir los códigos de color en la salida.
        const noColor = false;
    
        // Opciones predeterminadas.
        const defaultOptions = {
            maxDepth: Infinity,
            lineLength: 40,
            arrayIndex: true,
            hideFunction: false,
        };
    
        // Sobrescribir el tipo si se proporciona en las opciones.
        if (options.type) {
            type = options.type;
        }
    
        // Combinar opciones predeterminadas con las opciones proporcionadas.
        options = { ...defaultOptions, ...options };
    
        // Funciones de formateo para diferentes tipos de datos.
        const f = {
            string: (v) => `§6"${v}"§${type}`,
            number: (v) => `§a${v}§${type}`,
            boolean: (v) => `§s${v}§${type}`,
            'null': () => `§7null§${type}`,
            'undefined': () => `§7undefined§${type}`,
            'class': (v) => `§g[class ${v.name}]§${type}`,
            'function': (v) => `§5§oƒ§${type} §e${v.name ?? ''}()§${type}`,
            'constructor': (v) => `§l§7${v}§${type}`,
            'index': (v) => `§7${v}§${type}`,
            circular: () => `§c[Circular]§${type}`,
            omission: () => `§7...§${type}`
        };
    
        // Función para verificar si un objeto es una clase.
        function isClass(obj) {
            return obj.toString().startsWith("class ");
        }
    
        // Función para verificar si un valor es un objeto (pero no null ni un array).
        function isObject(obj) {
            return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
        }
    
        // Función recursiva para construir la representación formateada.
        function run(value, result, step, stack) {
            // Función para insertar un salto de línea.
            const nextLine = () => '\n';
            // Función para aplicar la indentación.
            const indent = (s) => ' '.repeat(2 * s);
            // Función para formatear corchetes.
            const bracket = (b) => step % 2 ? `§e${b}§${type}` : `§d${b}§${type}`;
            // Función para iniciar un bloque con corchetes.
            const startBracket = (b, line) => result += (line ? nextLine() : '') + bracket(b);
            // Función para finalizar un bloque con corchetes.
            const endBracket = (b, line) => result += (line ? `${nextLine()}${indent(step - 1)}` : '') + bracket(b);
    
            // Formatear diferentes tipos de valores.
            if (typeof value === 'string') return result += f.string(value);
            if (typeof value === 'number') return result += f.number(value);
            if (typeof value === 'boolean') return result += f.boolean(value);
            if (typeof value === 'function') {
                if (isClass(value)) return result += f.class(value);
                else return result += f.function(value);
            }
            if (typeof value === 'undefined') return result += f.undefined();
            if (value === null) return result += f.null();
    
            // Formatear objetos.
            if (isObject(value)) {
                // Detectar estructuras circulares.
                for (const _value of stack) {
                    if (_value === value) return result += f.circular();
                }
                // Incluir el nombre del constructor.
                if (value.__proto__) result += f.constructor(value.__proto__.constructor.name) + ' ';
                startBracket('{');
                let short;
                if (step >= options.maxDepth) {
                    result += ` ${f.omission()} `;
                    short = true;
                } else {
                    stack.push(value);
                    const entries = [];
                    for (const key in value) {
                        const v = value[key];
                        if (!options.hideFunction && typeof v === 'function') continue;
                        const formatted = run(v, '', step + 1, stack);
                        const k = key.match(/\.|\//) ? `"${key}"` : key;
                        entries.push(`${k}: ${formatted}`);
                    }
                    short = entries.reduce((a, b) => a + b.length, 0) < options.lineLength;
                    result += short
                        ? (entries.length > 0 ? ` ${entries.join(', ')} ` : '')
                        : `\n${indent(step)}` + entries.join(',\n' + indent(step));
                    stack.pop();
                }
                endBracket('}', !short);
                return result;
            }
    
            // Formatear arrays.
            if (Array.isArray(value)) {
                // Detectar estructuras circulares.
                for (const _value of stack) {
                    if (_value === value) return result += f.circular();
                }
                result += f.constructor(`Array(${value.length}) `);
                startBracket('[');
                let short;
                if (step >= options.maxDepth) {
                    result += ` ${f.omission()} `;
                    short = true;
                } else {
                    stack.push(value);
                    const entries = [];
                    for (const index in value) {
                        const v = value[index];
                        if (!options.hideFunction && typeof v === 'function') continue;
                        const formatted = run(v, '', step + 1, stack);
                        entries.push((options.arrayIndex ? `${f.index(index)}: ` : '') + formatted);
                    }
                    short = entries.reduce((a, b) => a + b.length, 0) < options.lineLength;
                    result += short
                        ? (entries.length > 0 ? ` ${entries.join(', ')} ` : '')
                        : `\n${indent(step)}` + entries.join(',\n' + indent(step));
                    stack.pop();
                }
                endBracket(']', !short);
                return result;
            }
    
            // Devolver la representación de otros tipos de valores como cadena.
            return String(value);
        }
    
        // Ejecutar la función de formateo recursiva.
        const res = run(value, '', 1, []);
    
        // Devolver el resultado con o sin códigos de color.
        return noColor ? res.replace(/§./g, '') : res;
    }



    export const shell = new BedrockSystem();
}