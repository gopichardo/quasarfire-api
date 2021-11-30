import Position from "./Position.dto";

class Satellite extends Position {
    name: string;
    distance: number;
    message: Array<string>;

    constructor(name: string, distance: number, message: Array<string>) {
        super();
        this.name = name;
        this.distance = distance;
        this.message = message;
    }

}

export default Satellite;