class Position {
    x?: number | null = 0;
    y?: number | null = 0;

    constructor(x?: number | null, y?: number | null) {
        this.x = x;
        this.y = y;
    }

    setPosition(position: Position) {
        this.x = position.x;
        this.y = position.y;
    }
}

export default Position;