import type { Node } from "@xyflow/react";
import type { EntrieNode, EntryEdge } from "../components/editor/EntrieNode";
import type { EntryTypes } from "../models/Form";

export const makeNodeEntries = (entries: EntryTypes[]): (EntrieNode | Node)[] => {
    const leftColumnX = 50;
    const rightColumnX = 400; // o el ancho deseado entre columnas
    const verticalSpacing = 200;

    let leftY = 50;
    let rightY = 50;

    return entries.map((entry) => {
        if (!entry) return {
            id: `${crypto.randomUUID()}`,
            position: {
                x: 0,
                y: 0
            },
            data: { void: "" },
        };
        const isFunction = entry.type === "Function";
        const position = isFunction
            ? { x: rightColumnX, y: rightY }
            : { x: leftColumnX, y: leftY };

        // Incrementar la posición vertical para el siguiente nodo
        if (isFunction) {
            rightY += verticalSpacing;
        } else {
            leftY += verticalSpacing;
        }

        return {
            id: `${entry.formRef}:${entry.type}`,
            type: "entry",
            position,
            data: { entry },
        };
    });
}


export const makeEdgeEntries = (entries: EntryTypes[]) => {
    return entries.flatMap((entry) => {
        if (!entry) return [];
        if (
            entry.type !== "ActionForm" &&
            entry.type !== "MessageForm" &&
            entry.type !== "ModalForm"
        ) return [];

        return entry.components.map((component, index) => {
            const isButton =
                component.type === "button" ||
                component.type === "button1" ||
                component.type === "button2";

            if (!isButton || !component.data.functionRef) return null;

            const source = `${entry.formRef}:${entry.type}`;
            const target = `${component.data.functionRef}:${component.data.typeOfRef}`;
            const sourceHandle = `${entry.formRef}:button:${index}`;
            const targetHandle = target;

            return {
                id: `${sourceHandle}->${targetHandle}`,
                source,
                sourceHandle,
                target,
                targetHandle,
                style: { stroke: '#007BFF', strokeWidth: 2 }
            };
        });
    }).filter(Boolean) as EntryEdge[];
}