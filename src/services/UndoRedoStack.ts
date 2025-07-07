import type { EntryTypes } from "../models/Form";

export class UndoRedoStack {
	private static undoStack: EntryTypes[][] = [];
	private static redoStack: EntryTypes[][] = [];

	public static clear(): void {
		this.undoStack = [];
		this.redoStack = [];
	}

	/** Guarda el estado actual en el stack de undo y limpia el redo */
	public static pushUndoClearRedo(entries: EntryTypes[]): void {
		this.undoStack.push(this.clone(entries));
		this.redoStack = [];
	}

	/** Guarda el estado actual en el stack de undo */
	public static pushUndo(entries: EntryTypes[]): void {
		this.undoStack.push(this.clone(entries));
	}

	/** Deshace y devuelve el último estado, guardándolo en redo */
	public static undo(current: EntryTypes[]): EntryTypes[] | null {
		if (!this.canUndo()) return null;
		const prev = this.undoStack.pop();
		if (prev) {
			this.redoStack.push(this.clone(current));
			return prev;
		}
		return null;
	}

	/** Rehace y devuelve el último estado, guardándolo en undo */
	public static redo(current: EntryTypes[]): EntryTypes[] | null {
		if (!this.canRedo()) return null;
		const next = this.redoStack.pop();
		if (next) {
			this.undoStack.push(this.clone(current));
			return next;
		}
		return null;
	}

	public static canUndo(): boolean {
		return this.undoStack.length > 0;
	}

	public static canRedo(): boolean {
		return this.redoStack.length > 0;
	}

	private static clone(entries: EntryTypes[]): EntryTypes[] {
		return JSON.parse(JSON.stringify(entries));
    }
    

    public static getTestUndo(): EntryTypes[][] {
        return this.undoStack
    }

    public static getTestRedo(): EntryTypes[][] {
        return this.redoStack
    }
}
