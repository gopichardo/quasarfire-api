import Node from "../src/dtos/Node.dto";
import Trilateration from "../src/business/Trilateration";


function GetSatellitesConfiguration(): Array<Node> {
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

test("GetPosition X,Y True", async () => {
    //Arrange
    let satellitesConfiguration = GetSatellitesConfiguration();

    let trilateration = new Trilateration(satellitesConfiguration);
    let distances = new Array(86.814, 69.409, 55.448);

    //Map Satellites and distances to imperial ship
    let satellitesDistances = new Map<Node, number>();

    //Create Imperial Ship Object
    let imperialShip = new Node("Imperial");

    //Set satellites distances to imperial ship
    satellitesConfiguration.forEach((satellite, index) => {
        satellitesDistances.set(satellite, distances[index]);
    });

    //Act
    await trilateration.GetPosition(satellitesDistances)
        .then(position => {
            if (position) {
                imperialShip.setPosition(position);
            }
        });

    //Assert
    expect(imperialShip.x == parseFloat((809.898).toFixed(2)) && imperialShip.y == parseFloat((5231.968).toFixed(2))).toBeTruthy();

});

test("GetPosition X,Y False", async () => {
    //Arrange
    let satellitesConfiguration = GetSatellitesConfiguration();

    let trilateration = new Trilateration(satellitesConfiguration);
    let distances = new Array(86.814, 69.409, 55.448);

    //Map Satellites and distances to imperial ship
    let satellitesDistances = new Map<Node, number>();

    //Create Imperial Ship Object
    let imperialShip = new Node("Imperial");

    //Set satellites distances to imperial ship
    satellitesConfiguration.forEach((satellite, index) => {
        satellitesDistances.set(satellite, distances[index]);
    });

    //Act
    await trilateration.GetPosition(satellitesDistances)
        .then(position => {
            if (position) {
                imperialShip.setPosition(position);
            }
        });

    //Assert
    expect(imperialShip.x == parseFloat((1.898).toFixed(2)) && imperialShip.y == parseFloat((-1.968).toFixed(2))).toBeFalsy();
});