import Satellite from '../src/dtos/Satellite.dto';
import QuasarFire from '../src/business/QuasarFire';


describe("Quassar Fire Get Distances", () => {

    test("GetDistancesFromRequest True", () => {

        //Arrange
        let satellites = new Array<Satellite>();
        satellites.push(new Satellite("kenobi", 100.0, ["este", "", "", "mensaje", ""]));
        satellites.push(new Satellite("skywalker", 115.5, ["", "es", "", "", "secreto"]));
        satellites.push(new Satellite("sato", 142.7, ["este", "", "un", "", ""]));

        let quassar = new QuasarFire();

        //Act
        let distances = quassar.GetDistancesFromRequest(satellites);


        //Assert
        expect(distances).toMatchObject([100.0, 115.5, 142.7]);

    });

    test("GetDistancesFromRequest False", () => {

        //Arrange
        let satellites = new Array<Satellite>();
        satellites.push(new Satellite("kenobi", 100.0, ["este", "", "", "mensaje", ""]));
        satellites.push(new Satellite("skywalker", 115.5, ["", "es", "", "", "secreto"]));
        satellites.push(new Satellite("sato", 142.7, ["este", "", "un", "", ""]));

        let quassar = new QuasarFire();

        //Act
        let distances = quassar.GetDistancesFromRequest(satellites);


        //Assert
        expect(distances).not.toMatchObject([1, 2, 3]);

    });
});



describe("Quassar Fire Get Messages", () => {

    test("GetMessagesFromRequest True", () => {

        //Arrange
        let satellites = new Array<Satellite>();
        satellites.push(new Satellite("kenobi", 100.0, ["este", "", "", "mensaje", ""]));
        satellites.push(new Satellite("skywalker", 115.5, ["", "es", "", "", "secreto"]));
        satellites.push(new Satellite("sato", 142.7, ["este", "", "un", "", ""]));

        let quassar = new QuasarFire();

        //Act
        let messages = quassar.GetMessagesFromRequest(satellites);


        //Assert
        expect(messages).toMatchObject([["este", "", "", "mensaje", ""], ["", "es", "", "", "secreto"], ["este", "", "un", "", ""]]);

    });

    test("GetMessagesFromRequest False", () => {

        //Arrange
        let satellites = new Array<Satellite>();
        satellites.push(new Satellite("kenobi", 100.0, ["este", "", "", "mensaje", ""]));
        satellites.push(new Satellite("skywalker", 115.5, ["", "es", "", "", "secreto"]));
        satellites.push(new Satellite("sato", 142.7, ["este", "", "un", "", ""]));

        let quassar = new QuasarFire();

        //Act
        let messages = quassar.GetMessagesFromRequest(satellites);


        //Assert
        expect(messages).not.toMatchObject([["X", "", "", "X", ""], ["", "X", "", "", "X"], ["X", "", "X", "", ""]]);

    });
});
