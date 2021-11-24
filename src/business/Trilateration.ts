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

            let distances = new Array<number>();
            let nodes = new Array<Node>();
            let i = 0;


            satellites.forEach((distance, node) => {
                distances.push(distance);
                nodes.push(node);
            });

            //Load Kenobi
            let X1 = nodes.find(x => x.name === "Kenobi")?.x;
            let Y1 = nodes.find(y => y.name === "Kenobi")?.y;
            let D1 = distances[0];

            //Load Skywalker
            let X2 = nodes.find(x => x.name === "Skywalker")?.x;
            let Y2 = nodes.find(x => x.name === "Skywalker")?.y;
            let D2 = distances[1];

            //Load Sato
            let X3 = nodes.find(x => x.name === "Sato")?.x;
            let Y3 = nodes.find(x => x.name === "Sato")?.y;
            let D3 = distances[2];



            //Getting X
            let Xa = (Y1! - Y3!) * (Math.pow(X1!, 2) - Math.pow(X2!, 2) + Math.pow(Y1!, 2) - Math.pow(Y2!, 2) - Math.pow(D1, 2) + Math.pow(D2, 2)) - (Y1! - Y2!) * (Math.pow(X1!, 2) - Math.pow(X3!, 2) + Math.pow(Y1!, 2) - Math.pow(Y3!, 2) - Math.pow(D1!, 2) + Math.pow(D3!, 2));
            let Xb = (2 * (X1! - X2!) * (Y1! - Y3!) - 2 * (X1! - X3!) * (Y1! - Y2!))

            let X4 = parseFloat((Xa / Xb).toFixed(2));

            //Getting Y
            let Y4 = 0;

            resolve(new Position(X4, Y4))
        });
    }

}

export default Trilateration;