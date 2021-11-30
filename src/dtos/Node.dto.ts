import Position from "./Position.dto";

class Node extends Position {
    name: string = "";
    distance: number;



    constructor(name: string, x?: number | null, y?: number | null) {
        super(x, y);
        this.name = name;
        this.distance = 0;
    }

    setDistance(distance: number) {
        this.distance = distance!;
    }
}

export default Node;