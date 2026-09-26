export type OrganisationType =
  | "government"
  | "aiaic"
  | "municipality"
  | "enterprise"
  | "other";

export interface RegistrySource {
  name: string;
  url: string;
  accessedOn: string;
}

export interface DepartmentMetadata {
  status: "listed_in_source" | "unverified";
  source: RegistrySource;
  sources: RegistrySource[];
  version: string;
  effectiveDate: string | null;
}

export interface AssociatedOrganisation {
  name: string;
  url: string;
  organisationType: "board" | "corporation" | "undertaking" | "company" | "society";
}

export interface Service {
  serviceId: string;
  serviceName: string;
  metadata?: DepartmentMetadata;
}

export interface Section {
  sectionId: string;
  sectionName: string;
  services: Service[];
  metadata?: DepartmentMetadata;
}

export interface Division {
  divisionId: string;
  divisionName: string;
  sections: Section[];
  services: Service[];
  metadata?: DepartmentMetadata;
}

export interface SubDepartment {
  subDepartmentId: string;
  subDepartmentName: string;
  divisions: Division[];
  sections: Section[];
  services: Service[];
  metadata?: DepartmentMetadata;
}

export interface Department {
  departmentId: string;
  departmentName: string;
  departmentCode: string | null;
  parentDepartment: string | null;
  associatedOrganisations: AssociatedOrganisation[];
  subDepartments: SubDepartment[];
  divisions: Division[];
  sections: Section[];
  services: Service[];
  metadata: DepartmentMetadata;
}

export interface DepartmentRegistry {
  registryId: string;
  organisationId: string;
  organisationName: string;
  organisationType: OrganisationType;
  version: string;
  effectiveDate: string | null;
  supportingSources: RegistrySource[];
  departments: Department[];
}

export interface DepartmentPathSelection {
  subDepartmentId: string;
  divisionId: string;
  sectionId: string;
  serviceId: string;
}

export const validateDepartmentPath = (
  department: Department | undefined,
  selection: DepartmentPathSelection,
): string | null => {
  if (!department) return "Select a department.";

  const subDepartment = department.subDepartments.find(
    (item) => item.subDepartmentId === selection.subDepartmentId,
  );
  if (department.subDepartments.length && selection.subDepartmentId && !subDepartment) {
    return "The selected sub-department does not belong to this department.";
  }

  const divisions = department.subDepartments.length
    ? subDepartment?.divisions ?? []
    : department.divisions;
  const division = divisions.find((item) => item.divisionId === selection.divisionId);
  if (divisions.length && selection.divisionId && !division) {
    return "The selected division does not belong to this department path.";
  }

  const sections = division?.sections ?? subDepartment?.sections ?? (
    department.subDepartments.length ? [] : department.sections
  );
  const section = sections.find((item) => item.sectionId === selection.sectionId);
  if (sections.length && selection.sectionId && !section) {
    return "The selected section does not belong to this department path.";
  }

  const services = section?.services ?? division?.services ?? subDepartment?.services ?? (
    department.subDepartments.length ? [] : department.services
  );
  const service = services.find((item) => item.serviceId === selection.serviceId);
  if (services.length && selection.serviceId && !service) {
    return "The selected service does not belong to this department path.";
  }

  return null;
};

const source: RegistrySource = {
  name: "Government of Maharashtra: Government Departments (English)",
  url: "https://maharashtra.gov.in/Site/1527/Government-Departments",
  accessedOn: "2026-09-26",
};

const supportingSources: RegistrySource[] = [
  {
    name: "NIC Maharashtra State Centre",
    url: "https://maharashtra.nic.in/",
    accessedOn: "2026-09-26",
  },
  {
    name: "Maharashtra RTI Online: Public Authorities Accessible Online",
    url: "https://rtionline.maharashtra.gov.in/organizationChart.php",
    accessedOn: "2026-09-26",
  },
  {
    name: "Food, Civil Supplies & Consumer Protection Department Administrative Setup",
    url: "https://mahafood.gov.in/en/about-department/administrative-setup/",
    accessedOn: "2026-09-26",
  },
  {
    name: "Revenue and Land Records Portal Maharashtra",
    url: "https://mahabhumi.gov.in",
    accessedOn: "2026-09-26",
  },
  {
    name: "Maharashtra Police Portal",
    url: "https://mahapolice.gov.in",
    accessedOn: "2026-09-26",
  },
];

const version = "MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V4";

interface RawSubDeptDef {
  subDepartmentId: string;
  subDepartmentName: string;
  divisions: Array<{
    divisionId: string;
    divisionName: string;
    services: Array<{ serviceId: string; serviceName: string }>;
  }>;
}

interface RawDepartmentDef {
  departmentId: string;
  departmentName: string;
  associatedOrganisations?: AssociatedOrganisation[];
  subDepartments: RawSubDeptDef[];
}

const rawDepartments: RawDepartmentDef[] = [
  // 1. Food, Civil Supply and Consumer Protection Department
  {
    departmentId: "food-civil-supplies-consumer-protection",
    departmentName: "Food, Civil Supply and Consumer Protection Department",
    subDepartments: [
      {
        subDepartmentId: "fcs-sub-controller-rationing",
        subDepartmentName: "Controller of Rationing and Directorate of Civil Supplies, Mumbai",
        divisions: [
          {
            divisionId: "fcs-div-cr-mumbai-city",
            divisionName: "Mumbai City Rationing Division",
            services: [
              { serviceId: "fcs-svc-new-rc", serviceName: "New Ration Card Issuance" },
              { serviceId: "fcs-svc-member-add", serviceName: "Member Addition in Ration Card" },
              { serviceId: "fcs-svc-rc-address", serviceName: "Ration Card Address Modification" },
            ],
          },
          {
            divisionId: "fcs-div-cr-mumbai-suburban",
            divisionName: "Mumbai Suburban & Thane Region Division",
            services: [
              { serviceId: "fcs-svc-fps-license", serviceName: "Fair Price Shop (FPS) License Grant and Renewal" },
              { serviceId: "fcs-svc-rc-surrender", serviceName: "Surrender / Cancellation of Ration Card" },
              { serviceId: "fcs-svc-duplicate-rc", serviceName: "Duplicate Ration Card Issuance" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "fcs-sub-supply-commissionerate",
        subDepartmentName: "Office of the Supply Commissioner, Maharashtra State",
        divisions: [
          {
            divisionId: "fcs-div-pds-allocation",
            divisionName: "Public Distribution System (PDS) & Allocation Division",
            services: [
              { serviceId: "fcs-svc-pds-allocation", serviceName: "Monthly Foodgrain Allocation under NFSA" },
              { serviceId: "fcs-svc-paddy-procure", serviceName: "Paddy and Coarse Grain Procurement under MSP" },
              { serviceId: "fcs-svc-aay-mgmt", serviceName: "Antyodaya Anna Yojana (AAY) Beneficiary Management" },
            ],
          },
          {
            divisionId: "fcs-div-district-supply",
            divisionName: "District Supply Offices (Rest of Maharashtra)",
            services: [
              { serviceId: "fcs-svc-district-pds", serviceName: "District Food Distribution Oversight" },
              { serviceId: "fcs-svc-kerosene-quota", serviceName: "Kerosene and Essential Commodity Quota Allotment" },
              { serviceId: "fcs-svc-pds-grievance", serviceName: "Grievance Redressal for PDS Beneficiaries" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "fcs-sub-legal-metrology",
        subDepartmentName: "Legal Metrology Organisation (Weights and Measures)",
        divisions: [
          {
            divisionId: "fcs-div-lm-standards",
            divisionName: "Standards Verification and Inspection Wing",
            services: [
              { serviceId: "fcs-svc-lm-stamping", serviceName: "Verification and Stamping of Weighing & Measuring Instruments" },
              { serviceId: "fcs-svc-lm-weighbridge", serviceName: "Re-verification of Electronic Weighbridges" },
              { serviceId: "fcs-svc-lm-packaged", serviceName: "Packaged Commodities Rule Compliance Inspection" },
            ],
          },
          {
            divisionId: "fcs-div-lm-licensing",
            divisionName: "Licensing and Manufacturer Registration Wing",
            services: [
              { serviceId: "fcs-svc-lm-license", serviceName: "Manufacturer / Dealer / Repairer Weights & Measures License" },
              { serviceId: "fcs-svc-lm-packer-reg", serviceName: "Packer / Manufacturer Registration for Packaged Commodities" },
              { serviceId: "fcs-svc-lm-flowmeter", serviceName: "Calibration Certificate for Flow Meters & Tank Lorries" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "fcs-sub-consumer-redressal",
        subDepartmentName: "State Consumer Disputes Redressal Commission",
        divisions: [
          {
            divisionId: "fcs-div-scdrc-mumbai",
            divisionName: "Principal Bench, Mumbai",
            services: [
              { serviceId: "fcs-svc-scdrc-complaint", serviceName: "Consumer Complaint Filing (Claims Above Threshold)" },
              { serviceId: "fcs-svc-scdrc-appeals", serviceName: "First Appeals against District Commission Orders" },
              { serviceId: "fcs-svc-scdrc-revision", serviceName: "Revision Petitions and Execution Applications" },
            ],
          },
          {
            divisionId: "fcs-div-dcdrc-district",
            divisionName: "District Consumer Disputes Redressal Commissions",
            services: [
              { serviceId: "fcs-svc-dcdrc-grievance", serviceName: "District Consumer Grievance Adjudication" },
              { serviceId: "fcs-svc-dcdrc-mediation", serviceName: "Consumer Protection Mediation Services" },
            ],
          },
        ],
      },
    ],
  },

  // 2. Revenue Department
  {
    departmentId: "revenue",
    departmentName: "Revenue Department",
    subDepartments: [
      {
        subDepartmentId: "rev-sub-land-revenue",
        subDepartmentName: "Land Revenue Administration & Collectorates",
        divisions: [
          {
            divisionId: "rev-div-konkan",
            divisionName: "Konkan Revenue Division (Mumbai, Thane, Palghar, Raigad, Ratnagiri, Sindhudurg)",
            services: [
              { serviceId: "rev-svc-7-12", serviceName: "Issuance of 7/12 (Saat-Baara) Extract" },
              { serviceId: "rev-svc-ferfar", serviceName: "Mutation Entry (Ferfar) Certification" },
              { serviceId: "rev-svc-na-permission", serviceName: "Non-Agricultural (NA) Land Permission" },
              { serviceId: "rev-svc-domicile-caste", serviceName: "Domicile, Income and Caste Certificate Issuance" },
            ],
          },
          {
            divisionId: "rev-div-pune",
            divisionName: "Pune Revenue Division (Pune, Satara, Sangli, Solapur, Kolhapur)",
            services: [
              { serviceId: "rev-svc-pune-e-hakka", serviceName: "Record of Rights (e-Hakka) Updating" },
              { serviceId: "rev-svc-pune-recovery", serviceName: "Land Revenue Recovery & Agricultural Relief" },
              { serviceId: "rev-svc-pune-solvency", serviceName: "Solvency and Character Certificate Issuance" },
            ],
          },
          {
            divisionId: "rev-div-nashik",
            divisionName: "Nashik Revenue Division (Nashik, Ahmednagar, Dhule, Jalgaon, Nandurbar)",
            services: [
              { serviceId: "rev-svc-nashik-frag", serviceName: "Agricultural Land Fragmentation Prevention Clearances" },
              { serviceId: "rev-svc-nashik-relief", serviceName: "Natural Disaster Compensation Assessment" },
            ],
          },
          {
            divisionId: "rev-div-sambhajinagar",
            divisionName: "Chhatrapati Sambhajinagar Revenue Division (Marathwada)",
            services: [
              { serviceId: "rev-svc-csn-inam", serviceName: "Land Inam and Ceiling Exemption Verification" },
              { serviceId: "rev-svc-csn-drought", serviceName: "Drought and Crop Damage Relief Disbursement" },
            ],
          },
          {
            divisionId: "rev-div-nagpur",
            divisionName: "Nagpur Revenue Division (Vidarbha)",
            services: [
              { serviceId: "rev-svc-nagpur-malik", serviceName: "Malik Makbuza Land Clearances" },
              { serviceId: "rev-svc-nagpur-mining", serviceName: "Mining Lease Land Revenue NOC" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "rev-sub-land-records",
        subDepartmentName: "Settlement Commissioner and Directorate of Land Records, Pune",
        divisions: [
          {
            divisionId: "rev-div-lr-cadastral",
            divisionName: "Cadastral Survey & Measurement Wing",
            services: [
              { serviceId: "rev-svc-lr-mojani", serviceName: "Land Demarcation & Measurement (e-Mojani)" },
              { serviceId: "rev-svc-lr-property-card", serviceName: "Property Card (Malmatta Patrak) Issuance" },
              { serviceId: "rev-svc-lr-boundary-dispute", serviceName: "City Survey Boundary Dispute Inquiries" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "rev-sub-registration-stamps",
        subDepartmentName: "Inspector General of Registration and Controller of Stamps (IGR Maharashtra)",
        divisions: [
          {
            divisionId: "rev-div-reg-mumbai",
            divisionName: "Mumbai & Konkan Registration Zone",
            services: [
              { serviceId: "rev-svc-reg-conveyance", serviceName: "Registration of Conveyance Deed, Sale Deed and Gift Deed" },
              { serviceId: "rev-svc-reg-leave-license", serviceName: "E-Registration of Leave and License Agreements" },
              { serviceId: "rev-svc-reg-stamp-adjudication", serviceName: "Adjudication of Stamp Duty" },
            ],
          },
          {
            divisionId: "rev-div-reg-pune",
            divisionName: "Pune & Rest of Maharashtra Registration Zone",
            services: [
              { serviceId: "rev-svc-reg-mortgage", serviceName: "Registration of Mortgage and Loan Agreements" },
              { serviceId: "rev-svc-reg-certified-copy", serviceName: "Search Report and Certified Copy Issuance" },
              { serviceId: "rev-svc-reg-ready-reckoner", serviceName: "Annual Ready Reckoner Valuation Verification" },
            ],
          },
        ],
      },
    ],
  },

  // 3. Home Department
  {
    departmentId: "home",
    departmentName: "Home Department",
    subDepartments: [
      {
        subDepartmentId: "home-sub-police-headquarters",
        subDepartmentName: "Maharashtra State Police (Director General of Police, Mumbai)",
        divisions: [
          {
            divisionId: "home-div-mumbai-police",
            divisionName: "Mumbai Police Commissionerate",
            services: [
              { serviceId: "home-svc-pcc", serviceName: "Police Clearance Certificate (PCC) for Overseas Employment" },
              { serviceId: "home-svc-tenant-verify", serviceName: "Tenant & Domestic Help Police Verification" },
              { serviceId: "home-svc-public-noc", serviceName: "NOC for Public Performance, Loudspeaker and Rallies" },
              { serviceId: "home-svc-arms-license", serviceName: "Arms License Application and Renewal" },
            ],
          },
          {
            divisionId: "home-div-district-police",
            divisionName: "Divisional Ranges & District Police Establishments",
            services: [
              { serviceId: "home-svc-fir-copy", serviceName: "First Information Report (FIR) Registration and Copy Issuance" },
              { serviceId: "home-svc-missing-tracking", serviceName: "Missing Person & Property Thefts Tracking" },
              { serviceId: "home-svc-highway-assistance", serviceName: "Highway Police Emergency Assistance" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "home-sub-prisons",
        subDepartmentName: "Maharashtra Prisons and Correctional Services",
        divisions: [
          {
            divisionId: "home-div-central-prisons",
            divisionName: "Central Prisons Division (Yerwada, Arthur Road, Nagpur, Nashik)",
            services: [
              { serviceId: "home-svc-e-mulakat", serviceName: "E-Mulakat (Online Prisoner Meeting Request)" },
              { serviceId: "home-svc-parole-furlough", serviceName: "Parole and Furlough Application Processing" },
              { serviceId: "home-svc-rehab", serviceName: "Prisoner Welfare and Vocational Rehabilitation" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "home-sub-prosecution",
        subDepartmentName: "Directorate of Prosecution, Maharashtra",
        divisions: [
          {
            divisionId: "home-div-sessions-prosecution",
            divisionName: "High Court & Sessions Prosecution Division",
            services: [
              { serviceId: "home-svc-prosecution", serviceName: "Public Criminal Prosecution in Sessions Court" },
              { serviceId: "home-svc-chargesheet", serviceName: "Legal Vetting of Police Charge Sheets" },
            ],
          },
        ],
      },
    ],
  },

  // 4. Public Health Department
  {
    departmentId: "public-health",
    departmentName: "Public Health Department",
    subDepartments: [
      {
        subDepartmentId: "ph-sub-directorate-health",
        subDepartmentName: "Directorate of Health Services (DHS), Maharashtra",
        divisions: [
          {
            divisionId: "ph-div-hospital-services",
            divisionName: "Hospital Administration & Civil Surgeon Wing",
            services: [
              { serviceId: "ph-svc-birth-death", serviceName: "Birth and Death Certificate Issuance" },
              { serviceId: "ph-svc-disability-cert", serviceName: "Disability Medical Board Assessment Certificate" },
              { serviceId: "ph-svc-nursing-home-reg", serviceName: "Clinical Establishment and Nursing Home Registration" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "ph-sub-fda",
        subDepartmentName: "Food and Drugs Administration (FDA), Maharashtra",
        divisions: [
          {
            divisionId: "ph-div-fda-food",
            divisionName: "Food Safety and Standards Enforcement Division",
            services: [
              { serviceId: "ph-svc-fbo-license", serviceName: "Food Business Operator (FBO) License & Registration (FSSAI)" },
              { serviceId: "ph-svc-food-sample", serviceName: "Food Sample Testing & Adulteration Inspection" },
            ],
          },
          {
            divisionId: "ph-div-fda-drugs",
            divisionName: "Drugs and Cosmetics Regulatory Division",
            services: [
              { serviceId: "ph-svc-drug-license", serviceName: "Retail and Wholesale Drug Store Licensing" },
              { serviceId: "ph-svc-pharma-mfg", serviceName: "Pharmaceutical Manufacturing License and GMP Clearance" },
            ],
          },
        ],
      },
    ],
  },

  // 5. Agriculture Department
  {
    departmentId: "agriculture",
    departmentName: "Agriculture Department",
    associatedOrganisations: [
      { name: "Maharashtra State Agricultural Marketing Board (MSAMB)", url: "http://msamb.com/", organisationType: "board" },
      { name: "Maharashtra State Seeds Corporation (Mahabeej)", url: "http://www.mahabeej.com/", organisationType: "corporation" },
      { name: "Maharashtra Agro Industries Development Corporation (MAIDC)", url: "http://www.maidcmumbai.com/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "agri-sub-commissionerate",
        subDepartmentName: "Commissionerate of Agriculture, Maharashtra State, Pune",
        divisions: [
          {
            divisionId: "agri-div-extension-inputs",
            divisionName: "Agricultural Extension, Inputs & Quality Control Division",
            services: [
              { serviceId: "agri-svc-fertilizer-license", serviceName: "Fertilizer, Seed and Pesticide Retail / Wholesale License" },
              { serviceId: "agri-svc-farmer-reg", serviceName: "Farmer Enrollment on MahaDBT Portal" },
              { serviceId: "agri-svc-soil-health", serviceName: "Soil Health Card Testing and Recommendation" },
            ],
          },
          {
            divisionId: "agri-div-horticulture",
            divisionName: "Horticulture, Micro-Irrigation & Farm Mechanization Division",
            services: [
              { serviceId: "agri-svc-micro-irrigation", serviceName: "Drip and Sprinkler Irrigation Subsidy (PMKSY)" },
              { serviceId: "agri-svc-farm-mechanization", serviceName: "Tractor and Farm Equipment Mechanization Grants" },
            ],
          },
        ],
      },
    ],
  },

  // 6. Rural Development and Panchayat Raj Department
  {
    departmentId: "rural-development-panchayat-raj",
    departmentName: "Rural Development and Panchayat Raj Department",
    subDepartments: [
      {
        subDepartmentId: "rdd-sub-panchayat-raj",
        subDepartmentName: "Commissionerate of Panchayati Raj & Zilla Parishad Administration",
        divisions: [
          {
            divisionId: "rdd-div-zp-admin",
            divisionName: "Zilla Parishad & District Rural Development Agency (DRDA)",
            services: [
              { serviceId: "rdd-svc-pmay-g", serviceName: "Pradhan Mantri Awaas Yojana - Gramin Housing Sanction" },
              { serviceId: "rdd-svc-water-sanitation", serviceName: "Zilla Parishad Rural Water Supply & Sanitation Clearance" },
              { serviceId: "rdd-svc-namuna-8", serviceName: "Gram Panchayat Property Assessment (Namuna 8 Extract)" },
            ],
          },
          {
            divisionId: "rdd-div-msrlm-livelihoods",
            divisionName: "Maharashtra State Rural Livelihoods Mission (MSRLM - UMED)",
            services: [
              { serviceId: "rdd-svc-shg-credit", serviceName: "Women Self-Help Group (SHG) Revolving Fund & Community Investment" },
              { serviceId: "rdd-svc-ddugky", serviceName: "DDU-GKY Skill Development Training for Rural Youth" },
            ],
          },
        ],
      },
    ],
  },

  // 7. School Education and Sports Department
  {
    departmentId: "school-education-sports",
    departmentName: "School Education and Sports Department",
    subDepartments: [
      {
        subDepartmentId: "edu-sub-primary",
        subDepartmentName: "Directorate of Primary Education, Pune",
        divisions: [
          {
            divisionId: "edu-div-primary-district",
            divisionName: "District Primary Education Offices",
            services: [
              { serviceId: "edu-svc-rte-admission", serviceName: "Right to Education (RTE) 25% Free Quota Online Admissions" },
              { serviceId: "edu-svc-school-recognition", serviceName: "Primary School Recognition and Annual Renewal" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "edu-sub-secondary",
        subDepartmentName: "Directorate of Secondary and Higher Secondary Education, Pune",
        divisions: [
          {
            divisionId: "edu-div-sec-district",
            divisionName: "District Secondary Education Offices",
            services: [
              { serviceId: "edu-svc-affiliation-noc", serviceName: "NOC for Affiliation of Secondary Schools and Junior Colleges" },
              { serviceId: "edu-svc-fyjc-admission", serviceName: "Centralized Online Admission Process for 11th Std (FYJC)" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "edu-sub-sports",
        subDepartmentName: "Directorate of Sports and Youth Services, Pune",
        divisions: [
          {
            divisionId: "edu-div-sports-district",
            divisionName: "District Sports Offices (DSO)",
            services: [
              { serviceId: "edu-svc-sports-verification", serviceName: "Sports Person Certificate Verification for 5% Govt Reservation" },
              { serviceId: "edu-svc-shiv-chhatrapati", serviceName: "Shiv Chhatrapati State Sports Award Sanction" },
            ],
          },
        ],
      },
    ],
  },

  // 8. Higher and Technical Education Department
  {
    departmentId: "higher-technical-education",
    departmentName: "Higher and Technical Education Department",
    subDepartments: [
      {
        subDepartmentId: "dte-sub-technical",
        subDepartmentName: "Directorate of Technical Education (DTE), Maharashtra State",
        divisions: [
          {
            divisionId: "dte-div-cap-approval",
            divisionName: "Centralized Admission Process (CAP) & Institute Approval Division",
            services: [
              { serviceId: "dte-svc-cap-online", serviceName: "CAP Online Admissions for Engineering, MBA, MCA, Pharmacy, Polytechnic" },
              { serviceId: "dte-svc-ebc-scholarship", serviceName: "Rajarshi Chhatrapati Shahu Maharaj EBC Scholarship Verification" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "dhe-sub-higher",
        subDepartmentName: "Directorate of Higher Education (DHE), Pune",
        divisions: [
          {
            divisionId: "dhe-div-colleges",
            divisionName: "University and Senior College Administration Division",
            services: [
              { serviceId: "dhe-svc-college-affiliation", serviceName: "Senior College Affiliation and Program Sanction" },
              { serviceId: "dhe-svc-post-matric", serviceName: "Post-Matric Scholarship Approvals on MahaDBT" },
            ],
          },
        ],
      },
    ],
  },

  // 9. Urban Development Department
  {
    departmentId: "urban-development",
    departmentName: "Urban Development Department",
    associatedOrganisations: [
      { name: "City and Industrial Development Corporation (CIDCO)", url: "https://cidco.maharashtra.gov.in/", organisationType: "corporation" },
      { name: "Maharashtra Industrial Development Corporation (MIDC)", url: "https://www.midcindia.org/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "ud-sub-municipal-admin",
        subDepartmentName: "Directorate of Municipal Administration (DMA), Mumbai",
        divisions: [
          {
            divisionId: "ud-div-corps-councils",
            divisionName: "Municipal Corporations & Municipal Councils Wing",
            services: [
              { serviceId: "ud-svc-bpams", serviceName: "Building Permission / Approval via BPAMS Portal" },
              { serviceId: "ud-svc-property-tax", serviceName: "Property Tax Assessment and Assessment Extract Issuance" },
              { serviceId: "ud-svc-trade-license", serviceName: "Trade License and Shop & Establishment Registration" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "ud-sub-town-planning",
        subDepartmentName: "Directorate of Town Planning and Valuation, Pune",
        divisions: [
          {
            divisionId: "ud-div-tp-valuation",
            divisionName: "Development Plan & Regional Valuation Wing",
            services: [
              { serviceId: "ud-svc-dp-zoning", serviceName: "Development Plan (DP) Zoning & Reservation Scrutiny" },
              { serviceId: "ud-svc-tdr-sanction", serviceName: "Transferable Development Rights (TDR) Sanction" },
            ],
          },
        ],
      },
    ],
  },

  // 10. Finance Department
  {
    departmentId: "finance",
    departmentName: "Finance Department",
    subDepartments: [
      {
        subDepartmentId: "fin-sub-accounts-treasuries",
        subDepartmentName: "Directorate of Accounts and Treasuries (DAT), Mumbai",
        divisions: [
          {
            divisionId: "fin-div-treasury-offices",
            divisionName: "District Treasury & Pay and Accounts Offices",
            services: [
              { serviceId: "fin-svc-salary-clearance", serviceName: "Government Employee & Teacher Salary Bills Clearance (BEAMS)" },
              { serviceId: "fin-svc-pension-sevaarth", serviceName: "Pension Sanction & Monthly Disbursal (Sevaarth)" },
              { serviceId: "fin-svc-gras-challan", serviceName: "Government Cyber Treasury Online Challan Receipts (GRAS)" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "fin-sub-state-gst",
        subDepartmentName: "Department of Goods and Services Tax (State GST), Maharashtra",
        divisions: [
          {
            divisionId: "fin-div-gst-enforcement",
            divisionName: "State GST Enforcement & Assessment Wing",
            services: [
              { serviceId: "fin-svc-gst-reg", serviceName: "State GST Registration Verification" },
              { serviceId: "fin-svc-pt-clearance", serviceName: "Profession Tax (PT) Registration and Clearance Certificate" },
            ],
          },
        ],
      },
    ],
  },

  // 11. General Administration Department
  {
    departmentId: "general-administration",
    departmentName: "General Administration Department",
    subDepartments: [
      {
        subDepartmentId: "gad-sub-mantralaya",
        subDepartmentName: "GAD Mantralaya Establishment & Administrative Reforms",
        divisions: [
          {
            divisionId: "gad-div-personnel-protocol",
            divisionName: "Personnel, State Civil Services & Protocol Wing",
            services: [
              { serviceId: "gad-svc-visitor-pass", serviceName: "Mantralaya Visitor Pass Issuance" },
              { serviceId: "gad-svc-protocol-clearance", serviceName: "State Protocol Clearances for Dignitaries" },
              { serviceId: "gad-svc-rti-appeals", serviceName: "Right to Information (RTI) State Portal Appeals" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "gad-sub-dgipr",
        subDepartmentName: "Directorate General of Information and Public Relations (DGIPR)",
        divisions: [
          {
            divisionId: "gad-div-media-publicity",
            divisionName: "Media Liaison & Regional Publicity Wing",
            services: [
              { serviceId: "gad-svc-press-card", serviceName: "Press Media Accreditation Card Issuance" },
              { serviceId: "gad-svc-govt-adverts", serviceName: "Government Advertisements & Press Release Distribution" },
            ],
          },
        ],
      },
    ],
  },

  // 12. Public Works Department
  {
    departmentId: "public-works",
    departmentName: "Public Works Department",
    associatedOrganisations: [
      { name: "Maharashtra State Road Development Corporation (MSRDC)", url: "https://msrdc.in/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "pwd-sub-roads-buildings",
        subDepartmentName: "Office of the Chief Engineer & Regional PWD Circles",
        divisions: [
          {
            divisionId: "pwd-div-regional-circles",
            divisionName: "Regional Roads & Buildings Circles (Mumbai, Pune, Nashik, etc.)",
            services: [
              { serviceId: "pwd-svc-contractor-reg", serviceName: "PWD Contractor Registration and Classification (Class I to IX)" },
              { serviceId: "pwd-svc-road-cutting", serviceName: "Road Cutting Permission & NOC for Underground Utilities" },
              { serviceId: "pwd-svc-structural-safety", serviceName: "Government Building Structural Safety Inspection" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "pwd-sub-electrical",
        subDepartmentName: "Electrical Wing, Public Works Department",
        divisions: [
          {
            divisionId: "pwd-div-electrical-inspect",
            divisionName: "State Electrical Inspection Division",
            services: [
              { serviceId: "pwd-svc-electrical-safety", serviceName: "High Voltage Electrical Installation Inspection" },
            ],
          },
        ],
      },
    ],
  },

  // 13. Water Resources Department
  {
    departmentId: "water-resources",
    departmentName: "Water Resources Department",
    subDepartments: [
      {
        subDepartmentId: "wrd-sub-irrigation",
        subDepartmentName: "Water Resources & Irrigation Development Regions",
        divisions: [
          {
            divisionId: "wrd-div-regional-valleys",
            divisionName: "River Valley Irrigation Circles (Krishna, Godavari, Tapi, Vidarbha, Konkan)",
            services: [
              { serviceId: "wrd-svc-tariff-agreement", serviceName: "Industrial and Municipal Water Tariff Allocation Agreement" },
              { serviceId: "wrd-svc-agri-release", serviceName: "Agricultural Irrigation Water Release Sanction" },
              { serviceId: "wrd-svc-riverbank-noc", serviceName: "NOC for Construction along Riverbanks and Canal Alignments" },
            ],
          },
        ],
      },
    ],
  },

  // 14. Social Justice and Special Assistance Department
  {
    departmentId: "social-justice-special-assistance",
    departmentName: "Social Justice and Special Assitance Department",
    associatedOrganisations: [
      { name: "Mahatma Phule Backward Classes Development Corporation (MPBCDC)", url: "http://mpbcdc.maharashtra.gov.in/", organisationType: "corporation" },
      { name: "Vasantrao Naik Vimukta Jatis and Nomadic Tribes Development Corporation (VJNT)", url: "http://www.vjnt.in/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "sjsa-sub-social-welfare",
        subDepartmentName: "Directorate of Social Welfare, Maharashtra State, Pune",
        divisions: [
          {
            divisionId: "sjsa-div-district-welfare",
            divisionName: "District Social Welfare Offices",
            services: [
              { serviceId: "sjsa-svc-sc-scholarship", serviceName: "Post-Matric Scholarship for SC/Neo-Buddhist Students (MahaDBT)" },
              { serviceId: "sjsa-svc-hostel-admission", serviceName: "Admission to Government Backward Class Hostels" },
              { serviceId: "sjsa-svc-niradhar-pension", serviceName: "Sanjay Gandhi Niradhar Old Age / Destitute Pension Sanction" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "sjsa-sub-barti",
        subDepartmentName: "Dr. Babasaheb Ambedkar Research and Training Institute (BARTI), Pune",
        divisions: [
          {
            divisionId: "sjsa-div-caste-scrutiny",
            divisionName: "Divisional Caste Scrutiny Committees",
            services: [
              { serviceId: "sjsa-svc-sc-validity", serviceName: "Scheduled Caste (SC) Validity Certificate Issuance" },
            ],
          },
        ],
      },
    ],
  },

  // 15. Women and Child Development Department
  {
    departmentId: "women-child-development",
    departmentName: "Women and Child Development Department",
    associatedOrganisations: [
      { name: "Mahila Arthik Vikas Mahamandal (MAVIM)", url: "https://mavimindia.org/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "wcd-sub-commissionerate",
        subDepartmentName: "Commissionerate of Women and Child Development, Pune",
        divisions: [
          {
            divisionId: "wcd-div-district-offices",
            divisionName: "Integrated Child Development Services (ICDS) & District Offices",
            services: [
              { serviceId: "wcd-svc-ladki-bahin", serviceName: "Mukhyamantri Majhi Ladki Bahin Yojana Processing" },
              { serviceId: "wcd-svc-kanya-bhagyashree", serviceName: "Majhi Kanya Bhagyashree Financial Assistance" },
              { serviceId: "wcd-svc-dv-legal-aid", serviceName: "Protection of Women from Domestic Violence Legal Aid" },
            ],
          },
        ],
      },
    ],
  },

  // 16. Tribal Development Department
  {
    departmentId: "tribal-development",
    departmentName: "Tribal Development Department",
    subDepartments: [
      {
        subDepartmentId: "tribal-sub-commissionerate",
        subDepartmentName: "Commissionerate of Tribal Development, Nashik",
        divisions: [
          {
            divisionId: "tribal-div-itdp",
            divisionName: "Integrated Tribal Development Projects (ITDP Offices)",
            services: [
              { serviceId: "tribal-svc-st-validity", serviceName: "Scheduled Tribe (ST) Validity Certificate Verification" },
              { serviceId: "tribal-svc-ashram-admission", serviceName: "Admission to Government Ashram Schools and Eklavya Schools" },
              { serviceId: "tribal-svc-fra-claim", serviceName: "Forest Rights Act (FRA) Land Title Verification" },
            ],
          },
        ],
      },
    ],
  },

  // 17. Forest Department
  {
    departmentId: "forest",
    departmentName: "Forest Department",
    associatedOrganisations: [
      { name: "Forest Development Corporation of Maharashtra (FDCM)", url: "https://www.fdcm.co.in/home", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "forest-sub-pccf",
        subDepartmentName: "Office of the Principal Chief Conservator of Forests (HoFF), Nagpur",
        divisions: [
          {
            divisionId: "forest-div-territorial-circles",
            divisionName: "Territorial Forest Circles (Pune, Thane, Nagpur, Nashik, Kolhapur, etc.)",
            services: [
              { serviceId: "forest-svc-tree-felling", serviceName: "Tree Felling Permission on Non-Forest Land" },
              { serviceId: "forest-svc-transit-pass", serviceName: "Transit Pass (TP) for Timber and Forest Produce" },
              { serviceId: "forest-svc-wildlife-comp", serviceName: "Wildlife Damage Compensation for Crop / Livestock Loss" },
            ],
          },
        ],
      },
    ],
  },

  // 18. Co-operation, Marketing and Textile Department
  {
    departmentId: "cooperation-marketing-textiles",
    departmentName: "Co-operation, Marketing and Textile Department",
    subDepartments: [
      {
        subDepartmentId: "coop-sub-commissionerate",
        subDepartmentName: "Commissioner for Cooperation & Registrar of Cooperative Societies, Pune",
        divisions: [
          {
            divisionId: "coop-div-district-registrars",
            divisionName: "District Deputy Registrar Offices (DDR)",
            services: [
              { serviceId: "coop-svc-deemed-conveyance", serviceName: "Deemed Conveyance for Cooperative Housing Societies" },
              { serviceId: "coop-svc-society-reg", serviceName: "Cooperative Housing Society Registration & Dispute Hearing" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "coop-sub-marketing",
        subDepartmentName: "Directorate of Agricultural Marketing, Pune",
        divisions: [
          {
            divisionId: "coop-div-apmc-regulation",
            divisionName: "APMC Regulation & Direct Marketing Division",
            services: [
              { serviceId: "coop-svc-direct-marketing", serviceName: "Direct Marketing License for Agricultural Produce" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "coop-sub-textiles",
        subDepartmentName: "Directorate of Textiles, Nagpur",
        divisions: [
          {
            divisionId: "coop-div-textile-clusters",
            divisionName: "Powerloom & Textile Industry Clusters",
            services: [
              { serviceId: "coop-svc-tariff-subsidy", serviceName: "Power Tariff Subsidy for Powerloom Weavers" },
            ],
          },
        ],
      },
    ],
  },

  // 19. Transport Department
  {
    departmentId: "transport",
    departmentName: "Transport Department",
    subDepartments: [
      {
        subDepartmentId: "transport-sub-commissionerate",
        subDepartmentName: "Office of the Transport Commissioner, Maharashtra (Motor Vehicles Department)",
        divisions: [
          {
            divisionId: "transport-div-rto-offices",
            divisionName: "Regional Transport Offices (RTO - Mumbai, Pune, Thane, Nashik, Nagpur, etc.)",
            services: [
              { serviceId: "transport-svc-dl", serviceName: "Learner's License and Permanent Driving License Issuance" },
              { serviceId: "transport-svc-rc-transfer", serviceName: "Vehicle Registration Certificate (RC) & Ownership Transfer" },
              { serviceId: "transport-svc-fitness", serviceName: "Commercial Vehicle Fitness Testing and Speed Governor Inspection" },
            ],
          },
        ],
      },
    ],
  },

  // 20. Labour Department
  {
    departmentId: "labour",
    departmentName: "Labour Department",
    associatedOrganisations: [
      { name: "Maharashtra Labour Welfare Board", url: "https://public.mlwb.in/", organisationType: "board" },
      { name: "Maharashtra Building and Other Construction Workers Welfare Board", url: "https://mahabocw.in/", organisationType: "board" },
    ],
    subDepartments: [
      {
        subDepartmentId: "labour-sub-commissionerate",
        subDepartmentName: "Office of the Labour Commissioner, Maharashtra State, Mumbai",
        divisions: [
          {
            divisionId: "labour-div-enforcement",
            divisionName: "Industrial Relations & Conciliation Wing",
            services: [
              { serviceId: "labour-svc-shops-est", serviceName: "Registration of Shops and Commercial Establishments" },
              { serviceId: "labour-svc-trade-union", serviceName: "Trade Union Registration and Renewal" },
              { serviceId: "labour-svc-conciliation", serviceName: "Conciliation and Dispute Settlement between Workers & Management" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "labour-sub-dish",
        subDepartmentName: "Directorate of Industrial Safety and Health (DISH), Mumbai",
        divisions: [
          {
            divisionId: "labour-div-factory-safety",
            divisionName: "Factory and Boilers Inspection Wing",
            services: [
              { serviceId: "labour-svc-factory-license", serviceName: "Factory License Grant and Annual Renewal" },
              { serviceId: "labour-svc-boiler-inspect", serviceName: "Boiler Registration and Annual Safety Inspection" },
            ],
          },
        ],
      },
    ],
  },

  // 21. Industry, Energy, Labour and Mining Department
  {
    departmentId: "industry-energy-labour-mining",
    departmentName: "Industry, Energy, Labour and Mining Department",
    associatedOrganisations: [
      { name: "Maharashtra Industrial Development Corporation (MIDC)", url: "https://www.midcindia.org/", organisationType: "corporation" },
      { name: "Maharashtra State Khadi and Village Industries Board", url: "https://mskvib.org/", organisationType: "board" },
      { name: "Maharashtra State Mining Corporation", url: "http://msmc.gov.in/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "ind-sub-directorate",
        subDepartmentName: "Directorate of Industries, Maharashtra State, Mumbai",
        divisions: [
          {
            divisionId: "ind-div-dic-offices",
            divisionName: "District Industries Centers (DIC across all Districts)",
            services: [
              { serviceId: "ind-svc-psi-subsidy", serviceName: "Package Scheme of Incentives (PSI) Subsidies for MSMEs" },
              { serviceId: "ind-svc-pmegp", serviceName: "PMEGP Loan Subsidy Recommendation" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "ind-sub-geology-mining",
        subDepartmentName: "Directorate of Geology and Mining, Nagpur",
        divisions: [
          {
            divisionId: "ind-div-mining-concessions",
            divisionName: "Major & Minor Mineral Regulation Wing",
            services: [
              { serviceId: "ind-svc-quarry-lease", serviceName: "Minor Mineral Quarry Lease Sanction (Stone, Sand, Murrum)" },
              { serviceId: "ind-svc-transit-pass", serviceName: "Mineral Transit Pass (E-Permit) Issuance" },
            ],
          },
        ],
      },
    ],
  },

  // 22. Energy Department
  {
    departmentId: "energy",
    departmentName: "Energy Department",
    associatedOrganisations: [
      { name: "Maharashtra State Electricity Board (MSEB)", url: "http://www.msebindia.com/", organisationType: "board" },
      { name: "Maharashtra State Electricity Distribution Company Ltd (Mahadiscom)", url: "http://www.mahadiscom.in/", organisationType: "company" },
      { name: "Maharashtra State Power Generation Company Ltd (Mahagenco)", url: "https://mahagenco.in/", organisationType: "company" },
      { name: "Maharashtra State Electricity Transmission Company Ltd (Mahatransco)", url: "http://www.mahatransco.in/", organisationType: "company" },
    ],
    subDepartments: [
      {
        subDepartmentId: "energy-sub-electrical-inspectorate",
        subDepartmentName: "Office of the Chief Electrical Inspector, Mumbai",
        divisions: [
          {
            divisionId: "energy-div-inspection-wing",
            divisionName: "Regional Electrical Inspection Divisions (Mumbai, Pune, Nagpur)",
            services: [
              { serviceId: "energy-svc-ht-safety", serviceName: "High Tension (HT) Electrical Installation Safety Approval" },
              { serviceId: "energy-svc-lift-escalator", serviceName: "Lift and Escalator Safety Inspection Certificate" },
            ],
          },
        ],
      },
    ],
  },

  // 23. Skills, Employment, Entrepreneurship and Innovation Department (SEEID)
  {
    departmentId: "skill-employment-entrepreneurship-innovation",
    departmentName: "Skills, Employment, Entrepreneurship and Innovation Department (SEEID)",
    associatedOrganisations: [
      { name: "Maharashtra State Skill Development Society (MSSDS)", url: "https://www.kaushalya.mahaswayam.gov.in/", organisationType: "society" },
      { name: "Maharashtra State Innovation Society (MSInS)", url: "https://msins.in/", organisationType: "society" },
    ],
    subDepartments: [
      {
        subDepartmentId: "seeid-sub-dvet",
        subDepartmentName: "Directorate of Vocational Education and Training (DVET), Mumbai",
        divisions: [
          {
            divisionId: "seeid-div-iti-wing",
            divisionName: "Industrial Training Institutes (ITI) Administration",
            services: [
              { serviceId: "seeid-svc-iti-admission", serviceName: "Centralized ITI Online Admissions" },
              { serviceId: "seeid-svc-ntc-certificate", serviceName: "National Trade Certificate (NTC) Issuance" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "seeid-sub-mahaswayam",
        subDepartmentName: "Commissionerate of Skills, Employment, Entrepreneurship and Innovation",
        divisions: [
          {
            divisionId: "seeid-div-emp-guidance",
            divisionName: "District Skill Development, Employment & Guidance Centers",
            services: [
              { serviceId: "seeid-svc-jobseeker-reg", serviceName: "Job Seeker Registration on MahaSwayam Portal" },
              { serviceId: "seeid-svc-job-fair", serviceName: "Rojgar Melawa (Job Fair) Facilitation" },
            ],
          },
        ],
      },
    ],
  },

  // 24. Housing Department
  {
    departmentId: "housing",
    departmentName: "Housing Department",
    associatedOrganisations: [
      { name: "Maharashtra Housing and Area Development Authority (MHADA)", url: "https://mhada.gov.in/", organisationType: "corporation" },
      { name: "Shivshahi Punarvasan Prakalp Ltd (SPPL)", url: "https://spplmmr.org/", organisationType: "company" },
    ],
    subDepartments: [
      {
        subDepartmentId: "housing-sub-maharera",
        subDepartmentName: "Maharashtra Real Estate Regulatory Authority (MahaRERA)",
        divisions: [
          {
            divisionId: "housing-div-rera-reg",
            divisionName: "Project Registration & Adjudication Directorate",
            services: [
              { serviceId: "housing-svc-project-reg", serviceName: "Real Estate Project Registration under RERA" },
              { serviceId: "housing-svc-complaint-filing", serviceName: "Homebuyer Complaint Filing and Adjudication" },
            ],
          },
        ],
      },
    ],
  },

  // 25. Persons with disabilities Welfare Department
  {
    departmentId: "disability-welfare",
    departmentName: "Persons with disabilities Welfare Department",
    subDepartments: [
      {
        subDepartmentId: "disability-sub-commissionerate",
        subDepartmentName: "Commissionerate for Persons with Disabilities, Maharashtra State, Pune",
        divisions: [
          {
            divisionId: "disability-div-schemes",
            divisionName: "Divyang Welfare & Special Schools Wing",
            services: [
              { serviceId: "disability-svc-udid", serviceName: "UDID (Unique Disability ID) Card Facilitation" },
              { serviceId: "disability-svc-assistive-devices", serviceName: "Assistive Devices and Prosthetic Aids Grant" },
            ],
          },
        ],
      },
    ],
  },

  // 26. Planning Department
  {
    departmentId: "planning",
    departmentName: "Planning Department",
    subDepartments: [
      {
        subDepartmentId: "plan-sub-des",
        subDepartmentName: "Directorate of Economics and Statistics, Mumbai",
        divisions: [
          {
            divisionId: "plan-div-des-district",
            divisionName: "District Statistical Offices (DSO)",
            services: [
              { serviceId: "plan-svc-socio-economic", serviceName: "District Socio-Economic Review Publication" },
              { serviceId: "plan-svc-gsdp-estimation", serviceName: "State Income & Gross State Domestic Product (GSDP) Estimation" },
            ],
          },
        ],
      },
    ],
  },

  // 27. Tourism Department
  {
    departmentId: "tourism",
    departmentName: "Tourism Department",
    associatedOrganisations: [
      { name: "Maharashtra Tourism Development Corporation (MTDC)", url: "https://www.mtdc.co/mr/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "tour-sub-directorate",
        subDepartmentName: "Directorate of Tourism (DoT), Maharashtra, Mumbai",
        divisions: [
          {
            divisionId: "tour-div-regional",
            divisionName: "Regional Tourism Offices (Mumbai, Pune, Nashik, Aurangabad, Nagpur, etc.)",
            services: [
              { serviceId: "tour-svc-bnb-reg", serviceName: "Bed & Breakfast (B&B) and Homestay Scheme Registration" },
              { serviceId: "tour-svc-agro-tourism", serviceName: "Agro-Tourism Center Registration" },
            ],
          },
        ],
      },
    ],
  },

  // 28. Environment Department
  {
    departmentId: "environment",
    departmentName: "Environment Department",
    associatedOrganisations: [
      { name: "Maharashtra Pollution Control Board (MPCB)", url: "http://mpcb.gov.in/", organisationType: "board" },
    ],
    subDepartments: [
      {
        subDepartmentId: "env-sub-directorate",
        subDepartmentName: "Environment & Climate Change Directorate & SEIAA",
        divisions: [
          {
            divisionId: "env-div-clearances",
            divisionName: "Environmental Clearances & Coastal Zone Authority (MCZMA)",
            services: [
              { serviceId: "env-svc-ec-approval", serviceName: "Prior Environmental Clearance (EC) for Construction & Mining Projects" },
              { serviceId: "env-svc-crz-clearance", serviceName: "Coastal Regulation Zone (CRZ) Clearance" },
            ],
          },
        ],
      },
    ],
  },

  // 29. Water Supply and Sanitation
  {
    departmentId: "water-supply-sanitation",
    departmentName: "Water Supply and Sanitation",
    subDepartments: [
      {
        subDepartmentId: "wss-sub-gsda",
        subDepartmentName: "Groundwater Surveys and Development Agency (GSDA), Pune",
        divisions: [
          {
            divisionId: "wss-div-gsda-district",
            divisionName: "District Groundwater Survey Offices",
            services: [
              { serviceId: "wss-svc-groundwater-feasibility", serviceName: "Groundwater Feasibility Survey for Borewells & Wells" },
              { serviceId: "wss-svc-water-source-cert", serviceName: "Drinking Water Source Sustainability Certificate" },
            ],
          },
        ],
      },
    ],
  },

  // 30. Minority Development Department
  {
    departmentId: "minority-development",
    departmentName: "Minority Development Department",
    associatedOrganisations: [
      { name: "Maulana Azad Minorities Financial Development Corporation", url: "https://maaavm.dataman.in/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "minority-sub-directorate",
        subDepartmentName: "Directorate of Minorities Development, Mumbai",
        divisions: [
          {
            divisionId: "minority-div-schemes",
            divisionName: "Scholarship & Infrastructure Development Wing",
            services: [
              { serviceId: "minority-svc-scholarship", serviceName: "Pre-Matric & Post-Matric Minority Scholarships" },
              { serviceId: "minority-svc-madrasa", serviceName: "Madrasa Modernization Scheme Financial Assistance" },
            ],
          },
        ],
      },
    ],
  },

  // 31. Other Backward Bahujan Welfare Department
  {
    departmentId: "other-backward-bahujan-welfare",
    departmentName: "Other Backward Bahujan Welfare Department",
    associatedOrganisations: [
      { name: "Maharashtra State Other Backward Class Finance and Development Corporation", url: "https://msobcfdc.org/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "obc-sub-directorate",
        subDepartmentName: "Directorate of Other Backward Bahujan Welfare, Pune",
        divisions: [
          {
            divisionId: "obc-div-hostels",
            divisionName: "OBC/VJNT Hostels & Scholarship Wing",
            services: [
              { serviceId: "obc-svc-scholarship", serviceName: "Post-Matric Scholarship for OBC, VJNT and SBC Students" },
              { serviceId: "obc-svc-hostel-admission", serviceName: "Admission to Government Hostels for OBC Students" },
            ],
          },
        ],
      },
    ],
  },

  // 32. Electronics, Information Technology and Artificial Intelligence Department
  {
    departmentId: "electronics-information-technology-artificial-intelligence",
    departmentName: "Electronics, Information Technology and Artificial Intelligence Department",
    associatedOrganisations: [
      { name: "Maharashtra Information Technology Corporation (MahaIT)", url: "https://mahait.org/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "it-sub-dit",
        subDepartmentName: "Directorate of Information Technology (DIT), Mantralaya, Mumbai",
        divisions: [
          {
            divisionId: "it-div-egov-cyber",
            divisionName: "e-Governance, Data Centers & Cyber Security Wing",
            services: [
              { serviceId: "it-svc-cloud-hosting", serviceName: "MahaGov Cloud Hosting Services for Departments" },
              { serviceId: "it-svc-cyber-audit", serviceName: "Cyber Security Audit Clearance for Government Applications" },
            ],
          },
        ],
      },
    ],
  },

  // 33. Law and Judiciary Department
  {
    departmentId: "law-justice",
    departmentName: "Law and Judiciary Department",
    subDepartments: [
      {
        subDepartmentId: "law-sub-charity-commissioner",
        subDepartmentName: "Office of the Charity Commissioner, Maharashtra State, Mumbai",
        divisions: [
          {
            divisionId: "law-div-public-trusts",
            divisionName: "Public Trust Registration & Judicial Wing",
            services: [
              { serviceId: "law-svc-trust-reg", serviceName: "Registration of Public Charitable Trusts and Societies" },
              { serviceId: "law-svc-change-report", serviceName: "Change Report (Section 22) Inquiries and Approvals" },
            ],
          },
        ],
      },
      {
        subDepartmentId: "law-sub-registrar-firms",
        subDepartmentName: "Office of the Registrar of Firms, Maharashtra State",
        divisions: [
          {
            divisionId: "law-div-firms-reg",
            divisionName: "Partnership Firms Registration Offices (Mumbai, Pune, Nagpur, Sambhajinagar)",
            services: [
              { serviceId: "law-svc-firm-reg", serviceName: "Registration of Partnership Firms" },
              { serviceId: "law-svc-firm-alteration", serviceName: "Filing Notice of Alteration in Partnership (Form E / Form F)" },
            ],
          },
        ],
      },
    ],
  },

  // 34. Medical Education and Drug Department
  {
    departmentId: "medical-education-drugs",
    departmentName: "Medical Education and Drug Department",
    associatedOrganisations: [
      { name: "Haffkine Bio-Pharmaceutical Corporation Ltd", url: "http://vaccinehaffkine.com/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "med-sub-dmer",
        subDepartmentName: "Directorate of Medical Education and Research (DMER), Mumbai",
        divisions: [
          {
            divisionId: "med-div-teaching-hospitals",
            divisionName: "Government Medical Colleges & Super-Specialty Hospitals",
            services: [
              { serviceId: "med-svc-ug-admission", serviceName: "State Quota Undergraduate Medical Admission (NEET UG)" },
              { serviceId: "med-svc-pg-admission", serviceName: "State Quota Postgraduate Medical Admission (NEET PG)" },
            ],
          },
        ],
      },
    ],
  },

  // 35. Marathi Language Department
  {
    departmentId: "marathi-language",
    departmentName: "Marathi Language Department",
    subDepartments: [
      {
        subDepartmentId: "marathi-sub-languages",
        subDepartmentName: "Directorate of Languages (Bhasha Sanchalanalay), Mumbai",
        divisions: [
          {
            divisionId: "marathi-div-translation",
            divisionName: "Administrative Translation & Terminology Wing",
            services: [
              { serviceId: "marathi-svc-translation", serviceName: "Official Administrative and Legal Translation (English to Marathi)" },
            ],
          },
        ],
      },
    ],
  },

  // 36. Soil and water conservation Department
  {
    departmentId: "soil-water-conservation",
    departmentName: "Soil and water conservation Department",
    subDepartments: [
      {
        subDepartmentId: "swc-sub-commissionerate",
        subDepartmentName: "Commissionerate of Soil and Water Conservation, Chhatrapati Sambhajinagar",
        divisions: [
          {
            divisionId: "swc-div-watershed",
            divisionName: "Watershed Management & Jalyukt Shivar Wing",
            services: [
              { serviceId: "swc-svc-jalyukt-shivar", serviceName: "Jalyukt Shivar Abhiyan Water Conservation Approvals" },
              { serviceId: "swc-svc-farm-pond", serviceName: "Farm Pond Subsidy (Magel Tyala Shettale)" },
            ],
          },
        ],
      },
    ],
  },

  // 37. EGS Department
  {
    departmentId: "employment-guarantee",
    departmentName: "EGS Department",
    subDepartments: [
      {
        subDepartmentId: "egs-sub-commissionerate",
        subDepartmentName: "Commissionerate of Employment Guarantee Scheme (MGNREGS), Mantralaya",
        divisions: [
          {
            divisionId: "egs-div-mgnregs-district",
            divisionName: "District Employment Guarantee Wings (Collectorates)",
            services: [
              { serviceId: "egs-svc-job-card", serviceName: "Issuance of MGNREGS Job Card" },
              { serviceId: "egs-svc-demand-work", serviceName: "Demand for Work and Wage Disbursal under EGS" },
            ],
          },
        ],
      },
    ],
  },

  // 38. Textile Department
  {
    departmentId: "textiles",
    departmentName: "Textile Department",
    associatedOrganisations: [
      { name: "Maharashtra State Powerlooms Corporation Ltd", url: "https://mspc.org.in/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "textile-sub-directorate",
        subDepartmentName: "Directorate of Textiles, Maharashtra State, Nagpur",
        divisions: [
          {
            divisionId: "textile-div-powerloom",
            divisionName: "Powerloom & Handloom Clusters Division",
            services: [
              { serviceId: "textile-svc-tariff-subsidy", serviceName: "Electricity Tariff Subsidy for Powerlooms" },
              { serviceId: "textile-svc-capital-subsidy", serviceName: "Capital Subsidy for Textile Mills and Weaving Units" },
            ],
          },
        ],
      },
    ],
  },

  // 39. Fishries Development
  {
    departmentId: "fishries-development",
    departmentName: "Fishries Development",
    subDepartments: [
      {
        subDepartmentId: "fish-sub-directorate",
        subDepartmentName: "Directorate of Fisheries, Maharashtra State, Mumbai",
        divisions: [
          {
            divisionId: "fish-div-marine-inland",
            divisionName: "Marine & Inland Fisheries Regional Offices",
            services: [
              { serviceId: "fish-svc-boat-reg", serviceName: "Fishing Boat Registration and Sea Fishing License (MFRA)" },
              { serviceId: "fish-svc-diesel-subsidy", serviceName: "Sales Tax Exemption on High Speed Diesel for Fishing Boats" },
            ],
          },
        ],
      },
    ],
  },

  // 40. Parliamentry Affair Department
  {
    departmentId: "parliamentary-affairs",
    departmentName: "Parliamentry Affair Department",
    subDepartments: [
      {
        subDepartmentId: "pa-sub-secretariat",
        subDepartmentName: "Parliamentary Affairs Secretariat, Mantralaya, Mumbai",
        divisions: [
          {
            divisionId: "pa-div-assembly-liaison",
            divisionName: "Legislative Assembly & Council Coordination Wing",
            services: [
              { serviceId: "pa-svc-calling-attention", serviceName: "Coordination of Legislative Assembly Calling Attention Notices" },
            ],
          },
        ],
      },
    ],
  },

  // 41. Cultural Department
  {
    departmentId: "cultural-affairs",
    departmentName: "Cultural Department",
    associatedOrganisations: [
      { name: "Maharashtra Film, Stage and Cultural Development Corporation Ltd", url: "https://www.filmcitymumbai.org/", organisationType: "corporation" },
    ],
    subDepartments: [
      {
        subDepartmentId: "cultural-sub-directorate",
        subDepartmentName: "Directorate of Cultural Affairs, Mumbai",
        divisions: [
          {
            divisionId: "cultural-div-drama-theatre",
            divisionName: "State Drama & Performing Arts Wing",
            services: [
              { serviceId: "cultural-svc-drama-competition", serviceName: "Maharashtra State Drama Competition (Rajya Natya Spardha) Entry" },
              { serviceId: "cultural-svc-artist-pension", serviceName: "Pension and Financial Aid to Veteran Artists" },
            ],
          },
        ],
      },
    ],
  },
];

export const MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V2: DepartmentRegistry = {
  registryId: version,
  organisationId: "maharashtra-government",
  organisationName: "Government of Maharashtra",
  organisationType: "government",
  version,
  effectiveDate: null,
  supportingSources,
  departments: rawDepartments.map(
    ({ departmentId, departmentName, associatedOrganisations = [], subDepartments }) => ({
      departmentId: `mh-gom-${departmentId}`,
      departmentName,
      departmentCode: null,
      parentDepartment: null,
      associatedOrganisations,
      subDepartments: subDepartments.map((sub) => ({
        subDepartmentId: sub.subDepartmentId,
        subDepartmentName: sub.subDepartmentName,
        divisions: sub.divisions.map((div) => ({
          divisionId: div.divisionId,
          divisionName: div.divisionName,
          sections: [],
          services: div.services.map((svc) => ({
            serviceId: svc.serviceId,
            serviceName: svc.serviceName,
            metadata: {
              status: "listed_in_source",
              source,
              sources: [source],
              version,
              effectiveDate: null,
            },
          })),
          metadata: {
            status: "listed_in_source",
            source,
            sources: [source],
            version,
            effectiveDate: null,
          },
        })),
        sections: [],
        services: [],
        metadata: {
          status: "listed_in_source",
          source,
          sources: [source],
          version,
          effectiveDate: null,
        },
      })),
      divisions: [],
      sections: [],
      services: [],
      metadata: {
        status: "listed_in_source",
        source,
        sources: [source],
        version,
        effectiveDate: null,
      },
    }),
  ),
};

export const MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1 =
  MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V2;

export const getDepartmentById = (
  departmentId: string,
  registry: DepartmentRegistry = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V2,
) => registry.departments.find((department) => department.departmentId === departmentId);