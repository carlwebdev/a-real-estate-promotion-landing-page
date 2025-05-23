// Google Maps Integration

// Initialize the map
function initMap() {
    // Map location (replace with your actual coordinates)
    const location = { lat: 40.7128, lng: -74.0060 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15,
        styles: mapStyles, // Custom map styles
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false
    });
    
    // Add marker for the building
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'The Residences',
        icon: {
            url: '../images/icons/map-marker.svg',
            scaledSize: new google.maps.Size(40, 40)
        }
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="map-info-window">
                <h3>The Residences</h3>
                <p>123 Urban Avenue<br>City Center, 10001</p>
                <a href="https://maps.google.com/maps?daddr=40.7128,-74.0060" target="_blank">Get Directions</a>
            </div>
        `
    });
    
    // Open info window when marker is clicked
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    // Add nearby amenities markers
    const amenities = [
        { name: 'Central Station', type: 'transit', lat: 40.7138, lng: -74.0070 },
        { name: 'City Park', type: 'park', lat: 40.7148, lng: -74.0040 },
        { name: 'Shopping District', type: 'shopping', lat: 40.7118, lng: -74.0030 },
        { name: 'Restaurant Row', type: 'dining', lat: 40.7108, lng: -74.0080 },
        { name: 'International School', type: 'school', lat: 40.7158, lng: -74.0050 },
        { name: 'Medical Center', type: 'hospital', lat: 40.7168, lng: -74.0090 }
    ];
    
    // Add amenity markers
    amenities.forEach(amenity => {
        const amenityMarker = new google.maps.Marker({
            position: { lat: amenity.lat, lng: amenity.lng },
            map: map,
            title: amenity.name,
            icon: {
                url: `../images/icons/map-${amenity.type}.svg`,
                scaledSize: new google.maps.Size(30, 30)
            }
        });
        
        // Add info window for each amenity
        const amenityInfoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${amenity.name}</h3>
                    <p>${getAmenityDescription(amenity.type)}</p>
                </div>
            `
        });
        
        // Open info window when amenity marker is clicked
        amenityMarker.addListener('click', function() {
            amenityInfoWindow.open(map, amenityMarker);
        });
    });
}

// Helper function to get amenity descriptions
function getAmenityDescription(type) {
    const descriptions = {
        transit: 'Public transportation hub with subway and bus connections.',
        park: 'Green space with walking paths, playgrounds, and recreational areas.',
        shopping: 'Retail district with boutiques, department stores, and cafes.',
        dining: 'Various restaurants offering international and local cuisine.',
        school: 'Educational institution with excellent academic programs.',
        hospital: 'Full-service medical facility with emergency care.'
    };
    
    return descriptions[type] || '';
}

// Custom map styles
const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#3498db"
            },
            {
                "visibility": "on"
            }
        ]
    }
];