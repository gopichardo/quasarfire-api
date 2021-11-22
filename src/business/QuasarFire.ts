
"use strict"

const { Vector, calculate } = require("weighted-positioning");


class QuasarFire {

    constructor() {

    }

    /**
     * 
     * @param distances Distances from emitter
     * @returns Emiiter xy coordinates
     */
    GetLocation(distances: Float32Array[]): any {

        const kenobi = new Vector(-500, -200);
        const skywalker = new Vector(100, -100);
        const sato = new Vector(500, 100);

        let res = calculate([
            { v: kenobi, w: 100 },
            { v: skywalker, w: 115.5 },
            { v: sato, w: 142.7 },
        ]);

        console.log(
            "weighted-positioning - Coordenadas de la nave: X=",
            res.x,
            " Y=",
            res.y
          );

    }

    /**
     * Gets the emitter message
     * @param messages Messages from emmiter in each satellite
     * @returns Message from emmiter
     */
    GetMessage(messages: String[]): String {
        var message = "";

        return message;
    }
}

export default QuasarFire;