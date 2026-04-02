const mockData = {
    industryFloors: [
        { id: 1, name: 'Floor 1', gas: 45, temp: 24, status: 'Safe', online: true, battery: 98, lat: 28.6139, lng: 77.2090 },
        { id: 2, name: 'Floor 2', gas: 120, temp: 30, status: 'Warning', online: true, battery: 85, lat: 28.6149, lng: 77.2100 },
        { id: 3, name: 'Floor 3', gas: 300, temp: 45, status: 'Danger', online: true, battery: 40, lat: 28.6159, lng: 77.2110 },
        { id: 4, name: 'Floor 4', gas: 30, temp: 22, status: 'Safe', online: false, battery: 10, lat: 28.6129, lng: 77.2080 }
    ],
    healthcareFloors: [
        { id: 1, name: 'Floor 1', gas: 45, temp: 24, status: 'Safe', online: true, battery: 98, lat: 28.6139, lng: 77.2090 },
        { id: 2, name: 'Floor 2', gas: 0, temp: 0, status: 'Warning', online: false, battery: 0, lat: 28.6149, lng: 77.2100 },
        { id: 3, name: 'Floor 3', gas: 300, temp: 45, status: 'Danger', online: true, battery: 40, lat: 28.6159, lng: 77.2110 },
        { id: 4, name: 'Floor 4', gas: 30, temp: 22, status: 'Safe', online: false, battery: 10, lat: 28.6129, lng: 77.2080 }
    ],
    defenseIndividuals: [
        { id: 101, name: 'Rohan (Alpha Team)', hr: 145, gas: 10, temp: 36.5, status: 'Danger', sos: true, aiPrediction: 'Imminent Health Risk', lat: 34.0522, lng: -118.2437, posture: 'Fallen' },
        { id: 102, name: 'Ananya (Bravo Team)', hr: 110, gas: 50, temp: 38.0, status: 'Warning', aiPrediction: 'High Stress/Fatigue', lat: 34.0532, lng: -118.2447, posture: 'Walking' },
        { id: 103, name: 'Vikram (Charlie Team)', hr: 140, gas: 200, temp: 41.5, status: 'Danger', sos: true, aiPrediction: 'Imminent Health Risk', lat: 34.0512, lng: -118.2427, posture: 'Unconscious' },
        { id: 104, name: 'Priya (Delta Rescue)', hr: 80, gas: 15, temp: 37.0, status: 'Safe', aiPrediction: 'Normal Activity', lat: 34.0542, lng: -118.2457, posture: 'Standing' }
    ],
    disasterIndividuals: [
        { id: 201, name: 'Ram', hr: 78, gas: 12, temp: 36.6, status: 'Safe', aiPrediction: 'Normal Activity', lat: 34.0510, lng: -118.2430, posture: 'Walking' },
        { id: 202, name: 'Sita', hr: 82, gas: 15, temp: 37.1, status: 'Safe', aiPrediction: 'Normal Activity', lat: 34.0520, lng: -118.2440, posture: 'Standing' },
        { id: 203, name: 'Mithun', hr: 115, gas: 60, temp: 38.2, status: 'Warning', aiPrediction: 'High Stress/Fatigue', lat: 34.0530, lng: -118.2450, posture: 'Running' },
        { id: 204, name: 'Keerthana', hr: 135, gas: 180, temp: 41.0, status: 'Danger', sos: true, aiPrediction: 'Imminent Health Risk', lat: 34.0540, lng: -118.2460, posture: 'Fallen' },
        { id: 205, name: 'Rana', hr: 76, gas: 10, temp: 36.8, status: 'Safe', aiPrediction: 'Normal Activity', lat: 34.0550, lng: -118.2470, posture: 'Standing' }
    ],
    notifications: [
        { id: 1, type: 'danger', message: 'SOS Alert: Vikram (Charlie Team) triggered SOS!' },
        { id: 2, type: 'danger', message: 'Hazard! Floor 3 Gas Levels critically high (300ppm).' },
        { id: 3, type: 'warning', message: 'Warning! Ananya showing signs of high fatigue.' },
        { id: 4, type: 'info', message: 'Floor 4 Device went offline. Please check battery.' }
    ],
    chartHistory: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
        gas: [20, 25, 40, 80, 150, 100, 120],
        temp: [22, 21, 23, 28, 32, 29, 30]
    },
    historicalExplosions: [
        { id: 1, lat: 28.6140, lng: 77.2095, date: '2025-08-15', time: '14:30', description: 'Major gas pipeline leak leading to minor explosion' },
        { id: 2, lat: 34.0535, lng: -118.2440, date: '2026-01-28', time: '09:15', description: 'Industrial chemical fire and explosion' },
        { id: 3, lat: 51.5074, lng: -0.1278, date: '2025-11-10', time: '22:45', description: 'Underground gas main blast' }
    ],
    floorWorkers: {
        'Floor 1': [
            { id: 301, name: 'Amit Kumar', hr: 72, gas: 10, temp: 36.5, status: 'Safe', posture: 'Standing' },
            { id: 302, name: 'Rahul Sharma', hr: 80, gas: 12, temp: 36.8, status: 'Safe', posture: 'Walking' },
            { id: 303, name: 'Arun Patel', hr: 110, gas: 40, temp: 37.2, status: 'Warning', posture: 'Standing' }
        ],
        'Floor 2': [
            { id: 304, name: 'Sneha Gupta', hr: 75, gas: 15, temp: 36.6, status: 'Safe', posture: 'Standing' },
            { id: 305, name: 'Neha Singh', hr: 135, gas: 80, temp: 38.5, status: 'Danger', posture: 'Fallen' }
        ],
        'Floor 3': [
            { id: 306, name: 'Raj Verma', hr: 90, gas: 180, temp: 40.0, status: 'Danger', posture: 'Unconscious' },
            { id: 308, name: 'Suresh Menon', hr: 110, gas: 150, temp: 39.5, status: 'Danger', posture: 'Walking' }
        ],
        'Floor 4': [
            { id: 307, name: 'Pooja Reddy', hr: 70, gas: 8, temp: 36.4, status: 'Safe', posture: 'Standing' }
        ]
    },
    karnatakaAQI: [
        { city: 'Bengaluru', aqi: 120, hasDetails: true },
        { city: 'Mysuru', aqi: 55 },
        { city: 'Mangaluru', aqi: 85 },
        { city: 'Tumkur', aqi: 76, hasDetails: true },
        { city: 'Hubli', aqi: 110 },
        { city: 'Belagavi', aqi: 95 },
        { city: 'Kalaburagi', aqi: 150 }
    ],
    tumkurAreasAQI: [
        { area: 'SSIT Campus', aqi: 62 },
        { area: 'Batawadi', aqi: 90 },
        { area: 'SS Puram', aqi: 70 },
        { area: 'Gubbi Gate', aqi: 85 },
        { area: 'Kyathsandra', aqi: 75 }
    ],
    bengaluruAreasAQI: [
        { area: 'Whitefield', aqi: 140 },
        { area: 'Koramangala', aqi: 110 },
        { area: 'Indiranagar', aqi: 125 },
        { area: 'Electronic City', aqi: 115 },
        { area: 'Jayanagar', aqi: 90 },
        { area: 'Peenya', aqi: 160 }
    ]
};