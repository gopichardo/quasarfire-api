import Message from '../dtos/Message.dto';
import Trilateration from "../business/Trilateration";

class QuasarFire {

    /**
     * 
     * @param distances Distances from emitter
     * @returns Emiiter xy coordinates
     */
    async GetLocation(distances: number[]): Promise<Message> {

        return new Promise((resolve, reject) => {

            try {
                let trilaterarion = new Trilateration();

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
}

export default QuasarFire;