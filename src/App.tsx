import React, { useState, useEffect } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";

const MOCK_MARKETS = [
  { name: "Agro Market A", distance: "5 km" },
  { name: "Green Valley Market", distance: "12 km" },
  { name: "Farmers' Hub", distance: "20 km" },
];
const MOCK_PRICES: { [key: string]: { min: number; max: number; period: string } } = {
  wheat: { min: 1800, max: 2200, period: "March - April" },
  rice: { min: 1500, max: 2000, period: "October - November" },
  maize: { min: 1200, max: 1700, period: "September - October" },
};

// All States and Union Territories of India
const INDIAN_STATES = [
  { id: "AP", name: "Andhra Pradesh" },
  { id: "AR", name: "Arunachal Pradesh" },
  { id: "AS", name: "Assam" },
  { id: "BR", name: "Bihar" },
  { id: "CT", name: "Chhattisgarh" },
  { id: "GA", name: "Goa" },
  { id: "GJ", name: "Gujarat" },
  { id: "HR", name: "Haryana" },
  { id: "HP", name: "Himachal Pradesh" },
  { id: "JH", name: "Jharkhand" },
  { id: "KA", name: "Karnataka" },
  { id: "KL", name: "Kerala" },
  { id: "MP", name: "Madhya Pradesh" },
  { id: "MH", name: "Maharashtra" },
  { id: "MN", name: "Manipur" },
  { id: "ML", name: "Meghalaya" },
  { id: "MZ", name: "Mizoram" },
  { id: "NL", name: "Nagaland" },
  { id: "OR", name: "Odisha" },
  { id: "PB", name: "Punjab" },
  { id: "RJ", name: "Rajasthan" },
  { id: "SK", name: "Sikkim" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "TG", name: "Telangana" },
  { id: "TR", name: "Tripura" },
  { id: "UP", name: "Uttar Pradesh" },
  { id: "UT", name: "Uttarakhand" },
  { id: "WB", name: "West Bengal" },
  // Union Territories
  { id: "AN", name: "Andaman and Nicobar Islands" },
  { id: "CH", name: "Chandigarh" },
  { id: "DN", name: "Dadra and Nagar Haveli and Daman and Diu" },
  { id: "DL", name: "Delhi" },
  { id: "JK", name: "Jammu and Kashmir" },
  { id: "LA", name: "Ladakh" },
  { id: "LD", name: "Lakshadweep" },
  { id: "PY", name: "Puducherry" }
];

// Equipment Data
const equipmentList = [
  {
    name: "Tractor",
    icon: "🚜",
    category: "Machinery",
    priceRange: "₹3,00,000 - ₹10,00,000",
    features: [
      "20-60 HP engine options",
      "4WD/2WD variants",
      "Hydraulic lift, PTO, and drawbar",
      "Fuel efficient, easy maintenance"
    ],
    suitableFor: ["Land preparation", "Sowing", "Transport"],
    maintenance: "Regular oil changes, filter cleaning, and timely servicing."
  },
  {
    name: "Rotavator",
    icon: "🪓",
    category: "Implement",
    priceRange: "₹60,000 - ₹1,50,000",
    features: [
      "Efficient soil pulverization",
      "Reduces weed growth",
      "Saves time and labor"
    ],
    suitableFor: ["Seedbed preparation", "Weed control"],
    maintenance: "Check blades for wear, lubricate moving parts."
  },
  {
    name: "Seed Drill",
    icon: "🌱",
    category: "Implement",
    priceRange: "₹40,000 - ₹1,20,000",
    features: [
      "Uniform seed placement",
      "Reduces seed wastage",
      "Improves germination rates"
    ],
    suitableFor: ["Sowing wheat, rice, pulses, oilseeds"],
    maintenance: "Clean after use, check for blockages."
  },
  {
    name: "Sprinkler Irrigation System",
    icon: "💧",
    category: "Irrigation",
    priceRange: "₹25,000 - ₹1,00,000 per acre",
    features: [
      "Uniform water distribution",
      "Reduces water usage",
      "Suitable for most crops"
    ],
    suitableFor: ["Vegetables", "Cereals", "Pulses"],
    maintenance: "Check for leaks, clean nozzles regularly."
  },
  {
    name: "Drip Irrigation System",
    icon: "💦",
    category: "Irrigation",
    priceRange: "₹35,000 - ₹1,20,000 per acre",
    features: [
      "Targeted water delivery",
      "Reduces evaporation loss",
      "Ideal for row crops, fruits"
    ],
    suitableFor: ["Fruits", "Vegetables", "Flowers"],
    maintenance: "Flush lines, check emitters for clogging."
  },
  {
    name: "Combine Harvester",
    icon: "🚜",
    category: "Machinery",
    priceRange: "₹15,00,000 - ₹30,00,000",
    features: [
      "Harvests, threshes, and cleans in one pass",
      "Saves labor and time",
      "Reduces grain loss"
    ],
    suitableFor: ["Wheat", "Rice", "Maize"],
    maintenance: "Clean after use, check belts and blades."
  },
  {
    name: "Cold Storage Unit",
    icon: "❄️",
    category: "Storage",
    priceRange: "₹2,00,000 - ₹10,00,000",
    features: [
      "Preserves produce freshness",
      "Reduces post-harvest losses",
      "Essential for perishable crops"
    ],
    suitableFor: ["Fruits", "Vegetables", "Flowers"],
    maintenance: "Monitor temperature, regular servicing."
  },
  {
    name: "Power Tiller",
    icon: "🛠️",
    category: "Machinery",
    priceRange: "₹1,00,000 - ₹2,50,000",
    features: [
      "Compact and versatile",
      "Ideal for small farms",
      "Multiple attachments available"
    ],
    suitableFor: ["Land preparation", "Inter-cultivation"],
    maintenance: "Check oil, tighten bolts, clean after use."
  }
];

// Irrigation Types Data
const irrigationTypes = [
  {
    name: "Drip Irrigation",
    icon: "💧",
    cost: "₹35,000 - ₹1,20,000 per acre",
    advantages: [
      "Highly water-efficient (saves 30-60%)",
      "Reduces weed growth",
      "Minimizes evaporation loss",
      "Improves yield and quality"
    ],
    disadvantages: [
      "High initial investment",
      "Requires regular maintenance (clogging risk)",
      "Not ideal for all soil types"
    ],
    suitableCrops: ["Fruits", "Vegetables", "Flowers", "Sugarcane"],
    notes: "Best for row crops and orchards. Government subsidies often available."
  },
  {
    name: "Sprinkler Irrigation",
    icon: "🌦️",
    cost: "₹25,000 - ₹1,00,000 per acre",
    advantages: [
      "Uniform water distribution",
      "Suitable for undulating land",
      "Reduces labor requirement",
      "Can be automated"
    ],
    disadvantages: [
      "Water loss due to wind/evaporation",
      "Not ideal for all crops (e.g., some cereals)",
      "Nozzle clogging risk"
    ],
    suitableCrops: ["Wheat", "Pulses", "Vegetables", "Fodder"],
    notes: "Works well for most field crops and lawns."
  },
  {
    name: "Surface/Furrow Irrigation",
    icon: "🌊",
    cost: "₹5,000 - ₹15,000 per acre",
    advantages: [
      "Low initial cost",
      "Simple to operate",
      "No special equipment needed"
    ],
    disadvantages: [
      "High water loss (runoff, evaporation)",
      "Uneven distribution possible",
      "Labor intensive"
    ],
    suitableCrops: ["Rice", "Wheat", "Maize", "Sugarcane"],
    notes: "Traditional method, best for heavy soils and leveled fields."
  },
  {
    name: "Subsurface Irrigation",
    icon: "🕳️",
    cost: "₹60,000 - ₹2,00,000 per acre",
    advantages: [
      "Very efficient water use",
      "Reduces disease risk",
      "No surface evaporation"
    ],
    disadvantages: [
      "Very high installation cost",
      "Difficult to monitor and repair",
      "Not suitable for all soils"
    ],
    suitableCrops: ["Vegetables", "Fruits", "Flowers"],
    notes: "Used in high-value horticulture and research."
  }
];

// Government Schemes Data
const governmentSchemes = [
  {
    name: "PM-KISAN",
    icon: "💰",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to eligible farmer families",
    benefits: [
      "₹6,000 per year in 3 equal installments",
      "Direct bank transfer",
      "No middlemen involved",
      "Covers all farming families"
    ],
    eligibility: [
      "Small and marginal farmers",
      "Landholding up to 2 hectares",
      "Valid bank account",
      "Aadhaar linked"
    ],
    applicationProcess: "Apply through Common Service Centers (CSC) or online portal",
    website: "pmkisan.gov.in",
    status: "Active"
  },
  {
    name: "PMFBY",
    icon: "🛡️",
    fullName: "Pradhan Mantri Fasal Bima Yojana",
    description: "Comprehensive crop insurance scheme to protect farmers against natural calamities",
    benefits: [
      "Covers yield losses due to natural calamities",
      "Affordable premium rates",
      "Quick claim settlement",
      "Covers all food and oilseed crops"
    ],
    eligibility: [
      "All farmers growing notified crops",
      "Compulsory for loanee farmers",
      "Voluntary for non-loanee farmers",
      "Valid land records required"
    ],
    applicationProcess: "Apply through banks, insurance companies, or online portal",
    website: "pmfby.gov.in",
    status: "Active"
  },
  {
    name: "Soil Health Card",
    icon: "📋",
    fullName: "Soil Health Card Scheme",
    description: "Free soil testing and recommendations for balanced fertilizer use",
    benefits: [
      "Free soil testing every 3 years",
      "Personalized fertilizer recommendations",
      "Reduces input costs",
      "Improves soil fertility"
    ],
    eligibility: [
      "All farmers",
      "Valid land records",
      "Aadhaar linked",
      "No income limit"
    ],
    applicationProcess: "Apply at nearest soil testing laboratory or online",
    website: "soilhealth.dac.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY",
    icon: "💧",
    fullName: "Pradhan Mantri Krishi Sinchayee Yojana",
    description: "Comprehensive irrigation scheme to ensure water to every field",
    benefits: [
      "50% subsidy on micro-irrigation",
      "90% subsidy for small/marginal farmers",
      "Water conservation",
      "Increased crop productivity"
    ],
    eligibility: [
      "All farmers",
      "Valid land records",
      "Water source available",
      "Technical feasibility"
    ],
    applicationProcess: "Apply through state agriculture department",
    website: "pmksy.gov.in",
    status: "Active"
  },
  {
    name: "PMFME",
    icon: "🏭",
    fullName: "Pradhan Mantri Formalisation of Micro Food Processing Enterprises",
    description: "Support for food processing units and value addition",
    benefits: [
      "35% subsidy on project cost",
      "Credit linked assistance",
      "Skill development training",
      "Market linkage support"
    ],
    eligibility: [
      "Micro food processing units",
      "Individual entrepreneurs",
      "Self-help groups",
      "Producer organizations"
    ],
    applicationProcess: "Apply through state nodal agencies",
    website: "pmfme.mofpi.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-PDMC",
    icon: "🏗️",
    fullName: "PMKSY - Per Drop More Crop",
    description: "Micro-irrigation scheme for water use efficiency",
    benefits: [
      "55% subsidy for small/marginal farmers",
      "45% subsidy for other farmers",
      "Drip and sprinkler systems",
      "Water saving up to 50%"
    ],
    eligibility: [
      "All farmers",
      "Suitable crops",
      "Water availability",
      "Technical feasibility"
    ],
    applicationProcess: "Apply through agriculture department or online",
    website: "pmksy.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-AIBP",
    icon: "🌊",
    fullName: "PMKSY - Accelerated Irrigation Benefits Programme",
    description: "Financial assistance for major and medium irrigation projects",
    benefits: [
      "Central assistance for irrigation projects",
      "Faster project completion",
      "Increased irrigation potential",
      "Better water management"
    ],
    eligibility: [
      "State governments",
      "Irrigation projects",
      "Technical approval",
      "Environmental clearance"
    ],
    applicationProcess: "State governments apply to central ministry",
    website: "pmksy.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-HKKP",
    icon: "🏞️",
    fullName: "PMKSY - Har Khet Ko Pani",
    description: "Assistance for creation of new water sources and restoration",
    benefits: [
      "New water source creation",
      "Restoration of water bodies",
      "Groundwater development",
      "Water harvesting structures"
    ],
    eligibility: [
      "All farmers",
      "Water scarce areas",
      "Technical feasibility",
      "Community participation"
    ],
    applicationProcess: "Apply through state agriculture department",
    website: "pmksy.gov.in",
    status: "Active"
  }
];

// Harvest Planning Data
const harvestPlanningData = {
  crops: [
    {
      name: "Wheat",
      icon: "🌾",
      harvestTiming: {
        optimal: "March-April (Rabi)",
        indicators: ["Golden yellow color", "Hard grains", "Moisture content 14-16%"],
        duration: "7-10 days window"
      },
      storage: {
        conditions: "Cool, dry place (15-20°C)",
        moisture: "Below 12%",
        containers: "Gunny bags, metal bins",
        duration: "6-12 months"
      },
      marketAnalysis: {
        peakPrices: "October-December",
        demand: "High throughout year",
        storageValue: "Good for long-term storage"
      },
      postHarvest: [
        "Clean and grade grains",
        "Treat with approved pesticides",
        "Monitor for pests regularly",
        "Maintain proper ventilation"
      ]
    },
    {
      name: "Rice",
      icon: "🍚",
      harvestTiming: {
        optimal: "September-October (Kharif)",
        indicators: ["80-85% grains matured", "Yellowing of leaves", "Moisture 20-25%"],
        duration: "5-7 days window"
      },
      storage: {
        conditions: "Cool, dry place (10-15°C)",
        moisture: "Below 13%",
        containers: "Hermetic bags, silos",
        duration: "8-12 months"
      },
      marketAnalysis: {
        peakPrices: "January-March",
        demand: "Consistent high demand",
        storageValue: "Excellent for storage"
      },
      postHarvest: [
        "Dry to 12-13% moisture",
        "Remove broken grains",
        "Store in airtight containers",
        "Regular quality checks"
      ]
    },
    {
      name: "Corn/Maize",
      icon: "🌽",
      harvestTiming: {
        optimal: "September-October",
        indicators: ["Kernels hard and dented", "Brown silks", "Moisture 25-30%"],
        duration: "10-14 days window"
      },
      storage: {
        conditions: "Well-ventilated area",
        moisture: "Below 14%",
        containers: "Cribs, silos, bags",
        duration: "6-8 months"
      },
      marketAnalysis: {
        peakPrices: "November-December",
        demand: "High for feed industry",
        storageValue: "Moderate storage value"
      },
      postHarvest: [
        "Dry to 13-14% moisture",
        "Remove damaged cobs",
        "Control temperature",
        "Monitor for aflatoxin"
      ]
    },
    {
      name: "Soybeans",
      icon: "🫘",
      harvestTiming: {
        optimal: "October-November",
        indicators: ["Pods brown and dry", "Seeds rattle in pods", "Moisture 13-15%"],
        duration: "7-10 days window"
      },
      storage: {
        conditions: "Cool, dry storage",
        moisture: "Below 12%",
        containers: "Bulk storage, bags",
        duration: "12-18 months"
      },
      marketAnalysis: {
        peakPrices: "February-April",
        demand: "High for oil extraction",
        storageValue: "Excellent storage value"
      },
      postHarvest: [
        "Clean and grade beans",
        "Maintain low moisture",
        "Regular aeration",
        "Monitor for mold"
      ]
    },
    {
      name: "Cotton",
      icon: "🧶",
      harvestTiming: {
        optimal: "October-December",
        indicators: ["Bolls fully opened", "White fluffy fibers", "Dry weather"],
        duration: "Multiple pickings over 2-3 months"
      },
      storage: {
        conditions: "Dry, well-ventilated",
        moisture: "Below 8%",
        containers: "Compressed bales",
        duration: "12-24 months"
      },
      marketAnalysis: {
        peakPrices: "March-May",
        demand: "High for textile industry",
        storageValue: "Good storage value"
      },
      postHarvest: [
        "Grade by fiber length",
        "Remove impurities",
        "Compress into bales",
        "Store in dry conditions"
      ]
    },
    {
      name: "Sugarcane",
      icon: "🎋",
      harvestTiming: {
        optimal: "November-March",
        indicators: ["12-18 months growth", "High sucrose content", "Dry weather"],
        duration: "3-4 months harvesting season"
      },
      storage: {
        conditions: "Cannot be stored long",
        moisture: "Process within 24-48 hours",
        containers: "Transport to mill immediately",
        duration: "1-2 days maximum"
      },
      marketAnalysis: {
        peakPrices: "December-February",
        demand: "High for sugar mills",
        storageValue: "No storage value"
      },
      postHarvest: [
        "Transport immediately",
        "Avoid bruising",
        "Maintain freshness",
        "Process quickly"
      ]
    }
  ],
  generalTips: {
    timing: [
      "Monitor weather forecasts for dry harvesting conditions",
      "Check crop maturity indicators regularly",
      "Plan harvest during optimal moisture content",
      "Avoid harvesting during rain or high humidity"
    ],
    equipment: [
      "Ensure harvesters are properly maintained",
      "Calibrate equipment for optimal performance",
      "Have backup equipment ready",
      "Train operators on proper techniques"
    ],
    labor: [
      "Arrange labor well in advance",
      "Provide proper training and safety equipment",
      "Plan for peak labor requirements",
      "Consider mechanization for efficiency"
    ]
  }
};

// Weather Updates Data
const weatherData = {
  currentWeather: {
    temperature: "28°C",
    humidity: "65%",
    windSpeed: "12 km/h",
    precipitation: "0%",
    uvIndex: "High",
    visibility: "10 km"
  },
  forecast: [
    {
      day: "Today",
      date: "2024-01-15",
      high: "32°C",
      low: "22°C",
      condition: "Sunny",
      icon: "☀️",
      precipitation: "0%",
      windSpeed: "10 km/h"
    },
    {
      day: "Tomorrow",
      date: "2024-01-16",
      high: "30°C",
      low: "20°C",
      condition: "Partly Cloudy",
      icon: "⛅",
      precipitation: "20%",
      windSpeed: "15 km/h"
    },
    {
      day: "Wednesday",
      date: "2024-01-17",
      high: "28°C",
      low: "18°C",
      condition: "Light Rain",
      icon: "🌦️",
      precipitation: "60%",
      windSpeed: "20 km/h"
    },
    {
      day: "Thursday",
      date: "2024-01-18",
      high: "26°C",
      low: "16°C",
      condition: "Rainy",
      icon: "🌧️",
      precipitation: "80%",
      windSpeed: "25 km/h"
    },
    {
      day: "Friday",
      date: "2024-01-19",
      high: "29°C",
      low: "19°C",
      condition: "Cloudy",
      icon: "☁️",
      precipitation: "30%",
      windSpeed: "12 km/h"
    }
  ],
  farmingAlerts: [
    {
      type: "Harvest Alert",
      severity: "High",
      message: "Optimal harvesting conditions expected for wheat in the next 3 days",
      icon: "🌾",
      color: "#16a34a"
    },
    {
      type: "Irrigation Alert",
      severity: "Medium",
      message: "Low rainfall expected - consider irrigation for moisture-sensitive crops",
      icon: "💧",
      color: "#f59e0b"
    },
    {
      type: "Pest Alert",
      severity: "Low",
      message: "High humidity may increase pest activity - monitor crops closely",
      icon: "🦗",
      color: "#dc2626"
    }
  ],
  cropSpecificWeather: [
    {
      crop: "Wheat",
      icon: "🌾",
      optimalConditions: {
        temperature: "20-25°C",
        humidity: "60-70%",
        rainfall: "Moderate",
        windSpeed: "5-15 km/h"
      },
      currentStatus: "Optimal",
      recommendations: [
        "Continue with planned harvest activities",
        "Monitor for any sudden weather changes",
        "Ensure proper storage conditions"
      ]
    },
    {
      crop: "Rice",
      icon: "🍚",
      optimalConditions: {
        temperature: "25-35°C",
        humidity: "70-80%",
        rainfall: "High",
        windSpeed: "5-10 km/h"
      },
      currentStatus: "Good",
      recommendations: [
        "Maintain water levels in paddy fields",
        "Watch for heavy rainfall that may cause flooding",
        "Prepare for potential pest outbreaks"
      ]
    },
    {
      crop: "Corn/Maize",
      icon: "🌽",
      optimalConditions: {
        temperature: "25-30°C",
        humidity: "65-75%",
        rainfall: "Moderate",
        windSpeed: "10-20 km/h"
      },
      currentStatus: "Caution",
      recommendations: [
        "Monitor for drought conditions",
        "Consider additional irrigation if needed",
        "Watch for wind damage to tall plants"
      ]
    },
    {
      crop: "Soybeans",
      icon: "🫘",
      optimalConditions: {
        temperature: "20-30°C",
        humidity: "60-70%",
        rainfall: "Moderate",
        windSpeed: "5-15 km/h"
      },
      currentStatus: "Optimal",
      recommendations: [
        "Ideal conditions for growth and development",
        "Continue with regular maintenance",
        "Monitor soil moisture levels"
      ]
    }
  ],
  weatherTips: {
    general: [
      "Check weather forecasts daily before planning farm activities",
      "Adjust irrigation schedules based on rainfall predictions",
      "Protect crops from extreme weather events",
      "Monitor soil moisture levels regularly"
    ],
    seasonal: [
      "Summer: Focus on irrigation and heat stress management",
      "Monsoon: Prepare for heavy rainfall and flooding",
      "Winter: Protect crops from frost and cold damage",
      "Spring: Monitor for pest outbreaks and disease"
    ],
    emergency: [
      "Have emergency contact numbers ready",
      "Keep backup power sources for critical equipment",
      "Store essential supplies for extreme weather",
      "Develop evacuation plans for severe storms"
    ]
  }
};

const App: React.FC = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [crop, setCrop] = useState("");
  const [harvestingDate, setHarvestingDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCropSuggestions, setShowCropSuggestions] = useState(false);
  const [showCostAnalysis, setShowCostAnalysis] = useState(false);
  const [showEquipmentGuide, setShowEquipmentGuide] = useState(false);
  const [showIrrigationAdvice, setShowIrrigationAdvice] = useState(false);
  const [showYieldPrediction, setShowYieldPrediction] = useState(false);
  const [showGovernmentSchemes, setShowGovernmentSchemes] = useState(false);
  const [showHarvestPlanning, setShowHarvestPlanning] = useState(false);
  const [showWeatherUpdates, setShowWeatherUpdates] = useState(false);
  const [showFertilizerDetails, setShowFertilizerDetails] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Debug state changes
  useEffect(() => {
    console.log("showCropSuggestions:", showCropSuggestions);
  }, [showCropSuggestions]);

  useEffect(() => {
    console.log("showCostAnalysis:", showCostAnalysis);
  }, [showCostAnalysis]);

  // Cost Analysis Data
  const costAnalysisData = {
    costCategories: [
      {
        name: "Input Costs",
        icon: "🌱",
        items: [
          { name: "Seeds", costPerAcre: 1200, description: "High-quality certified seeds" },
          { name: "Fertilizers", costPerAcre: 3000, description: "NPK and organic fertilizers" },
          { name: "Pesticides", costPerAcre: 1500, description: "Crop protection chemicals" },
          { name: "Bio-fertilizers", costPerAcre: 800, description: "Organic soil enhancers" }
        ]
      },
      {
        name: "Labor Costs",
        icon: "👨‍🌾",
        items: [
          { name: "Land Preparation", costPerAcre: 2000, description: "Plowing, harrowing, leveling" },
          { name: "Sowing/Planting", costPerAcre: 1500, description: "Manual or mechanical planting" },
          { name: "Weeding", costPerAcre: 1200, description: "Manual and chemical weed control" },
          { name: "Harvesting", costPerAcre: 2500, description: "Manual or mechanical harvesting" },
          { name: "Post-harvest", costPerAcre: 1000, description: "Threshing, cleaning, storage" }
        ]
      },
      {
        name: "Equipment & Machinery",
        icon: "🚜",
        items: [
          { name: "Tractor Operations", costPerAcre: 2500, description: "Tractor hire and fuel" },
          { name: "Implements", costPerAcre: 1500, description: "Plows, harrows, seed drills" },
          { name: "Irrigation Equipment", costPerAcre: 2000, description: "Pumps, pipes, sprinklers" },
          { name: "Harvesting Equipment", costPerAcre: 3000, description: "Combine harvesters, threshers" }
        ]
      },
      {
        name: "Infrastructure",
        icon: "🏗️",
        items: [
          { name: "Irrigation System", costPerAcre: 5000, description: "Drip/sprinkler installation" },
          { name: "Storage Facilities", costPerAcre: 3000, description: "Warehouses, silos" },
          { name: "Fencing", costPerAcre: 2000, description: "Boundary protection" },
          { name: "Roads & Access", costPerAcre: 1500, description: "Internal farm roads" }
        ]
      },
      {
        name: "Operational Costs",
        icon: "⚡",
        items: [
          { name: "Electricity", costPerAcre: 800, description: "Pumping and processing" },
          { name: "Fuel", costPerAcre: 1200, description: "Diesel for machinery" },
          { name: "Transportation", costPerAcre: 1500, description: "Input delivery and output transport" },
          { name: "Insurance", costPerAcre: 500, description: "Crop and equipment insurance" }
        ]
      },
      {
        name: "Miscellaneous",
        icon: "📋",
        items: [
          { name: "Testing & Certification", costPerAcre: 300, description: "Soil testing, organic certification" },
          { name: "Marketing", costPerAcre: 500, description: "Packaging, branding, market access" },
          { name: "Administrative", costPerAcre: 400, description: "Record keeping, compliance" },
          { name: "Contingency", costPerAcre: 1000, description: "Unforeseen expenses (10% buffer)" }
        ]
      }
    ],
    optimizationTips: [
      {
        category: "Input Optimization",
        tips: [
          "Use certified seeds for better germination and yield",
          "Apply fertilizers based on soil test results",
          "Implement integrated pest management (IPM)",
          "Consider organic alternatives for premium markets"
        ]
      },
      {
        category: "Labor Efficiency",
        tips: [
          "Plan operations to minimize labor requirements",
          "Train workers for better productivity",
          "Use appropriate tools and equipment",
          "Consider mechanization for large-scale operations"
        ]
      },
      {
        category: "Equipment Management",
        tips: [
          "Maintain equipment regularly to avoid breakdowns",
          "Share equipment with neighboring farmers",
          "Consider custom hiring for specialized operations",
          "Invest in multi-purpose implements"
        ]
      },
      {
        category: "Infrastructure Planning",
        tips: [
          "Design irrigation systems for water efficiency",
          "Plan storage facilities based on crop volume",
          "Invest in infrastructure that adds long-term value",
          "Consider government subsidies for infrastructure"
        ]
      }
    ],
    revenueStreams: [
      {
        name: "Primary Crop Sales",
        description: "Main crop yield sold at market prices",
        potential: "High",
        reliability: "High"
      },
      {
        name: "Secondary Crops",
        description: "Intercropping and multiple cropping",
        potential: "Medium",
        reliability: "Medium"
      },
      {
        name: "Organic Premium",
        description: "Higher prices for organic produce",
        potential: "High",
        reliability: "Medium"
      },
      {
        name: "Value Addition",
        description: "Processing and packaging for higher margins",
        potential: "Very High",
        reliability: "Low"
      },
      {
        name: "Contract Farming",
        description: "Guaranteed prices through contracts",
        potential: "Medium",
        reliability: "High"
      }
    ]
  };

  // Comprehensive Crop Suggestions Data
  const cropSuggestions = [
    {
      name: "Rice",
      icon: "🌾",
      season: "Kharif (June-October)",
      duration: "120-150 days",
      water: "High",
      soil: "Clay loam",
      states: ["WB", "UP", "PB", "TN", "AP", "TG", "BR", "OR"],
      description: "Staple food crop, suitable for monsoon season",
      marketPotential: "High",
      investment: "Medium",
      costBreakdown: {
        seeds: 1200,
        fertilizers: 3000,
        pesticides: 1500,
        irrigation: 2000,
        labor: 8000,
        machinery: 3000,
        transportation: 1500,
        miscellaneous: 1000
      },
      yieldPerAcre: 25, // quintals
      marketPrice: 1800, // per quintal
      totalCost: 0, // will be calculated
      totalRevenue: 0, // will be calculated
      profit: 0 // will be calculated
    },
    {
      name: "Wheat",
      icon: "🌾",
      season: "Rabi (November-March)",
      duration: "110-130 days",
      water: "Medium",
      soil: "Loamy",
      states: ["UP", "PB", "HR", "MP", "RJ", "MH", "BR"],
      description: "Winter crop, major food grain",
      marketPotential: "High",
      investment: "Medium",
      costBreakdown: {
        seeds: 1000,
        fertilizers: 2500,
        pesticides: 1200,
        irrigation: 1500,
        labor: 6000,
        machinery: 2500,
        transportation: 1200,
        miscellaneous: 800
      },
      yieldPerAcre: 20, // quintals
      marketPrice: 2000, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Maize",
      icon: "🌽",
      season: "Kharif & Rabi",
      duration: "90-120 days",
      water: "Medium",
      soil: "Well-drained loam",
      states: ["MP", "KA", "AP", "TG", "BR", "JH", "MH"],
      description: "Versatile crop for food and fodder",
      marketPotential: "Medium",
      investment: "Low",
      costBreakdown: {
        seeds: 800,
        fertilizers: 2000,
        pesticides: 1000,
        irrigation: 1200,
        labor: 5000,
        machinery: 2000,
        transportation: 1000,
        miscellaneous: 600
      },
      yieldPerAcre: 18, // quintals
      marketPrice: 1500, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Sugarcane",
      icon: "🎋",
      season: "Year-round",
      duration: "12-18 months",
      water: "Very High",
      soil: "Deep loam",
      states: ["UP", "MH", "KA", "TN", "AP", "TG", "GJ"],
      description: "Cash crop, requires long growing period",
      marketPotential: "High",
      investment: "High",
      costBreakdown: {
        seeds: 3000,
        fertilizers: 5000,
        pesticides: 2000,
        irrigation: 8000,
        labor: 15000,
        machinery: 5000,
        transportation: 3000,
        miscellaneous: 2000
      },
      yieldPerAcre: 400, // quintals
      marketPrice: 300, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Cotton",
      icon: "🧶",
      season: "Kharif",
      duration: "150-180 days",
      water: "Medium",
      soil: "Black soil",
      states: ["MH", "GJ", "MP", "AP", "TG", "RJ", "KA"],
      description: "Fiber crop, drought resistant",
      marketPotential: "Medium",
      investment: "Medium",
      costBreakdown: {
        seeds: 1500,
        fertilizers: 3000,
        pesticides: 2500,
        irrigation: 2000,
        labor: 10000,
        machinery: 3000,
        transportation: 2000,
        miscellaneous: 1500
      },
      yieldPerAcre: 8, // quintals
      marketPrice: 6000, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Pulses",
      icon: "🫘",
      season: "Rabi & Kharif",
      duration: "60-120 days",
      water: "Low",
      soil: "Sandy loam",
      states: ["MP", "MH", "UP", "RJ", "KA", "AP", "TG"],
      description: "Protein-rich, nitrogen fixing",
      marketPotential: "Medium",
      investment: "Low",
      costBreakdown: {
        seeds: 600,
        fertilizers: 1500,
        pesticides: 800,
        irrigation: 800,
        labor: 4000,
        machinery: 1500,
        transportation: 800,
        miscellaneous: 500
      },
      yieldPerAcre: 6, // quintals
      marketPrice: 4000, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Oilseeds",
      icon: "🫒",
      season: "Rabi & Kharif",
      duration: "90-150 days",
      water: "Low-Medium",
      soil: "Sandy loam",
      states: ["MP", "RJ", "MH", "UP", "AP", "TG", "KA"],
      description: "Edible oils and industrial use",
      marketPotential: "Medium",
      investment: "Low",
      costBreakdown: {
        seeds: 800,
        fertilizers: 1800,
        pesticides: 1000,
        irrigation: 1000,
        labor: 5000,
        machinery: 1800,
        transportation: 1000,
        miscellaneous: 600
      },
      yieldPerAcre: 8, // quintals
      marketPrice: 3500, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Vegetables",
      icon: "🥬",
      season: "Year-round",
      duration: "30-120 days",
      water: "High",
      soil: "Rich loam",
      states: ["All States"],
      description: "Short duration, high value crops",
      marketPotential: "High",
      investment: "Medium",
      costBreakdown: {
        seeds: 500,
        fertilizers: 2000,
        pesticides: 1200,
        irrigation: 1500,
        labor: 8000,
        machinery: 1000,
        transportation: 1000,
        miscellaneous: 800
      },
      yieldPerAcre: 15, // tons
      marketPrice: 2000, // per ton
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Fruits",
      icon: "🍎",
      season: "Year-round",
      duration: "3-8 years",
      water: "Medium",
      soil: "Well-drained",
      states: ["All States"],
      description: "Perennial crops, long-term investment",
      marketPotential: "High",
      investment: "High",
      costBreakdown: {
        seeds: 2000,
        fertilizers: 3000,
        pesticides: 2000,
        irrigation: 3000,
        labor: 12000,
        machinery: 2000,
        transportation: 1500,
        miscellaneous: 1500
      },
      yieldPerAcre: 10, // tons
      marketPrice: 5000, // per ton
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    }
  ];

  // Calculate costs and profits for each crop
  const calculateCropEconomics = (crop: any) => {
    const totalCost = Object.values(crop.costBreakdown).reduce((sum: number, cost: any) => sum + (cost as number), 0);
    const totalRevenue = crop.yieldPerAcre * crop.marketPrice;
    const profit = totalRevenue - totalCost;
    
    return {
      ...crop,
      totalCost,
      totalRevenue,
      profit
    };
  };

  const cropsWithEconomics = cropSuggestions.map(calculateCropEconomics);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simulate AI analysis with mock data
      const cropKey = crop.trim().toLowerCase();
      const priceInfo = MOCK_PRICES[cropKey] || {
        min: 1000,
        max: 2000,
        period: "Varies by crop"
      };
      setResult({
        markets: MOCK_MARKETS,
        price: priceInfo,
        harvestingDate // include in result if needed
      });
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setState("");
    setDistrict("");
    setCrop("");
    setHarvestingDate("");
    setResult(null);
  };

  const features = [
    { name: t("Crop Suggestions"), icon: "🌾", description: t("Get AI-powered crop recommendations based on soil, climate, and market conditions") },
    { name: t("Yield Prediction"), icon: "📊", description: t("Predict crop yields using advanced AI algorithms and historical data") },
    { name: t("Irrigation Advice"), icon: "💧", description: t("Smart irrigation recommendations for optimal water usage and crop health") },
    { name: t("Equipment Guide"), icon: "🚜", description: t("Comprehensive guide to farming equipment, prices, and maintenance") },
    { name: t("Cost Analysis"), icon: "💰", description: t("Detailed cost breakdown and financial analysis for different crops") },
    { name: t("Fertilizer Details"), icon: "🌿", description: t("Comprehensive information on fertilizers, usage, and best practices") },
    { name: t("Government Schemes"), icon: "🏛️", description: t("Information about government subsidies and support programs") },
    { name: t("Harvest Planning"), icon: "🌾", description: t("Optimal harvest timing, storage, and post-harvest management strategies") },
    { name: t("Weather Updates"), icon: "🌤️", description: t("Real-time weather data, forecasts, and farming-specific weather alerts") }
  ];

  return (
    <div>
      <div style={{ background: 'yellow', color: 'black', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
        TEST: If you see this message, the React app is rendering!
      </div>
      <header>
        <h1>Welcome to AI Farmer Software</h1>
        <p>Your smart assistant for modern agriculture.</p>
      </header>
      {/* ...rest of your app UI... */}
    </div>
  );
};

export default App;
