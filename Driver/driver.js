import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqo-w5cA2EPoNrsR0NGEKAlH6LzMNe5xk",
  authDomain: "bus-tracking-system-c2fca.firebaseapp.com",
  databaseURL: "https://bus-tracking-system-c2fca-default-rtdb.firebaseio.com",
  projectId: "bus-tracking-system-c2fca",
  storageBucket: "bus-tracking-system-c2fca.appspot.com",
  messagingSenderId: "345085122440",
  appId: "1:345085122440:web:3da665d7ff4c72af9e8c3d",
  measurementId: "G-FK2QSPDRWG"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to send bus location to Firebase
function sendLocation(busId, lat, lng) {
  // Using the busId (bus1, bus2, etc.) for differentiating multiple buses
  set(ref(database, `bus_locations/${busId}`), {
    latitude: lat,
    longitude: lng,
    timestamp: new Date().toISOString()
  });
}

// Function to get the location of the bus and send it
function getLocationAndSend(busId) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`Sending GPS for ${busId}:`, lat, lng);
        sendLocation(busId, lat, lng);
      },
      (error) => {
        console.error("GPS error: ", error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Sending location for bus1 every 5 seconds
setInterval(() => getLocationAndSend('bus1'), 5000);

// If you want to send location for another bus, for example bus2
// setInterval(() => getLocationAndSend('bus2'), 5000);
