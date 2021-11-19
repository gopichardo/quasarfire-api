//---------------------------

const { calculate, Vector } = require("weighted-positioning");

const kenobi = new Vector(-500, -200);
const skywalker = new Vector(100, -100);
const sato = new Vector(500, 100);

let res = calculate([
  { v: kenobi, w: 100 },
  { v: skywalker, w: 115.5 },
  { v: sato, w: 142.7 },
]);

console.log(
  "weighted-positioning - Coordenadas de la nave: X=",
  res.x,
  " Y=",
  res.y
);

function GetLocation(distances) {}
