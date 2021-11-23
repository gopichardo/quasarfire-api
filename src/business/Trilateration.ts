import Position from "../dtos/Position.dto";
import Node from "../dtos/Node.dto";

class Trilateration {


    /**
     * Get the unknow Node Position
     * @param distances Distances to the Unknow Node
     * @returns Node with positions
     */
    GetUnknowNodePosition(distances: Array<number>): Promise<Node> {
        return new Promise(async (resolve, reject) => {

            //Create Imperial Ship Object
            let imperialShip = new Node("Imperial");


            //Map Satellites and distances to imperial ship
            let satellites = new Map<Node, number>();

            // //Create Kenobi Satellite
            // let kenobi = new Node("Kenobi", -500, -200);

            // //Create Skywalker Satellite
            // let skywalker = new Node("Skywalker", 100, -100);

            // //Create Sato Satellite
            // let sato = new Node("Sato", 500, -100);

            //Create Kenobi Satellite
            let kenobi = new Node("Kenobi", 832.165, 5148.059);

            //Create Skywalker Satellite
            let skywalker = new Node("Skywalker", 741.264, 5242.310);

            //Create Sato Satellite
            let sato = new Node("Sato", 863.763, 5245.127);

            //Set satellites distances to imperial ship
            satellites.set(kenobi, distances[0]);
            satellites.set(skywalker, distances[1]);
            satellites.set(sato, distances[2]);

            let imperialShipPositions: Position;

            //Calculate the imperial ship position
            await this.GetPosition(satellites).then(position => {

                if (!position) {
                    reject("Posición no valida");
                }

                imperialShipPositions = position;
                imperialShip.setPosition(position);


                //return Imperial ship position
                resolve(imperialShip);

            }).catch(error => {
                reject(error);
            });
        });
    }


    /**
     * Get the Unknow Node position
     * @param satellites Satellites and distance to Unknow Node
     * @returns Position of Unknow Node
     */
    GetPosition(satellites: Map<Node, number>): Promise<Position> {
        return new Promise((resolve, reject) => {

            let x4 = 0;
            let y4 = 0;

            resolve(new Position(x4, y4))
        });
    }

}

export default Trilateration;