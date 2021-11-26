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
    GetKey(key: string): string | null {

        let value = this.localStorage.getItem(key);

        return value;
    }

    /**
     * Set Key to Storage
     * @param key Key
     * @param value Value
     */
    SetKey(key: string, value: string) {

        this.localStorage.setItem(key, value);
    }

}

export default Storage;