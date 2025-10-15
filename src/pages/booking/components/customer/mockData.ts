export const mockVehicles = [
  { plate: "51A-12345", vin: "VIN123", model: "Toyota Camry 2023" },
  { plate: "52B-54321", vin: "VIN456", model: "Honda Civic 2022" },
  { plate: "51C-98765", vin: "VIN789", model: "Ford Mustang 2021" },
];

export const mockServices = [
  { id: "1", name: "Oil Change" },
  { id: "2", name: "Brake Check & Pad Replacement" },
  { id: "3", name: "Tire Rotation & Balance" },
  { id: "4", name: "Engine Diagnostic" },
  { id: "5", name: "AC Service" },
  { id: "6", name: "Transmission Fluid Change" },
  { id: "7", name: "Battery Check" },
];

export const mockPackages = [
  { id: "1", name: "Basic Maintenance" },
  { id: "2", name: "Premium Service Package" },
  { id: "3", name: "Complete Inspection" },
  { id: "4", name: "Winter Prep Package" },
];

export const fetchCenters = async () => [
  { id: "1", name: "Downtown Service Center" },
  { id: "2", name: "Eastside Auto Care" },
  { id: "3", name: "North Highway Garage" },
];