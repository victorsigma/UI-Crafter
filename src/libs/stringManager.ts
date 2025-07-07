export const toCamelCase = (string: string) => {
    return string
        .trim()
        .replace(/^[A-Z]/, c => c.toLowerCase()) // primera letra en minúscula si está en mayúscula
        .replace(/[-_ ]+([a-zA-Z])/g, (_, letter) => letter.toUpperCase()).replace(/ /g, "");
}

export const toSnakeCase = (string: string) => {
    return string.replace(/ /g, "_").toLowerCase()
}

export const getDeclaredParams = (content: string): string[] | null => {
    const match = content.match(
        /^(?:export\s+)?(?:function\s+\w+\s*\(([^)]*)\)|const\s+\w+\s*=\s*\(([^)]*)\)\s*=>)/m
    );
    if (!match) return null;

    const rawParams = match[1] || match[2];
    return rawParams.split(',').map(p => p.trim()).filter(Boolean);
};


export const updateFunctionSignature = (content: string, newParams: string[]): string => {
    return content.replace(
        /function\s+\w+\s*\([^)]*\)/,
        match => match.replace(/\([^)]*\)/, `(${newParams.join(", ")})`)
    ).replace(
        /const\s+\w+\s*=\s*\([^)]*\)\s*=>/,
        match => match.replace(/\([^)]*\)/, `(${newParams.join(", ")})`)
    );
}

export const asParamString = (obj: any): string => {
    const formatValue = (val: any): string => {
        if (typeof val === "string") {
            return `"${val}"`;
        } else if (Array.isArray(val)) {
            return JSON.stringify(val);
        } else if (typeof val === "object" && val !== null) {
            const entries = Object.entries(val)
                .map(([k, v]) => `${k}: ${formatValue(v)}`);
            return `{ ${entries.join(", ")} }`;
        } else {
            return String(val);
        }
    };

    return Object.values(obj).map(formatValue).join(", ");
};