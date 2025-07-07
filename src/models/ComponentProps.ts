import type { EntryTypes, EntryTypesForms, SelectEntrie } from "./Form";

export interface EntryComponentProps<T> {
    selectEntrie: SelectEntrie | null;
    updateEntrie: EntryTypes | null;
    updateComponent: T;
    setUpdateComponent: (id: T) => void;
    setUpdateEntrie: (id: EntryTypes | null) => void;
}


export interface RenderComponentProps<T> {
    viewEntrie: EntryTypesForms
    component: T
    i: number
}