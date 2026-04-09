function seededHash(seed, N) {
  let str = String(seed);
  
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }

  // Extra mixing step to improve distribution
  hash ^= hash >>> 16;
  hash = (hash * 0x45d9f3b) >>> 0;
  hash ^= hash >>> 16;

  if (hash < 0) hash *= -1;

  return hash % N;
}

const locations = [
  "Circus",
  "Shopping Mall",
  "Bank",
  "Police Station",
  "Hotel",
  "Taxi",
  "Bowling Alley",
  "Wedding",
  "Zoo",
  "University",
  "Embassy",
  "Ice Hockey Stadium",
  "Pirate Ship",
  "Polar Station",
  "Library",
  "Airplane",
  "Amusement Park",
  "Coal Mine",
  "Service Station",
  "Restaurant",
  "Passenger Train",
  "Art Gallery",
  "Beach",
  "Casino",
  "Vineyard",
  "Hospital",
  "Theater",
  "Supermarket",
  "Submarine",
  "Military Base",
];

// const locations_2 = [...locations]
// const index = Math.floor(Math.random() * locations_2.length);
// const value = locations_2.splice(index, 1)[0];
// console.log(locations_2.length);

// const index2 = Math.floor(Math.random() * locations_2.length);
// const value2 = locations_2.splice(index2, 1)[0];
// console.log(locations_2.length);


// console.log(value);
// console.log(value2)

// for (let i = 0; i < 20; i++) console.log(i, seededHash(i));

function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading

    const playerNumber = document.getElementById("playerNumber").value;
    const seed = document.getElementById("seed").value;

    const imposter = seededHash(seed, 4);

    const locations_2 = [...locations]
    const index = seededHash(seed, locations_2.length);
    const value = locations_2.splice(index, 1)[0];

    const index2 = seededHash(seed, locations_2.length);
    const value2 = locations_2.splice(index2, 1)[0];

    const location = playerNumber == imposter ? value2 : value;
    document.getElementById("output").textContent = location;
}