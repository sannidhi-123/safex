// Initialize Chart.js
const ctx = document.getElementById('sensorChart').getContext('2d');
const sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time labels
        datasets: [{
            label: 'Air Quality / Safety Index',
            data: [],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    }
});

// Update chart with random data (Simulating MQTT data)
function addDataPoint() {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const value = Math.floor(Math.random() * 20) + 70; // Simulate steady safe value

    if (sensorChart.data.labels.length > 10) {
        sensorChart.data.labels.shift();
        sensorChart.data.datasets[0].data.shift();
    }

    sensorChart.data.labels.push(now);
    sensorChart.data.datasets[0].data.push(value);
    sensorChart.update();
}

setInterval(addDataPoint, 3000);

// Alert Simulation
function simulateAlert() {
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    const logBody = document.getElementById('log-body');

    // Update UI to Danger
    statusText.innerText = "DANGER DETECTED";
    statusText.classList.replace('text-gray-800', 'text-red-600');
    statusIcon.style.transform = "scale(1.1)";
    statusIcon.src = "/images/danger.png";

    // Add to Log
    const row = `<tr>
        <td class="px-6 py-4 text-gray-500">${new Date().toLocaleTimeString()}</td>
        <td class="px-6 py-4 font-medium text-gray-700">MQTT_NODE_01</td>
        <td class="px-6 py-4">High Gas Level</td>
        <td class="px-6 py-4"><span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">CRITICAL</span></td>
    </tr>`;
    logBody.insertAdjacentHTML('afterbegin', row);

    // Reset after 5 seconds
    setTimeout(() => {
        statusText.innerText = "System Secure";
        statusText.classList.replace('text-red-600', 'text-gray-800');
        statusIcon.style.transform = "scale(1.0)";
        statusIcon.src = "/images/safe.png";
    }, 5000);
}