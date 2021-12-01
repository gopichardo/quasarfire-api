import Message from '../dtos/Message.dto';
import Node from "../dtos/Node.dto";
import Trilateration from "../business/Trilateration";
import Satellite from '../dtos/Satellite.dto';
import { stringLiteral } from '@babel/types';
import Storage from './Storage';

class QuasarFire {
    private satellites = new Array<Node>();

    constructor() {
        this.SetSatellitesConfiguration();
    }

    /**
     * Get Imperial Ship Location and Message
     * @param satellites Satellites from request
     * @returns Imperial Ship Coordinates
     */
    GetLocationAndMessage(satellites: Array<Satellite>): Promise<Message> {

        return new Promise((resolve, reject) => {

            try {

                let distances = this.GetDistancesFromRequest(satellites);
                let messages = this.GetMessagesFromRequest(satellites);



                //Instance of trilateration

                this.GetLocation(distances)
                    .then(node => {

                        if (!node) {
                            reject("Error al recuperar posición");
                        }

                        let message = this.GetMessage(messages);

                        resolve(new Message(message, node.x, node.y));
                    })
                    .catch(error => {
                        reject(error);
                    });

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get Node Location 
     * @param distances distances
     * @returns Node Location
     */
    GetLocation(distances: number[]): Promise<Node> {
        return new Promise((resolve, reject) => {
            //Instance of trilateration
            let trilaterarion = new Trilateration(this.satellites);
            trilaterarion.GetUnknowNodePosition(distances)
                .then(node => {

                    if (!node) {
                        reject("Error al recuperar posición");
                    }
                    resolve(node);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Gets the Imperial Ship Message
     * @param messages Messages from emmiter in each satellite
     * @returns Message from emmiter
     */
    GetMessage(messages: string[][]): string {
        var message = "";
        let resultMessage = new Array<string>();

        messages.forEach((message, i) => {

            message.forEach((content, j) => {

                let msg = resultMessage[j];

                if (msg === (null || undefined)) {
                    resultMessage.push(content.trim());
                }
                else {
                    if (msg.length === 0 && content.trim().length > 0) {
                        resultMessage[j] = content.trim();
                    }
                }
            });
        });

        message = resultMessage.filter((m => m.length > 0)).join(" ");

        //Return message
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

    /**
     * Get distances from each Satellite
     * @param satellites Satellites List
     * @returns Distances from each Satellite
     */
    GetDistancesFromRequest(satellites: Array<Satellite>): Array<number> {
        let distances = satellites.map((satellite, index) => {
            return satellite.distance;
        })
        return distances;
    }

    /**
     * Get messages from each Satellite
     * @param satellites Satellites List
     * @returns Messages from each Satellite
     */
    GetMessagesFromRequest(satellites: Array<Satellite>): Array<string[]> {
        let messages = satellites.map((satellite, index) => {
            return satellite.message;
        })
        return messages;
    }


    /**
     * Set the Satellite Information Split
     * @param satellite Satellite
     */
    async SetSatelliteInformation(satellite: Satellite) {
        let saved = false;

        try {
            let currentSatellites: Array<Satellite> = this.GetSavedSatellitesOnStorage();

            currentSatellites = currentSatellites != (null || undefined) ? currentSatellites : [];


            let foundSatellite = currentSatellites.find(s => s.name === satellite.name)!;
            let founsSatelliteIndex = currentSatellites.indexOf(foundSatellite);

            if (founsSatelliteIndex < 0) {
                //Push the new Satellite
                currentSatellites.push(satellite);
            }
            else {
                //Update Local Storage
                currentSatellites.splice(founsSatelliteIndex, 1, satellite);
            }

            //Save satellites on Local Storage
            await this.SaveSatellitesOnStorage(currentSatellites).then(result => {
                saved = result;
            });

        } catch (error) {
            console.log(error);
        }

        return saved;
    }


    /**
     * Save satellites on Local Storage
     * @param satellites Satellites to Save
     * @returns 
     */
    SaveSatellitesOnStorage(satellites: Satellite[]): Promise<boolean> {
        //Save on Local Storage
        return new Storage().SetKey("Satellites", JSON.stringify(satellites));
    }


    /**
     * Get Imperial Ship Location and Message Split
     */
    GetLocationAndMessageSplit(): Promise<Message> {

        return new Promise((resolve, reject) => {
            //Satellites saved
            let savedSatellites = this.GetSavedSatellitesOnStorage();

            if (savedSatellites === null) {
                reject("No existe suficiente información para calcular la posición");
            }
            else {
                this.GetLocationAndMessage(savedSatellites).then(async message => {

                    //Delete satellites information
                    await new Storage().DeleteKey("Satellites");

                    resolve(message);

                }).catch(error => {

                });
            }
        });
    }

    /**
     * Get Current Satellites Saved
     * @returns 
     */
    GetSavedSatellitesOnStorage(): Array<Satellite> {
        let currentSatellites: Array<Satellite> = JSON.parse(new Storage().GetKey("Satellites"));

        return currentSatellites;
    }


}

export default QuasarFire;