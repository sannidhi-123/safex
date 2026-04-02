let currentDomain = '';
let currentView = 'landing';
let floorMapInstance = null;
let indivMapInstance = null;
let gasChartInstance = null;
let tempChartInstance = null;
let globalHeatmapInstance = null;

const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const notifButton = document.getElementById('notifButton');
const notifPanel = document.getElementById('notifPanel');
const notifList = document.getElementById('notifList');
const notifBadge = document.getElementById('notifBadge');
const pageTitle = document.getElementById('pageTitle');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

notifButton.addEventListener('click', () => {
    notifPanel.classList.toggle('open');
});

function loadNotifications() {
    notifList.innerHTML = '';
    mockData.notifications.forEach(n => {
        const div = document.createElement('div');
        div.className = `notif-item ${n.type}`;
        div.innerHTML = `<i class="fa-solid ${n.type === 'danger' ? 'fa-triangle-exclamation' : (n.type === 'warning' ? 'fa-circle-exclamation' : 'fa-bell')}"></i> ${n.message}`;
        notifList.appendChild(div);
    });
    notifBadge.textContent = mockData.notifications.length;
}

document.querySelectorAll('.nav-item, .domain-card').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const el = e.currentTarget;
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        
        const view = el.dataset.view;
        const domain = el.dataset.domain;
        
        if (view === 'shopping') {
            const navMatch = document.querySelector(`.nav-item[data-view="shopping"]`);
            if(navMatch) navMatch.classList.add('active');
        } else if (domain) {
            const navMatch = document.querySelector(`.nav-item[data-domain="${domain}"]`);
            if(navMatch) navMatch.classList.add('active');
        } else {
            const navMatch = document.querySelector(`.nav-item[data-view="landing"]`);
            if(navMatch) navMatch.classList.add('active');
        }
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }

        document.getElementById('floorWorkersCard').style.display = 'none';

        switchView(view, domain);
    });
});

function switchView(viewName, domain = null) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(`${viewName}View`).classList.add('active-view');
    
    currentView = viewName;
    currentDomain = domain;

    if (viewName === 'landing') {
        pageTitle.textContent = 'SafeX Dashboard Overview';
        renderLandingView();
    } else if (viewName === 'floor') {
        pageTitle.textContent = `${domain} Dashboard`;
        document.getElementById('floorDomainTitle').textContent = `${domain} Facility Monitoring`;
        renderFloorView();
    } else if (viewName === 'individual') {
        pageTitle.textContent = `${domain} Dashboard`;
        document.getElementById('indivDomainTitle').textContent = `${domain} Personnel Tracker`;
        renderIndividualView();
    } else if (viewName === 'shopping') {
        pageTitle.textContent = 'SafeX Store';
    }
}

function initMap(mapId, lat, lng, zoom, markersData) {
    const container = L.DomUtil.get(mapId);
    if(container != null){
        container._leaflet_id = null;
    }
    
    const map = L.map(mapId).setView([lat, lng], zoom);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markersData.forEach(m => {
        let color = m.status === 'Safe' ? '#10b981' : (m.status === 'Warning' ? '#f59e0b' : '#ef4444');
        
        const markerHtml = `
            <div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>
        `;
        const customIcon = L.divIcon({
            html: markerHtml,
            className: 'custom-leaflet-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        L.marker([m.lat, m.lng], {icon: customIcon})
            .addTo(map)
            .bindPopup(`<b>${m.name}</b><br>Status: ${m.status}<br>${m.gas ? 'Gas: '+m.gas+'ppm' : ''}`);
    });

    setTimeout(() => { map.invalidateSize(); }, 400);
    return map;
}

function destroyCharts() {
    if (gasChartInstance) gasChartInstance.destroy();
    if (tempChartInstance) tempChartInstance.destroy();
}

function initCharts() {
    destroyCharts();
    
    Chart.defaults.color = '#f8fafc';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    
    const gasCtx = document.getElementById('gasChart').getContext('2d');
    gasChartInstance = new Chart(gasCtx, {
        type: 'line',
        data: {
            labels: mockData.chartHistory.labels,
            datasets: [{
                label: 'Avg Gas Level (ppm)',
                data: mockData.chartHistory.gas,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    const tempCtx = document.getElementById('tempChart').getContext('2d');
    tempChartInstance = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: mockData.chartHistory.labels,
            datasets: [{
                label: 'Avg Temperature (°C)',
                data: mockData.chartHistory.temp,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function getStatusClass(status) {
    return status === 'Safe' ? 'status-safe' : (status === 'Warning' ? 'status-warning' : 'status-danger');
}

function renderFloorView() {
    const list = document.getElementById('floorsList');
    list.innerHTML = '';
    
    let baseFloors = mockData.industryFloors;
    if (currentDomain === 'Healthcare') {
        baseFloors = mockData.healthcareFloors;
    }

    baseFloors.forEach(f => {
        const sClass = getStatusClass(f.status);
        const card = document.createElement('div');
        card.className = 'floor-card';
        card.innerHTML = `
            <div class="floor-header">
                <h3>${f.name}</h3>
                <span class="status-indicator ${sClass}">${f.status}</span>
            </div>
            <div class="floor-stats">
                <p><span>Gas Level:</span> <strong>${f.gas} ppm</strong></p>
                <p><span>Temperature:</span> <strong>${f.temp} &deg;C</strong></p>
                <p><span>Device:</span> <strong>${f.online ? '<span class="text-success">Online</span>' : '<span class="text-danger">Offline</span>'} (${f.battery}%)</strong></p>
            </div>
        `;
        list.appendChild(card);
        
        // Add listener for viewing workers
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            document.querySelectorAll('.floor-card').forEach(c => c.style.borderLeftColor = 'var(--primary)');
            card.style.borderLeftColor = 'var(--warning)';
            showFloorWorkers(f.name);
        });
    });

    initCharts();
    floorMapInstance = initMap('floorMap', 28.6149, 77.2100, 16, baseFloors);
}

function showFloorWorkers(floorName) {
    const workersCard = document.getElementById('floorWorkersCard');
    const workersTitle = document.getElementById('floorWorkersTitle');
    const workersList = document.getElementById('floorWorkersList');

    workersTitle.innerHTML = `<i class="fa-solid fa-user-group text-primary"></i> Personnel Active on ${floorName}`;
    workersList.innerHTML = '';
    
    let workers = mockData.floorWorkers[floorName] || [];

    if (workers.length === 0) {
        workersList.innerHTML = '<p class="text-muted">No active personnel detected on this floor.</p>';
    } else {
        workers.forEach(u => {
            const sClass = getStatusClass(u.status);
            const item = document.createElement('div');
            item.className = 'user-item';
            
            let dangerIcon = u.status === 'Danger' ? '<i class="fa-solid fa-triangle-exclamation text-danger"></i> ' : '';
            if (u.posture === 'Unconscious' || u.posture === 'Fallen') {
                dangerIcon = '<i class="fa-solid fa-person-falling text-danger"></i> ';
            }

            item.innerHTML = `
                <div class="user-info">
                    <h4>${dangerIcon}${u.name}</h4>
                    <p>HR: ${u.hr} bpm | Temp: ${u.temp}&deg;C | Pos: ${u.posture}</p>
                </div>
                <div class="status-indicator ${sClass}">${u.status}</div>
            `;
            workersList.appendChild(item);
        });
    }

    workersCard.style.display = 'block';
    workersCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

document.getElementById('closeFloorWorkersBtn').addEventListener('click', () => {
    document.getElementById('floorWorkersCard').style.display = 'none';
    document.querySelectorAll('.floor-card').forEach(c => c.style.borderLeftColor = 'var(--primary)');
});

function renderIndividualView() {
    const list = document.getElementById('usersList');
    list.innerHTML = '';
    
    let sosCount = 0;
    let hazardCount = 0;

    const isPersonal = currentDomain === 'Personal Use';
    const mainGrid = document.querySelector('.main-grid');
    
    if (isPersonal) {
        mainGrid.classList.add('personal-mode');
    } else {
        mainGrid.classList.remove('personal-mode');
    }

    let baseIndividuals = mockData.defenseIndividuals;
    if (currentDomain === 'Disaster Management') {
        baseIndividuals = mockData.disasterIndividuals;
    }

    const displayedUsers = isPersonal ? [baseIndividuals[0]] : baseIndividuals;

    displayedUsers.forEach(u => {
        if (u.sos) sosCount++;
        if (u.status === 'Danger' || u.status === 'Warning') hazardCount++;

        if (!isPersonal) {
            const sClass = getStatusClass(u.status);
            const item = document.createElement('div');
            item.className = 'user-item';
            if(u.sos) item.classList.add('user-item-danger');
            
            item.innerHTML = `
                <div class="user-info">
                    <h4>${u.name} ${u.sos ? '<i class="fa-solid fa-triangle-exclamation text-danger"></i>' : ''}</h4>
                    <p>HR: ${u.hr} bpm | Temp: ${u.temp}&deg;C | Pos: ${u.posture}</p>
                </div>
                <div class="status-indicator ${sClass}">${u.status}</div>
            `;
            
            item.addEventListener('click', () => {
                document.querySelectorAll('.user-item').forEach(el => el.classList.remove('active-user'));
                item.classList.add('active-user');
                showUserDetails(u);
            });

            list.appendChild(item);
        }
    });

    document.getElementById('sosAlerts').textContent = `${sosCount} SOS`;
    document.getElementById('hazardAlerts').textContent = `${hazardCount} Hazard`;

    indivMapInstance = initMap('indivMap', displayedUsers[0].lat, displayedUsers[0].lng, 14, displayedUsers);
    
    if (isPersonal) {
        showUserDetails(displayedUsers[0]);
    } else {
        document.getElementById('userDetailsCard').style.display = 'none';
    }

    if (isPersonal) {
        document.getElementById('emergencyContactCard').style.display = 'block';
    } else {
        document.getElementById('emergencyContactCard').style.display = 'none';
    }
}

function showUserDetails(user) {
    document.getElementById('userDetailsCard').style.display = 'block';
    document.getElementById('selectedUserName').textContent = user.name + ' Details';
    document.getElementById('detHr').textContent = `${user.hr} bpm`;
    document.getElementById('detGas').textContent = `${user.gas} ppm`;
    document.getElementById('detTemp').textContent = `${user.temp} °C`;
    
    document.getElementById('detPosture').textContent = user.posture;
    const postureIcon = document.getElementById('detPostureIcon');
    if (user.posture === 'Unconscious' || user.posture === 'Fallen') {
        document.getElementById('detPosture').classList.add('text-danger');
        postureIcon.className = 'fa-solid fa-person-falling text-danger';
    } else {
        document.getElementById('detPosture').classList.remove('text-danger');
        postureIcon.className = 'fa-solid fa-person';
        postureIcon.style.color = 'var(--text-main)';
    }
    
    const aiElem = document.getElementById('detAi');
    const aiIcon = document.getElementById('detAiIcon');
    aiElem.textContent = user.aiPrediction;
    
    aiIcon.className = 'fa-solid fa-brain';
    aiElem.className = '';
    
    if(user.status === 'Danger') {
        aiElem.classList.add('text-danger');
        aiIcon.classList.add('text-danger');
    } else if (user.status === 'Warning') {
        aiElem.classList.add('text-warning');
        aiIcon.classList.add('text-warning');
    } else {
        aiElem.classList.add('text-success');
        aiIcon.classList.add('text-success');
    }

    if(indivMapInstance) {
        indivMapInstance.setView([user.lat, user.lng], 16, {animate: true});
    }

    const emergencyAlertStatus = document.getElementById('emergencyAlertStatus');
    if (emergencyAlertStatus) {
        if (currentDomain === 'Personal Use' && (user.posture === 'Unconscious' || user.posture === 'Fallen')) {
            emergencyAlertStatus.style.display = 'block';
        } else {
            emergencyAlertStatus.style.display = 'none';
        }
    }
}

function renderLandingView() {
    if (!globalHeatmapInstance) {
        const mapId = 'globalHeatmap';
        const container = L.DomUtil.get(mapId);
        if(container != null){
            container._leaflet_id = null;
        }
        
        globalHeatmapInstance = L.map(mapId).setView([31.0, 0.0], 2);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(globalHeatmapInstance);

        const allData = [
            ...mockData.industryFloors,
            ...mockData.healthcareFloors,
            ...mockData.defenseIndividuals,
            ...mockData.disasterIndividuals
        ];

        const heatData = allData.map(item => [item.lat, item.lng, item.gas * 5]);

        L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            max: 500
        }).addTo(globalHeatmapInstance);

        const bounds = L.latLngBounds(allData.map(item => [item.lat, item.lng]));
        if(bounds.isValid()) {
            globalHeatmapInstance.fitBounds(bounds, { padding: [50, 50] });
        }

        if (mockData.historicalExplosions) {
            mockData.historicalExplosions.forEach(exp => {
                const markerHtml = `
                    <div style="background-color: #000; color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #ef4444; display: flex; align-items: center; justify-content: center; font-size: 10px; box-shadow: 0 0 10px rgba(239,68,68,0.8);">
                        <i class="fa-solid fa-bomb"></i>
                    </div>
                `;
                const customIcon = L.divIcon({
                    html: markerHtml,
                    className: 'custom-leaflet-icon',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });

                L.marker([exp.lat, exp.lng], {icon: customIcon})
                    .addTo(globalHeatmapInstance)
                    .bindPopup(`<b><i class="fa-solid fa-triangle-exclamation text-danger"></i> Past Gas Explosion</b><br><b>Date:</b> ${exp.date}<br><b>Time:</b> ${exp.time}<br><b>Details:</b> ${exp.description}`);
            });
        }
    }
    
    setTimeout(() => { globalHeatmapInstance.invalidateSize(); }, 400);

    const aqiContainer = document.getElementById('aqiContainer');
    if (aqiContainer && aqiContainer.innerHTML === '') {
        mockData.karnatakaAQI.forEach(data => {
            let color = 'var(--success)';
            if (data.aqi > 100) color = 'var(--warning)';
            if (data.aqi > 200) color = 'var(--danger)';
            
            const progress = Math.min((data.aqi / 300) * 100, 100); 
            
            const card = document.createElement('div');
            card.className = 'aqi-card';
            if (data.hasDetails) card.style.cursor = 'pointer';
            card.innerHTML = `
                <div class="circular-score" style="--progress: ${progress}%; --progress-color: ${color};">
                    <span>${data.aqi}</span>
                </div>
                <h4 style="font-size: 14px; margin-bottom: 5px;">${data.city}</h4>
                <p style="font-size: 11px; color: var(--text-muted);">AQI Score</p>
            `;
            
            if (data.hasDetails) {
                card.addEventListener('click', () => {
                    const areaKey = data.city.toLowerCase() + 'AreasAQI';
                    if (mockData[areaKey]) {
                        showCityAqiDetails(data.city, mockData[areaKey]);
                    }
                });
            }
            
            aqiContainer.appendChild(card);
        });
    }
}

function showCityAqiDetails(cityName, areaData) {
    const detailsContainer = document.getElementById('cityAqiDetails');
    const aqiList = document.getElementById('cityAqiContainer');
    const title = document.getElementById('cityAqiTitle');
    
    title.innerHTML = `<i class="fa-solid fa-map-pin text-primary"></i> AQI Details: ${cityName} Areas`;
    aqiList.innerHTML = '';
    
    areaData.forEach(data => {
        let color = 'var(--success)';
        if (data.aqi > 100) color = 'var(--warning)';
        if (data.aqi > 200) color = 'var(--danger)';
        
        const progress = Math.min((data.aqi / 300) * 100, 100); 
        
        const card = document.createElement('div');
        card.className = 'aqi-card';
        card.innerHTML = `
            <div class="circular-score" style="--progress: ${progress}%; --progress-color: ${color};">
                <span>${data.aqi}</span>
            </div>
            <h4 style="font-size: 13px; margin-bottom: 5px;">${data.area}</h4>
            <p style="font-size: 11px; color: var(--text-muted);">AQI</p>
        `;
        aqiList.appendChild(card);
    });
    
    detailsContainer.style.display = 'block';
    detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

document.getElementById('closeCityAqiBtn').addEventListener('click', () => {
    document.getElementById('cityAqiDetails').style.display = 'none';
});

// Initial Load
loadNotifications();
renderLandingView();
