import Position from "../dtos/Position.dto";
import Node from "../dtos/Node.dto";

class Trilateration {

    //Satellites List
    private currentSatellitesPositions = new Array<Node>();

    /**
     * Constructor
     * @param satellites Satellites configuration
     */
    constructor(satellites: Array<Node>) {
        this.currentSatellitesPositions = satellites;
    }


    /**
     * Get the unknow Node Position
     * @param distances Distances to the Unknow Node
     * @returns Node with positions
     */
    GetUnknowNodePosition(distances: Array<number>): Promise<Node> {
        return new Promise(async (resolve, reject) => {

            //Create Imperial Ship Object
            let imperialShip = new Node("Imperial");

            //Set satellites distances
            distances.forEach((distance, index) => {
                this.currentSatellitesPositions[index].setDistance(distance);
            });


            let imperialShipPositions: Position;

            //Calculate the imperial ship position
            await this.GetPosition(this.currentSatellitesPositions).then(position => {

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
    GetPosition(satellites: Array<Node>): Promise<Position> {
        return new Promise((resolve, reject) => {
            try {

                //Load Kenobi
                let kenobi = satellites.find(x => x.name.toLowerCase() === "kenobi")!;
                let X1 = kenobi.x;
                let Y1 = kenobi.y;
                let D1 = kenobi.distance;

                //Load Skywalker
                let skywalker = satellites.find(x => x.name.toLowerCase() === "skywalker")!;
                let X2 = skywalker.x;
                let Y2 = skywalker.y;
                let D2 = skywalker.distance;

                //Load Sato
                let sato = satellites.find(x => x.name.toLowerCase() === "sato")!;
                let X3 = sato.x;
                let Y3 = sato.y;
                let D3 = sato.distance;

                //Getting X
                let Xa = (Y1! - Y3!) * (Math.pow(X1!, 2) - Math.pow(X2!, 2) + Math.pow(Y1!, 2) - Math.pow(Y2!, 2) - Math.pow(D1, 2) + Math.pow(D2, 2)) - (Y1! - Y2!) * (Math.pow(X1!, 2) - Math.pow(X3!, 2) + Math.pow(Y1!, 2) - Math.pow(Y3!, 2) - Math.pow(D1!, 2) + Math.pow(D3!, 2));
                let Xb = (2 * (X1! - X2!) * (Y1! - Y3!) - 2 * (X1! - X3!) * (Y1! - Y2!))
                let X4 = parseFloat((Xa / Xb).toFixed(2));

                //Getting Y
                let Ya = (X1! - X3!) * (Math.pow(X1!, 2) - Math.pow(X2!, 2) + Math.pow(Y1!, 2) - Math.pow(Y2!, 2) - Math.pow(D1, 2) + Math.pow(D2, 2)) - (X1! - X2!) * (Math.pow(X1!, 2) - Math.pow(X3!, 2) + Math.pow(Y1!, 2) - Math.pow(Y3!, 2) - Math.pow(D1!, 2) + Math.pow(D3!, 2));
                let Yb = (2 * (X1! - X3!) * (Y1! - Y2!) - 2 * (X1! - X2!) * (Y1! - Y3!))
                let Y4 = parseFloat((Ya / Yb).toFixed(2));

                resolve(new Position(X4, Y4))
            }
            catch (error) {
                reject(error);
            }
        });
    }

}

export default Trilateration;