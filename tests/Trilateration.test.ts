import Node from "../src/dtos/Node.dto";
import Trilateration from "../src/business/Trilateration";


function GetCustomSatellitesConfiguration(): Array<Node> {
    let satellites = new Array<Node>();

    //Create Kenobi Satellite
    let kenobi = new Node("Kenobi", 832.165, 5148.059);
    //Create Skywalker Satellite
    let skywalker = new Node("Skywalker", 741.264, 5242.310);
    //Create Sato Satellite
    let sato = new Node("Sato", 863.763, 5245.127);

    //Set satellites distances to imperial ship
    satellites.push(kenobi);
    satellites.push(skywalker);
    satellites.push(sato);

    return satellites;
}

test("GetPosition CustomConfig True", async () => {
    //Arrange
    let satellites = GetCustomSatellitesConfiguration();

    let trilateration = new Trilateration(satellites);
    let distances = new Array(86.814, 69.409, 55.448);

    //Create Imperial Ship Object
    let imperialShip = new Node("Imperial");

    //Set satellites distances to imperial ship
    satellites.forEach((satellite, index) => {
        satellite.setDistance(distances[index]);
    });

    //Act
    await trilateration.GetPosition(satellites)
        .then(position => {
            if (position) {
                imperialShip.setPosition(position);
            }
        });

    //Assert
    expect(imperialShip).toMatchObject(new Node("Imperial", parseFloat((809.898).toFixed(2)), parseFloat((5231.968).toFixed(2))));
});

test("GetPosition CustomConfig False", async () => {
    //Arrange
    let satellitesConfiguration = GetCustomSatellitesConfiguration();

    let trilateration = new Trilateration(satellitesConfiguration);
    let distances = new Array(86.814, 69.409, 55.448);

    //Create Imperial Ship Object
    let imperialShip = new Node("Imperial");

    //Set satellites distances to imperial ship
    satellitesConfiguration.forEach((satellite, index) => {
        satellite.setDistance(distances[index]);
    });

    //Act
    await trilateration.GetPosition(satellitesConfiguration)
        .then(position => {
            if (position) {
                imperialShip.setPosition(position);
            }
        });

    //Assert
    expect(imperialShip).not.toMatchObject(new Node("", parseFloat((1).toFixed(2)), parseFloat((1).toFixed(2))));
});