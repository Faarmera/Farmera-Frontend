import React, { createContext, useContext, useState } from 'react';

// Dummy pickup station data
const pickupStations = [
  {
    id: 1,
    name: "Central Logistics Hub",
    address: "123 Main Street, Downtown",
    city: "Lagos",
    state: "Lagos State",
    contactPhone: "+234 801 234 5678",
    operatingHours: "8:00 AM - 6:00 PM",
    coordinates: { lat: 6.5244, lng: 3.3792 }
  },
  {
    id: 2,
    name: "East Side Collection Point",
    address: "45 Market Road, Eastville",
    city: "Lagos",
    state: "Lagos State",
    contactPhone: "+234 802 345 6789",
    operatingHours: "9:00 AM - 7:00 PM",
    coordinates: { lat: 6.5143, lng: 3.3654 }
  },
  {
    id: 3,
    name: "West End Delivery Center",
    address: "78 Commercial Avenue, Westside",
    city: "Lagos",
    state: "Lagos State",
    contactPhone: "+234 803 456 7890",
    operatingHours: "8:30 AM - 6:30 PM",
    coordinates: { lat: 6.5366, lng: 3.3521 }
  },
  {
    id: 4,
    name: "North Gate Station",
    address: "234 Industrial Way, Northside",
    city: "Abuja",
    state: "FCT",
    contactPhone: "+234 804 567 8901",
    operatingHours: "8:00 AM - 8:00 PM",
    coordinates: { lat: 9.0765, lng: 7.3986 }
  },
  {
    id: 5,
    name: "South Point Collection",
    address: "567 Marina Street, Southside",
    city: "Port Harcourt",
    state: "Rivers State",
    contactPhone: "+234 805 678 9012",
    operatingHours: "9:00 AM - 5:00 PM",
    coordinates: { lat: 4.8156, lng: 7.0498 }
  }
];

// Create Context
const PickupStationContext = createContext(null);

// Create Provider
export const PickupStationProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  const value = {
    pickupStations,
    selectedStation,
    setSelectedStation
  };

  return (
    <PickupStationContext.Provider value={value}>
      {children}
    </PickupStationContext.Provider>
  );
};

export const usePickupStations = () => {
    const context = useContext(PickupStationContext);
    if (!context) {
      throw new Error('usePickupStations must be used within a PickupStationProvider');
    }
    return context;
  };