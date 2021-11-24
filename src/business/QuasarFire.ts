import Message from '../dtos/Message.dto';
import Node from "../dtos/Node.dto";
import Trilateration from "../business/Trilateration";

class QuasarFire {
    private satellites = new Array<Node>();

    /**
     * 
     * @param distances Distances to Imperial Ship
     * @returns Imperial Ship Coordinates
     */
    async GetLocation(distances: number[]): Promise<Message> {

        return new Promise((resolve, reject) => {

            try {
                //Instance of trilateration
                let trilaterarion = new Trilateration(this.satellites);

                trilaterarion.GetUnknowNodePosition(distances)
                    .then(node => {

                        if (!node) {
                            reject("Error al recuperar posición");
                        }

                        resolve(new Message("", node.x, node.y));

                    })
                    .catch(error => {
                        reject(error);
                    });

            } catch (error) {

            }
        });
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


    /**
     * Set the satellites configuration
     * @param newConfiguration New Satellites Configuration
     */
    SetSatellitesConfiguration(newConfiguration?: Array<Node>) {

        if (newConfiguration) {
            this.satellites = newConfiguration;
        }
        else {
            //Default Configuration

            //Create Kenobi Satellite
            let kenobi = new Node("Kenobi", 832.165, 5148.059);
            //Create Skywalker Satellite
            let skywalker = new Node("Skywalker", 741.264, 5242.310);
            //Create Sato Satellite
            let sato = new Node("Sato", 863.763, 5245.127);

            //Set satellites distances to imperial ship
            this.satellites.push(kenobi);
            this.satellites.push(skywalker);
            this.satellites.push(sato);
        }
    }

    /**
     * Get the satellites configuration
     * @returns Satellites Configuration
     */
    GetSatellitesConfiguration(): Array<Node> {
        return this.satellites;
    }
}

export default QuasarFire;