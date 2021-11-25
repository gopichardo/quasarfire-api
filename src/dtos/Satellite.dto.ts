class Satellite {
    name: string;
    distance: number;
    message: Array<string>;

    constructor(name: string, distance: number, message: Array<string>) {
        this.name = name;
        this.distance = distance;
        this.message = message;
    }

}

export default Satellite;