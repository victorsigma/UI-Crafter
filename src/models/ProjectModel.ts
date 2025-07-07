import type { EntryTypes } from "./Form";

export interface ProjectModel { id: string, name: string, src?: string, data: { entries: EntryTypes[] } }


export const defaultProjectModel: ProjectModel = {
    id: "",
    name: "",
    src: "",
    data: {
        entries: []
    }
}