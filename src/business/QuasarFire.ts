import { Absolute2DPosition, AbsolutePosition, DataObject, LengthUnit, MultilaterationNode, RelativeDistance } from "@openhps/core";

class QuasarFire {

    constructor() {

    }

    /**
     * 
     * @param distances Distances from emitter
     * @returns Emiiter xy coordinates
     */
    GetLocation(distances: Float32Array[]): any {

        // Create imperial Ship
        var imperialShip = new DataObject("", "Imperial Ship");

        //Create Satellites
        var kenobi = new DataObject("", "Kenobi Satellite").setPosition(
            new Absolute2DPosition(-500, -200, LengthUnit.UNKNOWN));

        var skywalker = new DataObject("", "Skywalker Satellite").setPosition(
            new Absolute2DPosition(100, -100, LengthUnit.UNKNOWN));

        var sato = new DataObject("", "Sato Satellite").setPosition(
            new Absolute2DPosition(500, 100, LengthUnit.UNKNOWN));;

        kenobi.setParent(imperialShip);
        skywalker.setParent(imperialShip);
        sato.setParent(imperialShip);


        var multilateration = new MultilaterationNode();

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