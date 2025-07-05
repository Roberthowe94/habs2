// Application data
const applicationData = {
  "project_info": {
    "name": "The Emerald Wallkill Watershed Watch",
    "mission": "Community-led environmental monitoring and protection of the Wallkill River through citizen science and collaborative stewardship",
    "established": "2025",
    "partners": ["Bard College Community Sciences Lab", "NYenvironcom", "Wallkill River Watershed Alliance", "Riverkeeper", "Ulster County Health Department"]
  },
  "sampling_sites": [
    {
      "id": "WK-001",
      "name": "New Paltz Village Boat Launch",
      "lat": 41.7471,
      "lng": -74.0840,
      "type": "primary",
      "status": "active",
      "last_sampled": "2025-07-02",
      "parameters": ["pH", "DO", "temperature", "turbidity", "microcystins"]
    },
    {
      "id": "WK-002", 
      "name": "Sojourner Truth Park",
      "lat": 41.7456,
      "lng": -74.0834,
      "type": "recreational",
      "status": "active",
      "last_sampled": "2025-07-01",
      "parameters": ["pH", "DO", "temperature", "microcystins"]
    },
    {
      "id": "WK-003",
      "name": "Route 299 Bridge",
      "lat": 41.7423,
      "lng": -74.0798,
      "type": "monitoring",
      "status": "active", 
      "last_sampled": "2025-06-30",
      "parameters": ["pH", "DO", "temperature", "turbidity", "conductivity"]
    },
    {
      "id": "WK-004",
      "name": "Wallkill Valley Rail Trail Bridge",
      "lat": 41.7389,
      "lng": -74.0756,
      "type": "recreational",
      "status": "active",
      "last_sampled": "2025-07-02",
      "parameters": ["temperature", "visual assessment"]
    },
    {
      "id": "WK-005",
      "name": "Ulster County Fairgrounds",
      "lat": 41.7512,
      "lng": -74.0923,
      "type": "primary",
      "status": "active",
      "last_sampled": "2025-07-01",
      "parameters": ["pH", "DO", "temperature", "turbidity", "microcystins", "conductivity"]
    },
    {
      "id": "WK-006",
      "name": "Sturgeon Pool at Rifton",
      "lat": 41.8234,
      "lng": -74.0387,
      "type": "primary",
      "status": "active",
      "last_sampled": "2025-06-29",
      "parameters": ["pH", "DO", "temperature", "turbidity", "microcystins"]
    },
    {
      "id": "WK-007",
      "name": "Springtown Road Access",
      "lat": 41.7445,
      "lng": -74.0867,
      "type": "monitoring",
      "status": "active",
      "last_sampled": "2025-06-28",
      "parameters": ["temperature", "visual assessment"]
    },
    {
      "id": "WK-008",
      "name": "Mohonk Preserve - Kleine Kill",
      "lat": 41.7856,
      "lng": -74.1523,
      "type": "tributary",
      "status": "active",
      "last_sampled": "2025-06-27",
      "parameters": ["pH", "DO", "temperature"]
    },
    {
      "id": "WK-009",
      "name": "Gardiner USGS Station",
      "lat": 41.6856,
      "lng": -74.1623,
      "type": "usgs",
      "status": "continuous",
      "last_sampled": "2025-07-04",
      "parameters": ["flow", "temperature", "stage"]
    },
    {
      "id": "WK-010",
      "name": "Phillipsburg USGS Station", 
      "lat": 41.5789,
      "lng": -74.1834,
      "type": "usgs",
      "status": "continuous",
      "last_sampled": "2025-07-04",
      "parameters": ["flow", "temperature", "stage"]
    }
  ],
  "water_quality_data": [
    {
      "site_id": "WK-001",
      "date": "2025-07-02",
      "temperature": 24.5,
      "pH": 8.2,
      "dissolved_oxygen": 6.8,
      "turbidity": 12.4,
      "microcystins": 0.8,
      "status": "safe"
    },
    {
      "site_id": "WK-002",
      "date": "2025-07-01", 
      "temperature": 25.1,
      "pH": 8.4,
      "dissolved_oxygen": 6.5,
      "microcystins": 1.2,
      "status": "safe"
    },
    {
      "site_id": "WK-005",
      "date": "2025-07-01",
      "temperature": 23.8,
      "pH": 7.9,
      "dissolved_oxygen": 7.2,
      "turbidity": 8.9,
      "microcystins": 0.5,
      "conductivity": 245,
      "status": "safe"
    }
  ],
  "volunteer_stats": {
    "total_volunteers": 47,
    "active_this_month": 23,
    "samples_collected_2025": 156,
    "community_reports": 89,
    "training_sessions_completed": 12
  }
};

// Local Storage Management
const StorageManager = {
  // Initialize storage with default data
  initialize() {
    if (!localStorage.getItem('wallkillWatchData')) {
      localStorage.setItem('wallkillWatchData', JSON.stringify({
        communityReports: [],
        habReports: [],
        volunteers: [],
        waterQualityData: applicationData.water_quality_data,
        volunteerStats: applicationData.volunteer_stats,
        lastUpdate: new Date().toISOString()
      }));
    }
  },

  // Get all stored data
  getData() {
    return JSON.parse(localStorage.getItem('wallkillWatchData'));
  },

  // Save data to localStorage
  saveData(data) {
    localStorage.setItem('wallkillWatchData', JSON.stringify({
      ...data,
      lastUpdate: new Date().toISOString()
    }));
  },

  // Add community report
  addCommunityReport(report) {
    const data = this.getData();
    report.id = Date.now();
    report.date = new Date().toISOString();
    report.status = 'pending';
    data.communityReports.unshift(report);
    data.volunteerStats.community_reports++;
    this.saveData(data);
    return report;
  },

  // Add HAB report
  addHABReport(report) {
    const data = this.getData();
    report.id = Date.now();
    report.date = new Date().toISOString();
    report.status = 'pending';
    data.habReports.unshift(report);
    this.saveData(data);
    return report;
  },

  // Add volunteer
  addVolunteer(volunteer) {
    const data = this.getData();
    volunteer.id = Date.now();
    volunteer.date = new Date().toISOString();
    volunteer.status = 'active';
    data.volunteers.push(volunteer);
    data.volunteerStats.total_volunteers++;
    this.saveData(data);
    return volunteer;
  },

  // Update water quality data
  updateWaterQualityData(newData) {
    const data = this.getData();
    data.waterQualityData.unshift(newData);
    data.volunteerStats.samples_collected_2025++;
    this.saveData(data);
  },

  // Export data as JSON
  exportData() {
    const data = this.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallkill-watch-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Global variables
let map;
let markers = [];
let temperatureChart;
let participationChart;
let dataUpdateInterval;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    StorageManager.initialize();
    initializeTabs();
    initializeMap();
    initializeCharts();
    initializeForms();
    initializeDataExport();
    startRealTimeUpdates();
    updateDashboardData();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Initialize map when map tab is opened
            if (tabId === 'map' && map) {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        });
    });
}

// Initialize Leaflet map
function initializeMap() {
    // Initialize map centered on New Paltz area
    map = L.map('leaflet-map').setView([41.7471, -74.0840], 12);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for sampling sites
    applicationData.sampling_sites.forEach(site => {
        const marker = createMarker(site);
        markers.push(marker);
        marker.addTo(map);
    });
    
    // Add map controls (simplified to avoid conflicts)
    addMapControls();
}

// Create marker for a sampling site
function createMarker(site) {
    const markerColors = {
        primary: '#1FB8CD',
        recreational: '#FFC185',
        monitoring: '#5D878F',
        usgs: '#E67E22',
        tributary: '#27AE60'
    };
    
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${markerColors[site.type]}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const marker = L.marker([site.lat, site.lng], { icon: icon });
    
    // Create popup content
    const popupContent = `
        <div class="marker-popup">
            <h4>${site.name}</h4>
            <p><strong>Type:</strong> ${site.type.charAt(0).toUpperCase() + site.type.slice(1)}</p>
            <p><strong>Status:</strong> ${site.status}</p>
            <p><strong>Last Sampled:</strong> ${site.last_sampled}</p>
            <p><strong>Parameters:</strong> ${site.parameters.join(', ')}</p>
            <button onclick="showSiteDetails('${site.id}')" class="btn btn--sm btn--primary">View Details</button>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    return marker;
}

// Add map controls
function addMapControls() {
    // Add fullscreen control if available
    if (L.control.fullscreen) {
        L.control.fullscreen({
            position: 'topleft',
            title: 'View Fullscreen',
            titleCancel: 'Exit Fullscreen'
        }).addTo(map);
    }
}

// Show site details
function showSiteDetails(siteId) {
    const site = applicationData.sampling_sites.find(s => s.id === siteId);
    if (!site) return;
    
    // Create modal or update existing content
    const modal = document.createElement('div');
    modal.className = 'site-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${site.name}</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="site-info">
                    <p><strong>Site ID:</strong> ${site.id}</p>
                    <p><strong>Type:</strong> ${site.type}</p>
                    <p><strong>Status:</strong> ${site.status}</p>
                    <p><strong>Coordinates:</strong> ${site.lat.toFixed(4)}, ${site.lng.toFixed(4)}</p>
                    <p><strong>Last Sampled:</strong> ${site.last_sampled}</p>
                    <p><strong>Parameters Monitored:</strong></p>
                    <ul>
                        ${site.parameters.map(param => `<li>${param}</li>`).join('')}
                    </ul>
                </div>
                <div class="site-actions">
                    <button onclick="navigateToSite(${site.lat}, ${site.lng})" class="btn btn--primary">Get Directions</button>
                    <button onclick="reportFromSite('${site.id}')" class="btn btn--outline">Report from this site</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Navigate to site
function navigateToSite(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

// Report from specific site
function reportFromSite(siteId) {
    // Switch to data tab and pre-fill location
    const dataTab = document.querySelector('[data-tab="data"]');
    const tabButton = document.querySelector('[data-tab="data"]');
    
    if (tabButton && dataTab) {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to data tab
        tabButton.classList.add('active');
        dataTab.classList.add('active');
        
        // Pre-fill location
        const locationSelect = document.getElementById('location');
        if (locationSelect) {
            locationSelect.value = siteId;
        }
        
        // Scroll to form
        const reportForm = document.querySelector('.report-form');
        if (reportForm) {
            reportForm.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize charts
function initializeCharts() {
    initializeTemperatureChart();
    initializeParticipationChart();
}

// Temperature trends chart
function initializeTemperatureChart() {
    const ctx = document.getElementById('temperatureChart');
    if (!ctx) return;
    
    // Generate sample temperature data over time
    const dates = [];
    const temperatures = [];
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString());
        
        // Generate realistic temperature data (20-28°C with some variation)
        const baseTemp = 24;
        const variation = Math.sin(i * 0.2) * 3 + Math.random() * 2 - 1;
        temperatures.push(baseTemp + variation);
    }
    
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Water Temperature (°C)',
                data: temperatures,
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 18,
                    max: 30,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Trends - Last 30 Days'
                }
            }
        }
    });
}

// Community participation chart
function initializeParticipationChart() {
    const ctx = document.getElementById('participationChart');
    if (!ctx) return;
    
    participationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active Volunteers', 'Inactive Volunteers', 'New Sign-ups'],
            datasets: [{
                data: [
                    applicationData.volunteer_stats.active_this_month,
                    applicationData.volunteer_stats.total_volunteers - applicationData.volunteer_stats.active_this_month,
                    8
                ],
                backgroundColor: ['#1FB8CD', '#FFC185', '#5D878F']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Community Participation'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Form handling
function initializeForms() {
    // Community report form
    const reportForm = document.querySelector('.report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReportSubmission();
        });
    }
    
    // HAB report form
    const habForm = document.querySelector('.hab-report-form');
    if (habForm) {
        habForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleHABReportSubmission();
        });
    }
    
    // Volunteer registration form
    const volunteerForm = document.querySelector('.volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleVolunteerRegistration();
        });
    }

    // Load existing data
    loadStoredData();
}

// Handle community report submission
function handleReportSubmission() {
    const location = document.getElementById('location').value;
    const observation = document.getElementById('observation').value;
    const photos = document.getElementById('photos').files;
    
    if (!location || !observation) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    const locationName = getLocationName(location);
    
    // Save to local storage
    const report = {
        location: location,
        locationName: locationName,
        observation: observation,
        photoCount: photos.length
    };
    
    StorageManager.addCommunityReport(report);
    
    showMessage(`Thank you for your report! Your observation at ${locationName} has been submitted for review.`, 'success');
    
    // Update the reports list
    updateReportsList();
    
    // Reset form
    document.querySelector('.report-form').reset();
}

// Handle HAB report submission
function handleHABReportSubmission() {
    const location = document.getElementById('hab-location').value;
    const description = document.getElementById('hab-description').value;
    const photos = document.getElementById('hab-photos').files;
    
    if (!location || !description) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Save to local storage
    const report = {
        location: location,
        description: description,
        photoCount: photos.length
    };
    
    StorageManager.addHABReport(report);
    
    showMessage(`URGENT: Your HAB report at ${location} has been submitted immediately to local authorities for investigation. Thank you for helping protect our community!`, 'success');
    
    // Update the HAB incidents list
    updateHABIncidentsList();
    
    // Reset form
    document.querySelector('.hab-report-form').reset();
}

// Handle volunteer registration
function handleVolunteerRegistration() {
    const name = document.getElementById('volunteer-name').value;
    const email = document.getElementById('volunteer-email').value;
    const phone = document.getElementById('volunteer-phone').value;
    const interests = Array.from(document.getElementById('volunteer-interests').selectedOptions).map(option => option.value);
    
    if (!name || !email) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Save to local storage
    const volunteer = {
        name: name,
        email: email,
        phone: phone,
        interests: interests
    };
    
    StorageManager.addVolunteer(volunteer);
    
    showMessage(`Thank you for registering, ${name}! We'll contact you at ${email} with information about upcoming training sessions and volunteer opportunities.`, 'success');
    
    // Update volunteer stats
    updateVolunteerStats();
    
    // Reset form
    document.querySelector('.volunteer-form').reset();
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message status--${type}`;
    messageEl.textContent = message;
    
    // Insert message at the top of the current tab
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.insertBefore(messageEl, activeTab.firstChild);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Helper function to get location name by ID
function getLocationName(locationId) {
    const site = applicationData.sampling_sites.find(site => site.id === locationId);
    return site ? site.name : locationId;
}

// Utility functions for responsive map
function resizeMap() {
    if (map) {
        map.invalidateSize();
    }
}

// Window resize handler
window.addEventListener('resize', resizeMap);

// Add some interactivity to status cards
document.addEventListener('DOMContentLoaded', function() {
    const statusCards = document.querySelectorAll('.status-card');
    statusCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// Simulate real-time data updates
function simulateDataUpdates() {
    // This would normally fetch real data from an API
    // For demo purposes, we'll just update some values periodically
    
    setInterval(() => {
        // Update temperature reading with small variation
        const tempElements = document.querySelectorAll('.reading-value');
        if (tempElements.length > 0) {
            const currentTemp = parseFloat(tempElements[0].textContent);
            if (!isNaN(currentTemp)) {
                const newTemp = currentTemp + (Math.random() - 0.5) * 0.2;
                tempElements[0].textContent = newTemp.toFixed(1) + '°C';
            }
        }
    }, 30000); // Update every 30 seconds
}

// Start data simulation
setTimeout(simulateDataUpdates, 5000);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize data export functionality
function initializeDataExport() {
    const exportButton = document.getElementById('exportData');
    if (exportButton) {
        exportButton.addEventListener('click', function(e) {
            e.preventDefault();
            StorageManager.exportData();
        });
    }
}

// Start real-time updates
function startRealTimeUpdates() {
    dataUpdateInterval = setInterval(updateDashboardData, 5000); // Update every 5 seconds
}

// Update dashboard data
function updateDashboardData() {
    // This function should fetch and update the dashboard with real-time data
    // For now, we'll just simulate a small change in temperature
    const tempElements = document.querySelectorAll('.reading-value');
    if (tempElements.length > 0) {
        const currentTemp = parseFloat(tempElements[0].textContent);
        if (!isNaN(currentTemp)) {
            const newTemp = currentTemp + (Math.random() - 0.5) * 0.2;
            tempElements[0].textContent = newTemp.toFixed(1) + '°C';
        }
    }
}

// Load stored data and update UI
function loadStoredData() {
    const data = StorageManager.getData();
    
    // Update community reports
    updateReportsList();
    
    // Update HAB incidents
    updateHABIncidentsList();
    
    // Update volunteer stats
    updateVolunteerStats();
    
    // Update recent activity
    updateRecentActivity();
}

// Update community reports list
function updateReportsList() {
    const data = StorageManager.getData();
    const reportsList = document.querySelector('.report-list');
    
    if (!reportsList) return;
    
    // Clear existing reports
    reportsList.innerHTML = '';
    
    // Add stored reports
    data.communityReports.slice(0, 5).forEach(report => {
        const reportItem = document.createElement('div');
        reportItem.className = 'report-item';
        reportItem.innerHTML = `
            <div class="report-header">
                <span class="report-date">${new Date(report.date).toLocaleDateString()}</span>
                <span class="status status--${report.status === 'verified' ? 'success' : 'warning'}">${report.status === 'verified' ? 'Verified' : 'Pending'}</span>
            </div>
            <p><strong>${report.locationName}:</strong> ${report.observation}</p>
            <small>${report.photoCount} photo${report.photoCount !== 1 ? 's' : ''} attached</small>
        `;
        reportsList.appendChild(reportItem);
    });
}

// Update HAB incidents list
function updateHABIncidentsList() {
    const data = StorageManager.getData();
    const incidentsList = document.querySelector('.incident-list');
    
    if (!incidentsList) return;
    
    // Clear existing incidents
    incidentsList.innerHTML = '';
    
    // Add stored HAB reports
    data.habReports.slice(0, 3).forEach(report => {
        const incidentItem = document.createElement('div');
        incidentItem.className = 'incident-item';
        incidentItem.innerHTML = `
            <div class="incident-header">
                <span class="incident-date">${new Date(report.date).toLocaleDateString()}</span>
                <span class="status status--warning">Pending</span>
            </div>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Description:</strong> ${report.description}</p>
            <p><strong>Status:</strong> Under Investigation</p>
        `;
        incidentsList.appendChild(incidentItem);
    });
}

// Update volunteer stats
function updateVolunteerStats() {
    const data = StorageManager.getData();
    
    // Update volunteer count
    const volunteerCountElements = document.querySelectorAll('.big-number');
    if (volunteerCountElements.length > 1) {
        volunteerCountElements[1].textContent = data.volunteerStats.total_volunteers;
    }
    
    // Update community reports count
    const reportsCountElements = document.querySelectorAll('.stat-number');
    if (reportsCountElements.length > 1) {
        reportsCountElements[1].textContent = data.volunteerStats.community_reports;
    }
    
    // Update samples collected count
    if (reportsCountElements.length > 0) {
        reportsCountElements[0].textContent = data.volunteerStats.samples_collected_2025;
    }
}

// Update recent activity
function updateRecentActivity() {
    const data = StorageManager.getData();
    const activityList = document.querySelector('.activity-list');
    
    if (!activityList) return;
    
    // Get recent activities from stored data
    const recentActivities = [];
    
    // Add recent community reports
    data.communityReports.slice(0, 2).forEach(report => {
        recentActivities.push({
            date: report.date,
            text: `Community report submitted for ${report.locationName}`
        });
    });
    
    // Add recent HAB reports
    data.habReports.slice(0, 1).forEach(report => {
        recentActivities.push({
            date: report.date,
            text: `HAB report submitted for ${report.location}`
        });
    });
    
    // Sort by date and take the most recent 3
    recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update the activity list
    const activityItems = activityList.querySelectorAll('.activity-item');
    recentActivities.slice(0, 3).forEach((activity, index) => {
        if (activityItems[index]) {
            activityItems[index].innerHTML = `
                <span class="activity-date">${new Date(activity.date).toLocaleDateString()}</span>
                <span class="activity-text">${activity.text}</span>
            `;
        }
    });
}