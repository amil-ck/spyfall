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

const lists = {
    locations : [
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
    ],
    animals: [
        "Wolf",
        "Goat",
        "Whale",
        "Shark",
        "Spider",
        "Vulture",
        "Pig",
        "Giraffe",
        "Eagle",
        "Tiger",
        "Snake",
        "Bear",
        "Monkey",
        "Lion",
        "Duck",
        "Rhino",
        "Kangaroo",
        "Parrot",
        "Dolphin",
        "Mosquito",
        "Pidgeon",
        "Elephant",
        "Zebra",
        "Turtle",
        "Horse",
        "Ostrich",
        "Housefly",
        "Chicken",
        "Dog",
        "Crocodile"
    ],
    countries: [
        "Sweden",
        "Israel",
        "United Arab Emirates",
        "Brazil",
        "New Zealand",
        "Argentina",
        "Germany",
        "Saudi Arabia",
        "Chile",
        "Greece",
        "Iran",
        "Japan",
        "Ethiopia",
        "South Korea",
        "Australia",
        "Vietnam",
        "Russia",
        "Netherlands",
        "Nigeria",
        "Italy",
        "Canada",
        "United States",
        "India",
        "Mexico",
        "Indonesia",
        "United Kingdom",
        "China",
        "Kenya",
        "Poland",
        "France",
    ]
}

function handleSubmit(event) {
    event.preventDefault(); // stops the page from reloading

    const playerNumber = document.getElementById("playerNumber").value - 1;
    const seed = document.getElementById("seed").value;
    const category = document.getElementById("category").value;

    const imposter = seededHash(seed, 4);

    const current_catgeory = [...lists[category]]
    const index = seededHash(seed, current_catgeory.length);
    const value = current_catgeory.splice(index, 1)[0];

    const index2 = seededHash(seed, current_catgeory.length);
    const value2 = current_catgeory.splice(index2, 1)[0];

    const location = playerNumber == imposter ? value2 : value;
    document.getElementById("output").textContent = location;
}

function selectPlayer(n) {
    document.getElementById("playerNumber").value = n;
    document.querySelectorAll(".player-btn").forEach(b => b.classList.remove("selected"));
    event.target.classList.add("selected");
}

function selectCategory(c) {
    document.getElementById("category").value = c;
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("selected"));
    event.target.classList.add("selected");
}

function handleDone() {
    const seed = document.getElementById("seed").value;
    const imposter = seededHash(seed, 4);

    document.getElementById("imposterReveal").textContent = `The imposter was Player ${imposter + 1}`;
}