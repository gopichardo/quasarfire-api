import Position from "./Position.dto";

class Node extends Position {
    name: string = "";


    constructor(name: string, x?: number | null, y?: number | null) {
        super(x, y);
        this.name = name;
    }
}

export default Node;