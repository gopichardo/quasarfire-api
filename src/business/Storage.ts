import { LocalStorage } from "node-localstorage";


class Storage {
    localStorage: LocalStorage;


    constructor() {
        this.localStorage = new LocalStorage("./scratch");
    }


    /**
     * Get Key from Storage
     * @param key Key
     * @returns Value
     */
    GetKey(key: string): string {

        let value = this.localStorage.getItem(key);

        return value!;
    }

    /**
     * Set Key to Storage
     * @param key Key
     * @param value Value
     */
    SetKey(key: string, value: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                this.localStorage.setItem(key, value);
                resolve(true);
            } catch (error) {
                reject("Error al guardar información");
            }
        });
    }

    /**
     * Delete Key from storage
     * @param key Key
     */
    DeleteKey(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                this.localStorage.removeItem(key);
                resolve(true);
            } catch (error) {
                reject("Error al eliminar información");
            }
        });
    }
}

export default Storage;