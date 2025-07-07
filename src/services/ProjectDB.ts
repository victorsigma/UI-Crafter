// services/projectDB.ts
import { openDB } from 'idb';
import type { ProjectModel } from '../models/ProjectModel';

const DB_NAME = 'ui-craft-db';
const STORE_NAME = 'projects';

const dbPromise = openDB(DB_NAME, 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains(STORE_NAME)) {
			db.createObjectStore(STORE_NAME, { keyPath: 'id' });
		}
	},
});

export const ProjectDB = {
	async addProject(project: ProjectModel) {
		const db = await dbPromise;
		await db.put(STORE_NAME, project);
	},

	async getProject(id: string): Promise<ProjectModel> {
		const db = await dbPromise;
		return db.get(STORE_NAME, id);
	},

	async getAllProjects(): Promise<ProjectModel[]> {
		const db = await dbPromise;
		return db.getAll(STORE_NAME);
	},

	async updateProject(project: ProjectModel) {
		const db = await dbPromise;
		await db.put(STORE_NAME, project)
	},

	async deleteProject(id: string) {
		const db = await dbPromise;
		return db.delete(STORE_NAME, id);
	}
};
