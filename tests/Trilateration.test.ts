import Node from "../src/dtos/Node.dto";
import Trilateration from "../src/business/Trilateration";

test("GetPosition X True", async () => {
    //Arrange

    let trilateration = new Trilateration();
    let distances = new Array(86.814, 69.409, 55.448);

    //Map Satellites and distances to imperial ship
    let satellites = new Map<Node, number>();

    //Create Imperial Ship Object
    let imperialShip = new Node("Imperial");

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

    await trilateration.GetPosition(satellites)
        .then(position => {

            if (position) {
                imperialShip.setPosition(position);
            }
        });

    //Act
    //Assert
    expect(imperialShip.x).toBe(809.898);

});

test("GetPosition Y True", async () => {
    //Arrange

    let trilateration = new Trilateration();
    let distances = new Array(86.814, 69.409, 55.448);

    //Map Satellites and distances to imperial ship
    let satellites = new Map<Node, number>();

    //Create Imperial Ship Object
    let imperialShip = new Node("Imperial");

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

    await trilateration.GetPosition(satellites)
        .then(position => {

            if (position) {
                imperialShip.setPosition(position);
            }
        });

    //Act
    //Assert
    expect(imperialShip.y).toBe(5231.968);

});