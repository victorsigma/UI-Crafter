import { ActionFormRules, MessageFormRules, ModalFormRules, type EntryTypesForms, type EntryTypesWithComponents, type FormComponents, type McFunction } from "../models/Form";
import { componentBaseMap } from "./componentBaseMap";
import { toCamelCase } from "./stringManager";


const newEntrieComponents = {
    "ActionForm": [],
    "MessageForm": [{ type: "button1", data: { text: "Button 1", } },
    { type: "button2", data: { text: "Button 2", } }],
    "ModalForm": [{ type: "submitButton", data: { submitButton: "Submit", } }]
}


export const makeNewEntrieForm = (entrieName: string, entrieType: string): EntryTypesForms => {
    const newEntrie: EntryTypesWithComponents =
    {
        type: entrieType as "ActionForm" | "MessageForm" | "ModalForm",
        name: entrieName,
        formRef: toCamelCase(entrieName),
        params: ['source'],
        components: []
    }

    newEntrie.components.push({
        type: "title",
        data: {
            titleText: entrieName,
        }
    });

    const newComponets = newEntrieComponents[newEntrie.type] as FormComponents[]

    newEntrie.components.push(...newComponets)

    return newEntrie as EntryTypesForms
}

export const makeNewFunction = (functionName: string): McFunction => {
    const content = contentFunction.replace("fun.name.replace", toCamelCase(functionName))

    const newFunction: McFunction =
    {
        type: "Function",
        name: functionName,
        formRef: toCamelCase(functionName),
        params: [],
        content
    }

    return newFunction
}


const contentFunction = `import { world } from "@minecraft/server"
import { shell } from "BedrockSystem"

export const fun.name.replace = () => {
    shell.log(world.getPlayers())
}`



export const addComponentEntrie = (type: keyof typeof componentBaseMap, entry: EntryTypesForms): EntryTypesForms | { type: "Error" | "Alert", message: string } => {
    const newComponent = { ...getBaseComponent(type) };

    if (newComponent.type === "null") return { type: "Alert", message: "You should select an option." };


    // Determina la regla correcta
    let rules: Record<string, number> = {};

    switch (entry.type) {
        case "ActionForm":
            rules = ActionFormRules as Record<string, number>;
            break;
        case "MessageForm":
            rules = MessageFormRules as Record<string, number>;
            break;
        case "ModalForm":
            rules = ModalFormRules as Record<string, number>;
            break;
        default:
            return { type: "Error", message: "Opp you should not be able to do that." };
    }

    // Verifica si ya alcanzó el límite
    const existingCount = entry.components.filter(c => c.type === newComponent.type).length;
    const limit = rules[newComponent.type];

    if (existingCount >= limit) {
        return { type: "Alert", message: `You cannot add more than ${limit} "${newComponent.type}"` };
    }

    const updatedEntry = {
        ...entry,
        components: [...entry.components, newComponent],
    };

    return updatedEntry as EntryTypesForms
}


export const getBaseComponent = (type: keyof typeof componentBaseMap) => {
    return componentBaseMap[type];
};
