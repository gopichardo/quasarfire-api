import Position from "./Position.dto";

class Message {
    position: Position;
    message = "";


    constructor(message: string, x?: number | null | undefined, y?: number | null | undefined) {
        this.position = new Position(x, y);
        this.message = message;
    }
}

export default Message;