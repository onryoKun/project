// Replace with your ThingSpeak channel ID and Read API key
const channelId = "E6LPN91S3ZK22S8O";
const apiKey = "3ERIMAUJFQYZGENN";

// Chart.js setup
const voltageChart = new Chart(document.getElementById("voltageChart"), {
    type: "line",
    data: { labels: [], datasets: [{ label: "Voltage (V)", data: [], borderColor: "rgb(75, 192, 192)" }] },
    options: { scales: { x: { display: true }, y: { display: true, beginAtZero: true } } }
});

const currentChart = new Chart(document.getElementById("currentChart"), {
    type: "line",
    data: { labels: [], datasets: [{ label: "Current (A)", data: [], borderColor: "rgb(153, 102, 255)" }] },
    options: { scales: { x: { display: true }, y: { display: true, beginAtZero: true } } }
});

const tempChart = new Chart(document.getElementById("tempChart"), {
    type: "line",
    data: { labels: [], datasets: [{ label: "Temperature (°C)", data: [], borderColor: "rgb(255, 99, 132)" }] },
    options: { scales: { x: { display: true }, y: { display: true, beginAtZero: true } } }
});

// Function to fetch data from ThingSpeak and update charts
async function fetchData() {
    const response = await fetch(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=20`);
    const data = await response.json();
    const feeds = data.feeds;

    // Reset data for each chart
    voltageChart.data.labels = [];
    voltageChart.data.datasets[0].data = [];
    currentChart.data.labels = [];
    currentChart.data.datasets[0].data = [];
    tempChart.data.labels = [];
    tempChart.data.datasets[0].data = [];

    // Update charts with fetched data
    feeds.forEach(feed => {
        const time = new Date(feed.created_at).toLocaleTimeString();
        voltageChart.data.labels.push(time);
        voltageChart.data.datasets[0].data.push(parseFloat(feed.field1));
        currentChart.data.labels.push(time);
        currentChart.data.datasets[0].data.push(parseFloat(feed.field2));
        tempChart.data.labels.push(time);
        tempChart.data.datasets[0].data.push(parseFloat(feed.field3));
    });

    voltageChart.update();
    currentChart.update();
    tempChart.update();
}

// Fetch data every 15 seconds
setInterval(fetchData, 15000);
fetchData();
