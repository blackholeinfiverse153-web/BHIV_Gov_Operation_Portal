export interface OfficerDesignation {
  designationId: string;
  designationName: string;
  departmentId: string;
  subDepartmentId?: string;
  divisionId?: string;
}

export interface OfficerDesignationRegistry {
  registryId: string;
  version: string;
  status: "source_required" | "verified";
  sourceRequirement: string;
  designations: OfficerDesignation[];
}

export const MAHARASHTRA_GOV_OFFICER_DESIGNATION_REGISTRY_V1: OfficerDesignationRegistry = {
  registryId: "MAHARASHTRA_GOV_OFFICER_DESIGNATION_REGISTRY_V1",
  version: "MAHARASHTRA_GOV_OFFICER_DESIGNATION_REGISTRY_V1",
  status: "verified",
  sourceRequirement:
    "Populate only from official Maharashtra Government department directories, service rules, and administrative organization structures.",
  designations: [
    // -------------------------------------------------------------------------
    // 1. Food, Civil Supply and Consumer Protection Department
    // -------------------------------------------------------------------------
    {
      designationId: "fcs-desig-cor",
      designationName: "Controller of Rationing & Director of Civil Supplies",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-city",
    },
    {
      designationId: "fcs-desig-dy-cor",
      designationName: "Deputy Controller of Rationing",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-city",
    },
    {
      designationId: "fcs-desig-asst-cor",
      designationName: "Assistant Controller of Rationing",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-city",
    },
    {
      designationId: "fcs-desig-ro",
      designationName: "Rationing Officer",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-city",
    },
    {
      designationId: "fcs-desig-aro",
      designationName: "Assistant Rationing Officer",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-city",
    },
    {
      designationId: "fcs-desig-cfi-suburban",
      designationName: "Chief Food Inspector",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-suburban",
    },
    {
      designationId: "fcs-desig-ri-suburban",
      designationName: "Rationing Inspector",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-suburban",
    },
    {
      designationId: "fcs-desig-ro-suburban",
      designationName: "Rationing Officer",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-suburban",
    },
    {
      designationId: "fcs-desig-sc",
      designationName: "Supply Commissioner",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-pds-allocation",
    },
    {
      designationId: "fcs-desig-jc-supply",
      designationName: "Joint Commissioner (Supply)",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-pds-allocation",
    },
    {
      designationId: "fcs-desig-dyc-supply",
      designationName: "Deputy Commissioner (Supply)",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-pds-allocation",
    },
    {
      designationId: "fcs-desig-dso",
      designationName: "District Supply Officer (DSO)",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-district-supply",
    },
    {
      designationId: "fcs-desig-fdo",
      designationName: "Food Distribution Officer (FDO)",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-district-supply",
    },
    {
      designationId: "fcs-desig-adso",
      designationName: "Assistant District Supply Officer (ADSO)",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-district-supply",
    },
    {
      designationId: "fcs-desig-si",
      designationName: "Supply Inspector",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-supply-commissionerate",
      divisionId: "fcs-div-district-supply",
    },
    {
      designationId: "fcs-desig-clm",
      designationName: "Controller of Legal Metrology",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-legal-metrology",
      divisionId: "fcs-div-lm-standards",
    },
    {
      designationId: "fcs-desig-jclm",
      designationName: "Joint Controller of Legal Metrology",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-legal-metrology",
      divisionId: "fcs-div-lm-standards",
    },
    {
      designationId: "fcs-desig-dyclm",
      designationName: "Deputy Controller of Legal Metrology",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-legal-metrology",
      divisionId: "fcs-div-lm-standards",
    },
    {
      designationId: "fcs-desig-aclm",
      designationName: "Assistant Controller of Legal Metrology",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-legal-metrology",
      divisionId: "fcs-div-lm-standards",
    },
    {
      designationId: "fcs-desig-ilm",
      designationName: "Inspector of Legal Metrology",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-legal-metrology",
      divisionId: "fcs-div-lm-standards",
    },
    {
      designationId: "fcs-desig-ilm-licensing",
      designationName: "Inspector of Legal Metrology (Licensing)",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-legal-metrology",
      divisionId: "fcs-div-lm-licensing",
    },
    {
      designationId: "fcs-desig-pres-scdrc",
      designationName: "President, State Consumer Disputes Redressal Commission",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-consumer-redressal",
      divisionId: "fcs-div-scdrc-mumbai",
    },
    {
      designationId: "fcs-desig-mem-scdrc",
      designationName: "Member, State Consumer Commission",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-consumer-redressal",
      divisionId: "fcs-div-scdrc-mumbai",
    },
    {
      designationId: "fcs-desig-reg-scdrc",
      designationName: "Registrar, State Consumer Commission",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-consumer-redressal",
      divisionId: "fcs-div-scdrc-mumbai",
    },
    {
      designationId: "fcs-desig-pres-dcdrc",
      designationName: "President, District Consumer Commission",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-consumer-redressal",
      divisionId: "fcs-div-dcdrc-district",
    },
    {
      designationId: "fcs-desig-mem-dcdrc",
      designationName: "Member, District Consumer Commission",
      departmentId: "mh-gom-food-civil-supplies-consumer-protection",
      subDepartmentId: "fcs-sub-consumer-redressal",
      divisionId: "fcs-div-dcdrc-district",
    },

    // -------------------------------------------------------------------------
    // 2. Revenue Department
    // -------------------------------------------------------------------------
    {
      designationId: "rev-desig-div-comm-konkan",
      designationName: "Divisional Commissioner",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-collector-konkan",
      designationName: "District Collector & District Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-addl-collector-konkan",
      designationName: "Additional District Collector",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-sdo-konkan",
      designationName: "Sub-Divisional Officer (SDO) / Sub-Divisional Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-tahsildar-konkan",
      designationName: "Tahsildar & Executive Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-naib-tahsildar-konkan",
      designationName: "Naib Tahsildar",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-circle-officer-konkan",
      designationName: "Circle Officer",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-talathi-konkan",
      designationName: "Talathi",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-konkan",
    },
    {
      designationId: "rev-desig-div-comm-pune",
      designationName: "Divisional Commissioner",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-pune",
    },
    {
      designationId: "rev-desig-collector-pune",
      designationName: "District Collector & District Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-pune",
    },
    {
      designationId: "rev-desig-sdo-pune",
      designationName: "Sub-Divisional Officer (SDO)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-pune",
    },
    {
      designationId: "rev-desig-tahsildar-pune",
      designationName: "Tahsildar & Executive Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-pune",
    },
    {
      designationId: "rev-desig-talathi-pune",
      designationName: "Talathi",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-pune",
    },
    {
      designationId: "rev-desig-div-comm-nashik",
      designationName: "Divisional Commissioner",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-nashik",
    },
    {
      designationId: "rev-desig-collector-nashik",
      designationName: "District Collector & District Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-nashik",
    },
    {
      designationId: "rev-desig-tahsildar-nashik",
      designationName: "Tahsildar & Executive Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-nashik",
    },
    {
      designationId: "rev-desig-div-comm-csn",
      designationName: "Divisional Commissioner",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-sambhajinagar",
    },
    {
      designationId: "rev-desig-collector-csn",
      designationName: "District Collector & District Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-sambhajinagar",
    },
    {
      designationId: "rev-desig-tahsildar-csn",
      designationName: "Tahsildar & Executive Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-sambhajinagar",
    },
    {
      designationId: "rev-desig-div-comm-nagpur",
      designationName: "Divisional Commissioner",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-nagpur",
    },
    {
      designationId: "rev-desig-collector-nagpur",
      designationName: "District Collector & District Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-nagpur",
    },
    {
      designationId: "rev-desig-tahsildar-nagpur",
      designationName: "Tahsildar & Executive Magistrate",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-revenue",
      divisionId: "rev-div-nagpur",
    },
    {
      designationId: "rev-desig-settlement-comm",
      designationName: "Settlement Commissioner and Director of Land Records",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-records",
      divisionId: "rev-div-lr-cadastral",
    },
    {
      designationId: "rev-desig-dy-dir-lr",
      designationName: "Deputy Director of Land Records (Divisional)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-records",
      divisionId: "rev-div-lr-cadastral",
    },
    {
      designationId: "rev-desig-dslr",
      designationName: "District Superintendent of Land Records (DSLR)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-records",
      divisionId: "rev-div-lr-cadastral",
    },
    {
      designationId: "rev-desig-dilr",
      designationName: "District Inspector of Land Records (DILR)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-records",
      divisionId: "rev-div-lr-cadastral",
    },
    {
      designationId: "rev-desig-ctso",
      designationName: "City Survey Officer (CTSO)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-records",
      divisionId: "rev-div-lr-cadastral",
    },
    {
      designationId: "rev-desig-surveyor",
      designationName: "Maintenance Surveyor",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-land-records",
      divisionId: "rev-div-lr-cadastral",
    },
    {
      designationId: "rev-desig-igr",
      designationName: "Inspector General of Registration & Controller of Stamps",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-mumbai",
    },
    {
      designationId: "rev-desig-digr-mumbai",
      designationName: "Deputy Inspector General of Registration (DIGR)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-mumbai",
    },
    {
      designationId: "rev-desig-jdr-mumbai",
      designationName: "Joint District Registrar & Collector of Stamps",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-mumbai",
    },
    {
      designationId: "rev-desig-subreg-1-mumbai",
      designationName: "Sub-Registrar Grade I",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-mumbai",
    },
    {
      designationId: "rev-desig-subreg-2-mumbai",
      designationName: "Sub-Registrar Grade II",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-mumbai",
    },
    {
      designationId: "rev-desig-digr-pune",
      designationName: "Deputy Inspector General of Registration (DIGR)",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-pune",
    },
    {
      designationId: "rev-desig-jdr-pune",
      designationName: "Joint District Registrar & Collector of Stamps",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-pune",
    },
    {
      designationId: "rev-desig-subreg-1-pune",
      designationName: "Sub-Registrar Grade I",
      departmentId: "mh-gom-revenue",
      subDepartmentId: "rev-sub-registration-stamps",
      divisionId: "rev-div-reg-pune",
    },

    // -------------------------------------------------------------------------
    // 3. Home Department
    // -------------------------------------------------------------------------
    {
      designationId: "home-desig-dgp",
      designationName: "Director General of Police (DGP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-cp-mumbai",
      designationName: "Commissioner of Police (CP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-jcp-mumbai",
      designationName: "Joint Commissioner of Police (JCP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-addl-cp-mumbai",
      designationName: "Additional Commissioner of Police (Addl CP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-dcp-mumbai",
      designationName: "Deputy Commissioner of Police (DCP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-acp-mumbai",
      designationName: "Assistant Commissioner of Police (ACP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-sr-pi-mumbai",
      designationName: "Senior Police Inspector (Sr PI)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-pi-mumbai",
      designationName: "Police Inspector (PI)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-api-mumbai",
      designationName: "Assistant Police Inspector (API)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-psi-mumbai",
      designationName: "Police Sub-Inspector (PSI)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-mumbai-police",
    },
    {
      designationId: "home-desig-spl-ig-range",
      designationName: "Special Inspector General of Police (Range Spl IG)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-district-police",
    },
    {
      designationId: "home-desig-sp-dist",
      designationName: "Superintendent of Police (SP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-district-police",
    },
    {
      designationId: "home-desig-addl-sp-dist",
      designationName: "Additional Superintendent of Police (Addl SP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-district-police",
    },
    {
      designationId: "home-desig-sdpo-dist",
      designationName: "Sub-Divisional Police Officer (SDPO / DySP)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-district-police",
    },
    {
      designationId: "home-desig-pi-dist",
      designationName: "Police Inspector (PI)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-district-police",
    },
    {
      designationId: "home-desig-psi-dist",
      designationName: "Police Sub-Inspector (PSI)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-police-headquarters",
      divisionId: "home-div-district-police",
    },
    {
      designationId: "home-desig-adgp-prisons",
      designationName: "Additional Director General of Police & Inspector General of Prisons",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prisons",
      divisionId: "home-div-central-prisons",
    },
    {
      designationId: "home-desig-dig-prisons",
      designationName: "Deputy Inspector General of Prisons (DIG Prisons)",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prisons",
      divisionId: "home-div-central-prisons",
    },
    {
      designationId: "home-desig-supt-central-prison",
      designationName: "Superintendent of Central Prison",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prisons",
      divisionId: "home-div-central-prisons",
    },
    {
      designationId: "home-desig-jailer-1",
      designationName: "Jailer Group I",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prisons",
      divisionId: "home-div-central-prisons",
    },
    {
      designationId: "home-desig-dir-prosecution",
      designationName: "Director of Prosecution",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prosecution",
      divisionId: "home-div-sessions-prosecution",
    },
    {
      designationId: "home-desig-chief-pp",
      designationName: "Chief Public Prosecutor",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prosecution",
      divisionId: "home-div-sessions-prosecution",
    },
    {
      designationId: "home-desig-addl-pp",
      designationName: "Additional Public Prosecutor",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prosecution",
      divisionId: "home-div-sessions-prosecution",
    },
    {
      designationId: "home-desig-asst-pp",
      designationName: "Assistant Public Prosecutor",
      departmentId: "mh-gom-home",
      subDepartmentId: "home-sub-prosecution",
      divisionId: "home-div-sessions-prosecution",
    },

    // -------------------------------------------------------------------------
    // 4. Public Health Department
    // -------------------------------------------------------------------------
    {
      designationId: "ph-desig-dhs",
      designationName: "Director of Health Services (DHS)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-addl-dhs",
      designationName: "Additional Director of Health Services",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-joint-dhs",
      designationName: "Joint Director of Health Services",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-dy-dhs",
      designationName: "Deputy Director of Health Services (Divisional Circle)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-civil-surgeon",
      designationName: "Civil Surgeon",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-dho",
      designationName: "District Health Officer (DHO)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-med-supt",
      designationName: "Medical Superintendent",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-mo-1",
      designationName: "Medical Officer (Class I)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-mo-2",
      designationName: "Medical Officer (Class II)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-directorate-health",
      divisionId: "ph-div-hospital-services",
    },
    {
      designationId: "ph-desig-comm-fda",
      designationName: "Commissioner, Food and Drugs Administration",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-food",
    },
    {
      designationId: "ph-desig-jc-fda-food",
      designationName: "Joint Commissioner (Food)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-food",
    },
    {
      designationId: "ph-desig-ac-fda-food",
      designationName: "Assistant Commissioner (Food)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-food",
    },
    {
      designationId: "ph-desig-fso",
      designationName: "Food Safety Officer (FSO)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-food",
    },
    {
      designationId: "ph-desig-jc-fda-drugs",
      designationName: "Joint Commissioner (Drugs)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-drugs",
    },
    {
      designationId: "ph-desig-ac-fda-drugs",
      designationName: "Assistant Commissioner (Drugs)",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-drugs",
    },
    {
      designationId: "ph-desig-drugs-inspector",
      designationName: "Drugs Inspector",
      departmentId: "mh-gom-public-health",
      subDepartmentId: "ph-sub-fda",
      divisionId: "ph-div-fda-drugs",
    },

    // -------------------------------------------------------------------------
    // 5. Agriculture Department
    // -------------------------------------------------------------------------
    {
      designationId: "agri-desig-comm",
      designationName: "Commissioner of Agriculture",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-dir-ext",
      designationName: "Director of Agriculture (Extension / Inputs)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-jda",
      designationName: "Divisional Joint Director of Agriculture (JDA)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-dsao",
      designationName: "District Superintending Agriculture Officer (DSAO)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-sdao",
      designationName: "Sub-Divisional Agriculture Officer (SDAO)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-tao",
      designationName: "Taluka Agriculture Officer (TAO)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-supervisor",
      designationName: "Agriculture Supervisor",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-assistant",
      designationName: "Agriculture Assistant (Krishi Sahayak)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-extension-inputs",
    },
    {
      designationId: "agri-desig-dir-hort",
      designationName: "Director of Agriculture (Horticulture)",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-horticulture",
    },
    {
      designationId: "agri-desig-hort-officer",
      designationName: "Horticulture Officer",
      departmentId: "mh-gom-agriculture",
      subDepartmentId: "agri-sub-commissionerate",
      divisionId: "agri-div-horticulture",
    },

    // -------------------------------------------------------------------------
    // 6. Rural Development and Panchayat Raj Department
    // -------------------------------------------------------------------------
    {
      designationId: "rdd-desig-div-comm-dev",
      designationName: "Divisional Commissioner (Development)",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-ceo-zp",
      designationName: "Chief Executive Officer (CEO), Zilla Parishad",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-addl-ceo-zp",
      designationName: "Additional Chief Executive Officer, ZP",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-dy-ceo-zp",
      designationName: "Deputy Chief Executive Officer (Panchayat / General)",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-bdo",
      designationName: "Block Development Officer (BDO)",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-ext-officer",
      designationName: "Extension Officer (Panchayat)",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-vdo",
      designationName: "Gram Sevak / Village Development Officer (VDO)",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-zp-admin",
    },
    {
      designationId: "rdd-desig-dmm-msrlm",
      designationName: "District Mission Manager (MSRLM - UMED)",
      departmentId: "mh-gom-rural-development-panchayat-raj",
      subDepartmentId: "rdd-sub-panchayat-raj",
      divisionId: "rdd-div-msrlm-livelihoods",
    },

    // -------------------------------------------------------------------------
    // 7. School Education and Sports Department
    // -------------------------------------------------------------------------
    {
      designationId: "edu-desig-dir-primary",
      designationName: "Director of Primary Education",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-primary",
      divisionId: "edu-div-primary-district",
    },
    {
      designationId: "edu-desig-dyde-primary",
      designationName: "Deputy Director of Education (Divisional)",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-primary",
      divisionId: "edu-div-primary-district",
    },
    {
      designationId: "edu-desig-eo-primary",
      designationName: "Education Officer (Primary), Zilla Parishad",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-primary",
      divisionId: "edu-div-primary-district",
    },
    {
      designationId: "edu-desig-beo",
      designationName: "Block Education Officer (BEO)",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-primary",
      divisionId: "edu-div-primary-district",
    },
    {
      designationId: "edu-desig-dir-sec",
      designationName: "Director of Secondary and Higher Secondary Education",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-secondary",
      divisionId: "edu-div-sec-district",
    },
    {
      designationId: "edu-desig-eo-sec",
      designationName: "Education Officer (Secondary), Zilla Parishad",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-secondary",
      divisionId: "edu-div-sec-district",
    },
    {
      designationId: "edu-desig-dir-sports",
      designationName: "Commissioner / Director of Sports & Youth Services",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-sports",
      divisionId: "edu-div-sports-district",
    },
    {
      designationId: "edu-desig-dso",
      designationName: "District Sports Officer (DSO)",
      departmentId: "mh-gom-school-education-sports",
      subDepartmentId: "edu-sub-sports",
      divisionId: "edu-div-sports-district",
    },

    // -------------------------------------------------------------------------
    // 8. Higher and Technical Education Department
    // -------------------------------------------------------------------------
    {
      designationId: "dte-desig-dir",
      designationName: "Director of Technical Education",
      departmentId: "mh-gom-higher-technical-education",
      subDepartmentId: "dte-sub-technical",
      divisionId: "dte-div-cap-approval",
    },
    {
      designationId: "dte-desig-jd-regional",
      designationName: "Joint Director of Technical Education (Regional)",
      departmentId: "mh-gom-higher-technical-education",
      subDepartmentId: "dte-sub-technical",
      divisionId: "dte-div-cap-approval",
    },
    {
      designationId: "dte-desig-principal-engg",
      designationName: "Principal, Government Engineering College",
      departmentId: "mh-gom-higher-technical-education",
      subDepartmentId: "dte-sub-technical",
      divisionId: "dte-div-cap-approval",
    },
    {
      designationId: "dte-desig-principal-poly",
      designationName: "Principal, Government Polytechnic",
      departmentId: "mh-gom-higher-technical-education",
      subDepartmentId: "dte-sub-technical",
      divisionId: "dte-div-cap-approval",
    },
    {
      designationId: "dhe-desig-dir",
      designationName: "Director of Higher Education",
      departmentId: "mh-gom-higher-technical-education",
      subDepartmentId: "dhe-sub-higher",
      divisionId: "dhe-div-colleges",
    },
    {
      designationId: "dhe-desig-jd-regional",
      designationName: "Joint Director of Higher Education (Regional)",
      departmentId: "mh-gom-higher-technical-education",
      subDepartmentId: "dhe-sub-higher",
      divisionId: "dhe-div-colleges",
    },

    // -------------------------------------------------------------------------
    // 9. Urban Development Department
    // -------------------------------------------------------------------------
    {
      designationId: "ud-desig-dma",
      designationName: "Director of Municipal Administration & Commissioner",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-municipal-admin",
      divisionId: "ud-div-corps-councils",
    },
    {
      designationId: "ud-desig-mc",
      designationName: "Municipal Commissioner",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-municipal-admin",
      divisionId: "ud-div-corps-councils",
    },
    {
      designationId: "ud-desig-addl-mc",
      designationName: "Additional Municipal Commissioner",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-municipal-admin",
      divisionId: "ud-div-corps-councils",
    },
    {
      designationId: "ud-desig-dmc",
      designationName: "Deputy Municipal Commissioner (DMC)",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-municipal-admin",
      divisionId: "ud-div-corps-councils",
    },
    {
      designationId: "ud-desig-amc",
      designationName: "Assistant Municipal Commissioner / Ward Officer",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-municipal-admin",
      divisionId: "ud-div-corps-councils",
    },
    {
      designationId: "ud-desig-co",
      designationName: "Chief Officer (CO), Municipal Council",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-municipal-admin",
      divisionId: "ud-div-corps-councils",
    },
    {
      designationId: "ud-desig-dir-tp",
      designationName: "Director of Town Planning",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-town-planning",
      divisionId: "ud-div-tp-valuation",
    },
    {
      designationId: "ud-desig-jd-tp",
      designationName: "Joint Director of Town Planning",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-town-planning",
      divisionId: "ud-div-tp-valuation",
    },
    {
      designationId: "ud-desig-ddtp",
      designationName: "Deputy Director of Town Planning (DDTP)",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-town-planning",
      divisionId: "ud-div-tp-valuation",
    },
    {
      designationId: "ud-desig-town-planner",
      designationName: "Town Planner",
      departmentId: "mh-gom-urban-development",
      subDepartmentId: "ud-sub-town-planning",
      divisionId: "ud-div-tp-valuation",
    },

    // -------------------------------------------------------------------------
    // 10. Finance Department
    // -------------------------------------------------------------------------
    {
      designationId: "fin-desig-dat",
      designationName: "Director of Accounts and Treasuries",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-accounts-treasuries",
      divisionId: "fin-div-treasury-offices",
    },
    {
      designationId: "fin-desig-pao",
      designationName: "Pay and Accounts Officer (PAO), Mumbai",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-accounts-treasuries",
      divisionId: "fin-div-treasury-offices",
    },
    {
      designationId: "fin-desig-dto",
      designationName: "District Treasury Officer (DTO)",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-accounts-treasuries",
      divisionId: "fin-div-treasury-offices",
    },
    {
      designationId: "fin-desig-ato",
      designationName: "Assistant Treasury Officer (ATO)",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-accounts-treasuries",
      divisionId: "fin-div-treasury-offices",
    },
    {
      designationId: "fin-desig-comm-gst",
      designationName: "Commissioner of State Tax (GST)",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-state-gst",
      divisionId: "fin-div-gst-enforcement",
    },
    {
      designationId: "fin-desig-jc-gst",
      designationName: "Joint Commissioner of State Tax",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-state-gst",
      divisionId: "fin-div-gst-enforcement",
    },
    {
      designationId: "fin-desig-dcst",
      designationName: "Deputy Commissioner of State Tax (DCST)",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-state-gst",
      divisionId: "fin-div-gst-enforcement",
    },
    {
      designationId: "fin-desig-acst",
      designationName: "Assistant Commissioner of State Tax (ACST)",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-state-gst",
      divisionId: "fin-div-gst-enforcement",
    },
    {
      designationId: "fin-desig-sto",
      designationName: "State Tax Officer (STO)",
      departmentId: "mh-gom-finance",
      subDepartmentId: "fin-sub-state-gst",
      divisionId: "fin-div-gst-enforcement",
    },

    // -------------------------------------------------------------------------
    // 11. General Administration Department
    // -------------------------------------------------------------------------
    {
      designationId: "gad-desig-cs",
      designationName: "Chief Secretary",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-acs-personnel",
      designationName: "Additional Chief Secretary (Personnel)",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-sec-protocol",
      designationName: "Secretary (Protocol) / Chief Protocol Officer",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-joint-sec",
      designationName: "Joint Secretary",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-dy-sec",
      designationName: "Deputy Secretary",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-under-sec",
      designationName: "Under Secretary",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-section-officer",
      designationName: "Section Officer",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-mantralaya",
      divisionId: "gad-div-personnel-protocol",
    },
    {
      designationId: "gad-desig-dgipr",
      designationName: "Director General of Information & Public Relations",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-dgipr",
      divisionId: "gad-div-media-publicity",
    },
    {
      designationId: "gad-desig-dio",
      designationName: "District Information Officer (DIO)",
      departmentId: "mh-gom-general-administration",
      subDepartmentId: "gad-sub-dgipr",
      divisionId: "gad-div-media-publicity",
    },

    // -------------------------------------------------------------------------
    // 12. Public Works Department
    // -------------------------------------------------------------------------
    {
      designationId: "pwd-desig-sec-roads",
      designationName: "Secretary (Roads / Buildings), PWD",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-ce",
      designationName: "Chief Engineer (CE)",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-se",
      designationName: "Superintending Engineer (SE)",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-ee",
      designationName: "Executive Engineer (EE)",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-sde",
      designationName: "Sub-Divisional Engineer (SDE)",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-ae-1",
      designationName: "Assistant Engineer (AE Grade I)",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-je",
      designationName: "Junior Engineer (JE)",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-roads-buildings",
      divisionId: "pwd-div-regional-circles",
    },
    {
      designationId: "pwd-desig-cei",
      designationName: "Chief Electrical Inspector",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-electrical",
      divisionId: "pwd-div-electrical-inspect",
    },
    {
      designationId: "pwd-desig-ei",
      designationName: "Electrical Inspector",
      departmentId: "mh-gom-public-works",
      subDepartmentId: "pwd-sub-electrical",
      divisionId: "pwd-div-electrical-inspect",
    },

    // -------------------------------------------------------------------------
    // 13. Water Resources Department
    // -------------------------------------------------------------------------
    {
      designationId: "wrd-desig-sec",
      designationName: "Secretary, Water Resources",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },
    {
      designationId: "wrd-desig-ce",
      designationName: "Chief Engineer (Water Resources)",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },
    {
      designationId: "wrd-desig-se",
      designationName: "Superintending Engineer (Irrigation Circle)",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },
    {
      designationId: "wrd-desig-ee",
      designationName: "Executive Engineer (Irrigation Division)",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },
    {
      designationId: "wrd-desig-sdo",
      designationName: "Sub-Divisional Officer (SDO)",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },
    {
      designationId: "wrd-desig-ae-1",
      designationName: "Assistant Engineer (AE Grade I)",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },
    {
      designationId: "wrd-desig-patkari",
      designationName: "Canal Inspector (Patkari)",
      departmentId: "mh-gom-water-resources",
      subDepartmentId: "wrd-sub-irrigation",
      divisionId: "wrd-div-regional-valleys",
    },

    // -------------------------------------------------------------------------
    // 14. Social Justice and Special Assistance Department
    // -------------------------------------------------------------------------
    {
      designationId: "sjsa-desig-comm",
      designationName: "Commissioner of Social Welfare",
      departmentId: "mh-gom-social-justice-special-assistance",
      subDepartmentId: "sjsa-sub-social-welfare",
      divisionId: "sjsa-div-district-welfare",
    },
    {
      designationId: "sjsa-desig-joint-dir",
      designationName: "Joint Director of Social Welfare",
      departmentId: "mh-gom-social-justice-special-assistance",
      subDepartmentId: "sjsa-sub-social-welfare",
      divisionId: "sjsa-div-district-welfare",
    },
    {
      designationId: "sjsa-desig-dswo",
      designationName: "District Social Welfare Officer (DSWO)",
      departmentId: "mh-gom-social-justice-special-assistance",
      subDepartmentId: "sjsa-sub-social-welfare",
      divisionId: "sjsa-div-district-welfare",
    },
    {
      designationId: "sjsa-desig-asst-comm",
      designationName: "Assistant Commissioner (Social Welfare)",
      departmentId: "mh-gom-social-justice-special-assistance",
      subDepartmentId: "sjsa-sub-social-welfare",
      divisionId: "sjsa-div-district-welfare",
    },
    {
      designationId: "sjsa-desig-barti-dg",
      designationName: "Director General, BARTI",
      departmentId: "mh-gom-social-justice-special-assistance",
      subDepartmentId: "sjsa-sub-barti",
      divisionId: "sjsa-div-caste-scrutiny",
    },
    {
      designationId: "sjsa-desig-mem-sec-caste",
      designationName: "Member Secretary, Caste Scrutiny Committee",
      departmentId: "mh-gom-social-justice-special-assistance",
      subDepartmentId: "sjsa-sub-barti",
      divisionId: "sjsa-div-caste-scrutiny",
    },

    // -------------------------------------------------------------------------
    // 15. Women and Child Development Department
    // -------------------------------------------------------------------------
    {
      designationId: "wcd-desig-comm",
      designationName: "Commissioner of Women and Child Development",
      departmentId: "mh-gom-women-child-development",
      subDepartmentId: "wcd-sub-commissionerate",
      divisionId: "wcd-div-district-offices",
    },
    {
      designationId: "wcd-desig-dwcdo",
      designationName: "District Women and Child Development Officer (DWCDO)",
      departmentId: "mh-gom-women-child-development",
      subDepartmentId: "wcd-sub-commissionerate",
      divisionId: "wcd-div-district-offices",
    },
    {
      designationId: "wcd-desig-cdpo",
      designationName: "Child Development Project Officer (CDPO)",
      departmentId: "mh-gom-women-child-development",
      subDepartmentId: "wcd-sub-commissionerate",
      divisionId: "wcd-div-district-offices",
    },
    {
      designationId: "wcd-desig-po-dv",
      designationName: "Protection Officer (Domestic Violence Act)",
      departmentId: "mh-gom-women-child-development",
      subDepartmentId: "wcd-sub-commissionerate",
      divisionId: "wcd-div-district-offices",
    },
    {
      designationId: "wcd-desig-anganwadi-sup",
      designationName: "Anganwadi Supervisor",
      departmentId: "mh-gom-women-child-development",
      subDepartmentId: "wcd-sub-commissionerate",
      divisionId: "wcd-div-district-offices",
    },

    // -------------------------------------------------------------------------
    // 16. Tribal Development Department
    // -------------------------------------------------------------------------
    {
      designationId: "tribal-desig-comm",
      designationName: "Commissioner of Tribal Development",
      departmentId: "mh-gom-tribal-development",
      subDepartmentId: "tribal-sub-commissionerate",
      divisionId: "tribal-div-itdp",
    },
    {
      designationId: "tribal-desig-addl-comm",
      designationName: "Additional Commissioner of Tribal Development (Regional)",
      departmentId: "mh-gom-tribal-development",
      subDepartmentId: "tribal-sub-commissionerate",
      divisionId: "tribal-div-itdp",
    },
    {
      designationId: "tribal-desig-po-itdp",
      designationName: "Project Officer (ITDP) & Assistant Collector",
      departmentId: "mh-gom-tribal-development",
      subDepartmentId: "tribal-sub-commissionerate",
      divisionId: "tribal-div-itdp",
    },
    {
      designationId: "tribal-desig-apo",
      designationName: "Assistant Project Officer (APO)",
      departmentId: "mh-gom-tribal-development",
      subDepartmentId: "tribal-sub-commissionerate",
      divisionId: "tribal-div-itdp",
    },
    {
      designationId: "tribal-desig-headmaster-ashram",
      designationName: "Headmaster, Government Ashram School",
      departmentId: "mh-gom-tribal-development",
      subDepartmentId: "tribal-sub-commissionerate",
      divisionId: "tribal-div-itdp",
    },

    // -------------------------------------------------------------------------
    // 17. Forest Department
    // -------------------------------------------------------------------------
    {
      designationId: "forest-desig-pccf",
      designationName: "Principal Chief Conservator of Forests (HoFF)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-pccf-wildlife",
      designationName: "Principal Chief Conservator of Forests (Wildlife)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-ccf",
      designationName: "Chief Conservator of Forests (CCF)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-dcf",
      designationName: "Deputy Conservator of Forests (DCF)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-acf",
      designationName: "Assistant Conservator of Forests (ACF)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-rfo",
      designationName: "Range Forest Officer (RFO)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-forester",
      designationName: "Forester / Round Officer",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },
    {
      designationId: "forest-desig-guard",
      designationName: "Forest Guard (Vanrakshak)",
      departmentId: "mh-gom-forest",
      subDepartmentId: "forest-sub-pccf",
      divisionId: "forest-div-territorial-circles",
    },

    // -------------------------------------------------------------------------
    // 18. Co-operation, Marketing and Textile Department
    // -------------------------------------------------------------------------
    {
      designationId: "coop-desig-comm-registrar",
      designationName: "Commissioner for Cooperation & Registrar of Cooperative Societies",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-commissionerate",
      divisionId: "coop-div-district-registrars",
    },
    {
      designationId: "coop-desig-djr",
      designationName: "Divisional Joint Registrar of Cooperative Societies (DJR)",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-commissionerate",
      divisionId: "coop-div-district-registrars",
    },
    {
      designationId: "coop-desig-ddr",
      designationName: "District Deputy Registrar (DDR)",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-commissionerate",
      divisionId: "coop-div-district-registrars",
    },
    {
      designationId: "coop-desig-arcs",
      designationName: "Assistant Registrar of Cooperative Societies (ARCS)",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-commissionerate",
      divisionId: "coop-div-district-registrars",
    },
    {
      designationId: "coop-desig-co-1",
      designationName: "Cooperative Officer (Grade I)",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-commissionerate",
      divisionId: "coop-div-district-registrars",
    },
    {
      designationId: "coop-desig-special-auditor",
      designationName: "Special Auditor (Cooperative Societies)",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-commissionerate",
      divisionId: "coop-div-district-registrars",
    },
    {
      designationId: "coop-desig-dir-marketing",
      designationName: "Director of Agricultural Marketing",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-marketing",
      divisionId: "coop-div-apmc-regulation",
    },
    {
      designationId: "coop-desig-dmo",
      designationName: "District Marketing Officer",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-marketing",
      divisionId: "coop-div-apmc-regulation",
    },
    {
      designationId: "coop-desig-dir-textiles",
      designationName: "Director of Textiles",
      departmentId: "mh-gom-cooperation-marketing-textiles",
      subDepartmentId: "coop-sub-textiles",
      divisionId: "coop-div-textile-clusters",
    },

    // -------------------------------------------------------------------------
    // 19. Transport Department
    // -------------------------------------------------------------------------
    {
      designationId: "transport-desig-comm",
      designationName: "Transport Commissioner",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },
    {
      designationId: "transport-desig-addl-comm",
      designationName: "Additional Transport Commissioner",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },
    {
      designationId: "transport-desig-rto",
      designationName: "Regional Transport Officer (RTO)",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },
    {
      designationId: "transport-desig-dy-rto",
      designationName: "Deputy Regional Transport Officer (Dy RTO)",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },
    {
      designationId: "transport-desig-arto",
      designationName: "Assistant Regional Transport Officer (ARTO)",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },
    {
      designationId: "transport-desig-mvi",
      designationName: "Motor Vehicles Inspector (MVI)",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },
    {
      designationId: "transport-desig-amvi",
      designationName: "Assistant Motor Vehicles Inspector (AMVI)",
      departmentId: "mh-gom-transport",
      subDepartmentId: "transport-sub-commissionerate",
      divisionId: "transport-div-rto-offices",
    },

    // -------------------------------------------------------------------------
    // 20. Labour Department
    // -------------------------------------------------------------------------
    {
      designationId: "labour-desig-comm",
      designationName: "Labour Commissioner",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-commissionerate",
      divisionId: "labour-div-enforcement",
    },
    {
      designationId: "labour-desig-addl-comm",
      designationName: "Additional Labour Commissioner",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-commissionerate",
      divisionId: "labour-div-enforcement",
    },
    {
      designationId: "labour-desig-dlc",
      designationName: "Deputy Labour Commissioner (DLC)",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-commissionerate",
      divisionId: "labour-div-enforcement",
    },
    {
      designationId: "labour-desig-alc",
      designationName: "Assistant Labour Commissioner (ALC)",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-commissionerate",
      divisionId: "labour-div-enforcement",
    },
    {
      designationId: "labour-desig-glo",
      designationName: "Government Labour Officer (GLO)",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-commissionerate",
      divisionId: "labour-div-enforcement",
    },
    {
      designationId: "labour-desig-inspector",
      designationName: "Labour Inspector",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-commissionerate",
      divisionId: "labour-div-enforcement",
    },
    {
      designationId: "dish-desig-dir",
      designationName: "Director of Industrial Safety and Health (DISH)",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-dish",
      divisionId: "labour-div-factory-safety",
    },
    {
      designationId: "dish-desig-inspector-factories",
      designationName: "Inspector of Factories",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-dish",
      divisionId: "labour-div-factory-safety",
    },
    {
      designationId: "dish-desig-inspector-boilers",
      designationName: "Inspector of Boilers",
      departmentId: "mh-gom-labour",
      subDepartmentId: "labour-sub-dish",
      divisionId: "labour-div-factory-safety",
    },

    // -------------------------------------------------------------------------
    // 21. Industry, Energy, Labour and Mining Department
    // -------------------------------------------------------------------------
    {
      designationId: "ind-desig-dev-comm",
      designationName: "Development Commissioner (Industries)",
      departmentId: "mh-gom-industry-energy-labour-mining",
      subDepartmentId: "ind-sub-directorate",
      divisionId: "ind-div-dic-offices",
    },
    {
      designationId: "ind-desig-gm-dic",
      designationName: "General Manager, District Industries Center (GM - DIC)",
      departmentId: "mh-gom-industry-energy-labour-mining",
      subDepartmentId: "ind-sub-directorate",
      divisionId: "ind-div-dic-offices",
    },
    {
      designationId: "ind-desig-manager-dic",
      designationName: "Manager (DIC)",
      departmentId: "mh-gom-industry-energy-labour-mining",
      subDepartmentId: "ind-sub-directorate",
      divisionId: "ind-div-dic-offices",
    },
    {
      designationId: "ind-desig-inspector",
      designationName: "Industries Inspector",
      departmentId: "mh-gom-industry-energy-labour-mining",
      subDepartmentId: "ind-sub-directorate",
      divisionId: "ind-div-dic-offices",
    },
    {
      designationId: "ind-desig-dir-mining",
      designationName: "Director of Geology and Mining",
      departmentId: "mh-gom-industry-energy-labour-mining",
      subDepartmentId: "ind-sub-geology-mining",
      divisionId: "ind-div-mining-concessions",
    },
    {
      designationId: "ind-desig-dmo",
      designationName: "District Mining Officer (DMO)",
      departmentId: "mh-gom-industry-energy-labour-mining",
      subDepartmentId: "ind-sub-geology-mining",
      divisionId: "ind-div-mining-concessions",
    },

    // -------------------------------------------------------------------------
    // 22. Energy Department
    // -------------------------------------------------------------------------
    {
      designationId: "energy-desig-cei",
      designationName: "Chief Electrical Inspector",
      departmentId: "mh-gom-energy",
      subDepartmentId: "energy-sub-electrical-inspectorate",
      divisionId: "energy-div-inspection-wing",
    },
    {
      designationId: "energy-desig-ei",
      designationName: "Electrical Inspector",
      departmentId: "mh-gom-energy",
      subDepartmentId: "energy-sub-electrical-inspectorate",
      divisionId: "energy-div-inspection-wing",
    },
    {
      designationId: "energy-desig-aei",
      designationName: "Assistant Electrical Inspector",
      departmentId: "mh-gom-energy",
      subDepartmentId: "energy-sub-electrical-inspectorate",
      divisionId: "energy-div-inspection-wing",
    },

    // -------------------------------------------------------------------------
    // 23. Skills, Employment, Entrepreneurship and Innovation Department (SEEID)
    // -------------------------------------------------------------------------
    {
      designationId: "seeid-desig-dir-dvet",
      designationName: "Director of Vocational Education and Training",
      departmentId: "mh-gom-skill-employment-entrepreneurship-innovation",
      subDepartmentId: "seeid-sub-dvet",
      divisionId: "seeid-div-iti-wing",
    },
    {
      designationId: "seeid-desig-principal-iti",
      designationName: "Principal, Government ITI",
      departmentId: "mh-gom-skill-employment-entrepreneurship-innovation",
      subDepartmentId: "seeid-sub-dvet",
      divisionId: "seeid-div-iti-wing",
    },
    {
      designationId: "seeid-desig-instructor",
      designationName: "Craft Instructor",
      departmentId: "mh-gom-skill-employment-entrepreneurship-innovation",
      subDepartmentId: "seeid-sub-dvet",
      divisionId: "seeid-div-iti-wing",
    },
    {
      designationId: "seeid-desig-comm-skill",
      designationName: "Commissioner, Skill Development & Entrepreneurship",
      departmentId: "mh-gom-skill-employment-entrepreneurship-innovation",
      subDepartmentId: "seeid-sub-mahaswayam",
      divisionId: "seeid-div-emp-guidance",
    },
    {
      designationId: "seeid-desig-asst-dir-emp",
      designationName: "Assistant Director, District Skill & Employment Center",
      departmentId: "mh-gom-skill-employment-entrepreneurship-innovation",
      subDepartmentId: "seeid-sub-mahaswayam",
      divisionId: "seeid-div-emp-guidance",
    },

    // -------------------------------------------------------------------------
    // 24. Housing Department
    // -------------------------------------------------------------------------
    {
      designationId: "housing-desig-chairperson-rera",
      designationName: "Chairperson, MahaRERA",
      departmentId: "mh-gom-housing",
      subDepartmentId: "housing-sub-maharera",
      divisionId: "housing-div-rera-reg",
    },
    {
      designationId: "housing-desig-sec-rera",
      designationName: "Secretary, MahaRERA",
      departmentId: "mh-gom-housing",
      subDepartmentId: "housing-sub-maharera",
      divisionId: "housing-div-rera-reg",
    },
    {
      designationId: "housing-desig-adjudicating-officer",
      designationName: "Adjudicating Officer, MahaRERA",
      departmentId: "mh-gom-housing",
      subDepartmentId: "housing-sub-maharera",
      divisionId: "housing-div-rera-reg",
    },

    // -------------------------------------------------------------------------
    // 25. Persons with disabilities Welfare Department
    // -------------------------------------------------------------------------
    {
      designationId: "disability-desig-comm",
      designationName: "Commissioner for Persons with Disabilities",
      departmentId: "mh-gom-disability-welfare",
      subDepartmentId: "disability-sub-commissionerate",
      divisionId: "disability-div-schemes",
    },
    {
      designationId: "disability-desig-ddwo",
      designationName: "District Disability Welfare Officer (DDWO)",
      departmentId: "mh-gom-disability-welfare",
      subDepartmentId: "disability-sub-commissionerate",
      divisionId: "disability-div-schemes",
    },

    // -------------------------------------------------------------------------
    // 26. Planning Department
    // -------------------------------------------------------------------------
    {
      designationId: "plan-desig-dir-des",
      designationName: "Director of Economics and Statistics",
      departmentId: "mh-gom-planning",
      subDepartmentId: "plan-sub-des",
      divisionId: "plan-div-des-district",
    },
    {
      designationId: "plan-desig-dpo",
      designationName: "District Planning Officer (DPO)",
      departmentId: "mh-gom-planning",
      subDepartmentId: "plan-sub-des",
      divisionId: "plan-div-des-district",
    },

    // -------------------------------------------------------------------------
    // 27. Tourism Department
    // -------------------------------------------------------------------------
    {
      designationId: "tour-desig-dir",
      designationName: "Director of Tourism",
      departmentId: "mh-gom-tourism",
      subDepartmentId: "tour-sub-directorate",
      divisionId: "tour-div-regional",
    },
    {
      designationId: "tour-desig-dy-dir",
      designationName: "Deputy Director of Tourism (Regional)",
      departmentId: "mh-gom-tourism",
      subDepartmentId: "tour-sub-directorate",
      divisionId: "tour-div-regional",
    },
    {
      designationId: "tour-desig-tio",
      designationName: "Tourism Information Officer",
      departmentId: "mh-gom-tourism",
      subDepartmentId: "tour-sub-directorate",
      divisionId: "tour-div-regional",
    },

    // -------------------------------------------------------------------------
    // 28. Environment Department
    // -------------------------------------------------------------------------
    {
      designationId: "env-desig-pr-sec",
      designationName: "Principal Secretary, Environment & Climate Change",
      departmentId: "mh-gom-environment",
      subDepartmentId: "env-sub-directorate",
      divisionId: "env-div-clearances",
    },
    {
      designationId: "env-desig-dir",
      designationName: "Director, Environment and Climate Change",
      departmentId: "mh-gom-environment",
      subDepartmentId: "env-sub-directorate",
      divisionId: "env-div-clearances",
    },
    {
      designationId: "env-desig-mem-sec-seiaa",
      designationName: "Member Secretary, SEIAA / SEAC",
      departmentId: "mh-gom-environment",
      subDepartmentId: "env-sub-directorate",
      divisionId: "env-div-clearances",
    },

    // -------------------------------------------------------------------------
    // 29. Water Supply and Sanitation
    // -------------------------------------------------------------------------
    {
      designationId: "wss-desig-dir-gsda",
      designationName: "Director, Groundwater Surveys & Development Agency",
      departmentId: "mh-gom-water-supply-sanitation",
      subDepartmentId: "wss-sub-gsda",
      divisionId: "wss-div-gsda-district",
    },
    {
      designationId: "wss-desig-sr-geologist",
      designationName: "Senior Geologist, GSDA",
      departmentId: "mh-gom-water-supply-sanitation",
      subDepartmentId: "wss-sub-gsda",
      divisionId: "wss-div-gsda-district",
    },

    // -------------------------------------------------------------------------
    // 30. Minority Development Department
    // -------------------------------------------------------------------------
    {
      designationId: "minority-desig-dir",
      designationName: "Director of Minorities Development",
      departmentId: "mh-gom-minority-development",
      subDepartmentId: "minority-sub-directorate",
      divisionId: "minority-div-schemes",
    },
    {
      designationId: "minority-desig-dmwo",
      designationName: "District Minority Welfare Officer",
      departmentId: "mh-gom-minority-development",
      subDepartmentId: "minority-sub-directorate",
      divisionId: "minority-div-schemes",
    },

    // -------------------------------------------------------------------------
    // 31. Other Backward Bahujan Welfare Department
    // -------------------------------------------------------------------------
    {
      designationId: "obc-desig-dir",
      designationName: "Director, Other Backward Bahujan Welfare",
      departmentId: "mh-gom-other-backward-bahujan-welfare",
      subDepartmentId: "obc-sub-directorate",
      divisionId: "obc-div-hostels",
    },
    {
      designationId: "obc-desig-asst-comm",
      designationName: "Assistant Commissioner / District Officer, OBC Welfare",
      departmentId: "mh-gom-other-backward-bahujan-welfare",
      subDepartmentId: "obc-sub-directorate",
      divisionId: "obc-div-hostels",
    },

    // -------------------------------------------------------------------------
    // 32. Electronics, Information Technology and Artificial Intelligence Department
    // -------------------------------------------------------------------------
    {
      designationId: "it-desig-pr-sec",
      designationName: "Principal Secretary, IT & Artificial Intelligence",
      departmentId: "mh-gom-electronics-information-technology-artificial-intelligence",
      subDepartmentId: "it-sub-dit",
      divisionId: "it-div-egov-cyber",
    },
    {
      designationId: "it-desig-dir",
      designationName: "Director, Directorate of Information Technology",
      departmentId: "mh-gom-electronics-information-technology-artificial-intelligence",
      subDepartmentId: "it-sub-dit",
      divisionId: "it-div-egov-cyber",
    },
    {
      designationId: "it-desig-ciso",
      designationName: "Chief Information Security Officer (CISO)",
      departmentId: "mh-gom-electronics-information-technology-artificial-intelligence",
      subDepartmentId: "it-sub-dit",
      divisionId: "it-div-egov-cyber",
    },

    // -------------------------------------------------------------------------
    // 33. Law and Judiciary Department
    // -------------------------------------------------------------------------
    {
      designationId: "law-desig-charity-comm",
      designationName: "Charity Commissioner, Maharashtra State",
      departmentId: "mh-gom-law-justice",
      subDepartmentId: "law-sub-charity-commissioner",
      divisionId: "law-div-public-trusts",
    },
    {
      designationId: "law-desig-joint-charity-comm",
      designationName: "Joint Charity Commissioner (Divisional)",
      departmentId: "mh-gom-law-justice",
      subDepartmentId: "law-sub-charity-commissioner",
      divisionId: "law-div-public-trusts",
    },
    {
      designationId: "law-desig-asst-charity-comm",
      designationName: "Assistant Charity Commissioner",
      departmentId: "mh-gom-law-justice",
      subDepartmentId: "law-sub-charity-commissioner",
      divisionId: "law-div-public-trusts",
    },
    {
      designationId: "law-desig-reg-firms",
      designationName: "Registrar of Firms, Maharashtra State",
      departmentId: "mh-gom-law-justice",
      subDepartmentId: "law-sub-registrar-firms",
      divisionId: "law-div-firms-reg",
    },

    // -------------------------------------------------------------------------
    // 34. Medical Education and Drug Department
    // -------------------------------------------------------------------------
    {
      designationId: "med-desig-dmer",
      designationName: "Director of Medical Education and Research (DMER)",
      departmentId: "mh-gom-medical-education-drugs",
      subDepartmentId: "med-sub-dmer",
      divisionId: "med-div-teaching-hospitals",
    },
    {
      designationId: "med-desig-dean",
      designationName: "Dean / Principal, Government Medical College",
      departmentId: "mh-gom-medical-education-drugs",
      subDepartmentId: "med-sub-dmer",
      divisionId: "med-div-teaching-hospitals",
    },
    {
      designationId: "med-desig-prof",
      designationName: "Professor & Head of Department",
      departmentId: "mh-gom-medical-education-drugs",
      subDepartmentId: "med-sub-dmer",
      divisionId: "med-div-teaching-hospitals",
    },
    {
      designationId: "med-desig-rmo",
      designationName: "Resident Medical Officer (RMO)",
      departmentId: "mh-gom-medical-education-drugs",
      subDepartmentId: "med-sub-dmer",
      divisionId: "med-div-teaching-hospitals",
    },

    // -------------------------------------------------------------------------
    // 35. Marathi Language Department
    // -------------------------------------------------------------------------
    {
      designationId: "marathi-desig-dir",
      designationName: "Director of Languages (Bhasha Sanchalanalay)",
      departmentId: "mh-gom-marathi-language",
      subDepartmentId: "marathi-sub-languages",
      divisionId: "marathi-div-translation",
    },
    {
      designationId: "marathi-desig-chief-translator",
      designationName: "Chief Translation Officer",
      departmentId: "mh-gom-marathi-language",
      subDepartmentId: "marathi-sub-languages",
      divisionId: "marathi-div-translation",
    },

    // -------------------------------------------------------------------------
    // 36. Soil and water conservation Department
    // -------------------------------------------------------------------------
    {
      designationId: "swc-desig-comm",
      designationName: "Commissioner, Soil and Water Conservation",
      departmentId: "mh-gom-soil-water-conservation",
      subDepartmentId: "swc-sub-commissionerate",
      divisionId: "swc-div-watershed",
    },
    {
      designationId: "swc-desig-dwco",
      designationName: "District Water Conservation Officer (DWCO)",
      departmentId: "mh-gom-soil-water-conservation",
      subDepartmentId: "swc-sub-commissionerate",
      divisionId: "swc-div-watershed",
    },
    {
      designationId: "swc-desig-sdwco",
      designationName: "Sub-Divisional Water Conservation Officer (SDWCO)",
      departmentId: "mh-gom-soil-water-conservation",
      subDepartmentId: "swc-sub-commissionerate",
      divisionId: "swc-div-watershed",
    },

    // -------------------------------------------------------------------------
    // 37. EGS Department
    // -------------------------------------------------------------------------
    {
      designationId: "egs-desig-comm",
      designationName: "Commissioner, Employment Guarantee Scheme",
      departmentId: "mh-gom-employment-guarantee",
      subDepartmentId: "egs-sub-commissionerate",
      divisionId: "egs-div-mgnregs-district",
    },
    {
      designationId: "egs-desig-dy-collector",
      designationName: "Deputy Collector (EGS)",
      departmentId: "mh-gom-employment-guarantee",
      subDepartmentId: "egs-sub-commissionerate",
      divisionId: "egs-div-mgnregs-district",
    },
    {
      designationId: "egs-desig-apo",
      designationName: "Assistant Project Officer (EGS)",
      departmentId: "mh-gom-employment-guarantee",
      subDepartmentId: "egs-sub-commissionerate",
      divisionId: "egs-div-mgnregs-district",
    },

    // -------------------------------------------------------------------------
    // 38. Textile Department
    // -------------------------------------------------------------------------
    {
      designationId: "textile-desig-dir",
      designationName: "Director of Textiles, Maharashtra State",
      departmentId: "mh-gom-textiles",
      subDepartmentId: "textile-sub-directorate",
      divisionId: "textile-div-powerloom",
    },
    {
      designationId: "textile-desig-inspector",
      designationName: "Textile Inspector",
      departmentId: "mh-gom-textiles",
      subDepartmentId: "textile-sub-directorate",
      divisionId: "textile-div-powerloom",
    },

    // -------------------------------------------------------------------------
    // 39. Fishries Development
    // -------------------------------------------------------------------------
    {
      designationId: "fish-desig-comm",
      designationName: "Commissioner / Director of Fisheries",
      departmentId: "mh-gom-fishries-development",
      subDepartmentId: "fish-sub-directorate",
      divisionId: "fish-div-marine-inland",
    },
    {
      designationId: "fish-desig-fdo",
      designationName: "Fisheries Development Officer (FDO)",
      departmentId: "mh-gom-fishries-development",
      subDepartmentId: "fish-sub-directorate",
      divisionId: "fish-div-marine-inland",
    },

    // -------------------------------------------------------------------------
    // 40. Parliamentry Affair Department
    // -------------------------------------------------------------------------
    {
      designationId: "pa-desig-sec",
      designationName: "Secretary, Parliamentary Affairs",
      departmentId: "mh-gom-parliamentary-affairs",
      subDepartmentId: "pa-sub-secretariat",
      divisionId: "pa-div-assembly-liaison",
    },
    {
      designationId: "pa-desig-joint-sec",
      designationName: "Joint Secretary, Parliamentary Affairs",
      departmentId: "mh-gom-parliamentary-affairs",
      subDepartmentId: "pa-sub-secretariat",
      divisionId: "pa-div-assembly-liaison",
    },
    {
      designationId: "pa-desig-section-officer",
      designationName: "Section Officer, Parliamentary Affairs",
      departmentId: "mh-gom-parliamentary-affairs",
      subDepartmentId: "pa-sub-secretariat",
      divisionId: "pa-div-assembly-liaison",
    },

    // -------------------------------------------------------------------------
    // 41. Cultural Department
    // -------------------------------------------------------------------------
    {
      designationId: "cultural-desig-dir",
      designationName: "Director of Cultural Affairs",
      departmentId: "mh-gom-cultural-affairs",
      subDepartmentId: "cultural-sub-directorate",
      divisionId: "cultural-div-drama-theatre",
    },
    {
      designationId: "cultural-desig-officer",
      designationName: "Cultural Officer",
      departmentId: "mh-gom-cultural-affairs",
      subDepartmentId: "cultural-sub-directorate",
      divisionId: "cultural-div-drama-theatre",
    },
  ],
};

export const getVerifiedDesignations = (
  departmentId: string,
  subDepartmentId?: string,
  divisionId?: string,
): OfficerDesignation[] =>
  MAHARASHTRA_GOV_OFFICER_DESIGNATION_REGISTRY_V1.designations.filter((d) => {
    if (d.departmentId !== departmentId) return false;
    if (divisionId) {
      return (
        d.divisionId === divisionId ||
        (!d.divisionId && d.subDepartmentId === subDepartmentId)
      );
    }
    if (subDepartmentId) {
      return d.subDepartmentId === subDepartmentId || !d.subDepartmentId;
    }
    return true;
  });