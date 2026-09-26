import { describe, expect, it } from "vitest";
import {
  MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1,
} from "../../src/config/departmentRegistry";
import { getVerifiedDesignations } from "../../src/config/officerDesignationRegistry";

describe("Officer Management Dependent Selection Flow", () => {
  it("Test 1: Food, Civil Supply and Consumer Protection Department loads verified hierarchy", () => {
    const dept = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentName === "Food, Civil Supply and Consumer Protection Department",
    );
    expect(dept).toBeDefined();

    // 1. Sub-Departments
    const subDepts = dept!.subDepartments;
    expect(subDepts.length).toBeGreaterThan(0);
    const subDeptNames = subDepts.map((s) => s.subDepartmentName);
    expect(subDeptNames).toContain("Controller of Rationing and Directorate of Civil Supplies, Mumbai");
    expect(subDeptNames).toContain("Office of the Supply Commissioner, Maharashtra State");
    expect(subDeptNames).toContain("Legal Metrology Organisation (Weights and Measures)");

    // 2. Select Sub-Department -> Divisions
    const controllerSub = subDepts.find((s) => s.subDepartmentId === "fcs-sub-controller-rationing")!;
    expect(controllerSub).toBeDefined();
    expect(controllerSub.divisions.length).toBeGreaterThan(0);
    const divNames = controllerSub.divisions.map((d) => d.divisionName);
    expect(divNames).toContain("Mumbai City Rationing Division");
    expect(divNames).toContain("Mumbai Suburban & Thane Region Division");

    // 3. Select Division -> Designations and Services
    const mumbaiCityDiv = controllerSub.divisions.find((d) => d.divisionId === "fcs-div-cr-mumbai-city")!;
    expect(mumbaiCityDiv).toBeDefined();

    // Services
    const serviceNames = mumbaiCityDiv.services.map((s) => s.serviceName);
    expect(serviceNames).toContain("New Ration Card Issuance");
    expect(serviceNames).toContain("Member Addition in Ration Card");

    // Designations
    const designations = getVerifiedDesignations(
      dept!.departmentId,
      controllerSub.subDepartmentId,
      mumbaiCityDiv.divisionId,
    );
    expect(designations.length).toBeGreaterThan(0);
    const designationNames = designations.map((d) => d.designationName);
    expect(designationNames).toContain("Controller of Rationing & Director of Civil Supplies");
    expect(designationNames).toContain("Rationing Officer");
    expect(designationNames).not.toContain("District Collector & District Magistrate"); // Must not show from other department
  });

  it("Test 2: Revenue Department loads verified hierarchy and differs from Food & Civil Supplies", () => {
    const dept = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentName === "Revenue Department",
    );
    expect(dept).toBeDefined();

    // 1. Sub-Departments
    const subDepts = dept!.subDepartments;
    expect(subDepts.length).toBeGreaterThan(0);
    const subDeptNames = subDepts.map((s) => s.subDepartmentName);
    expect(subDeptNames).toContain("Land Revenue Administration & Collectorates");
    expect(subDeptNames).toContain("Settlement Commissioner and Directorate of Land Records, Pune");
    expect(subDeptNames).toContain("Inspector General of Registration and Controller of Stamps (IGR Maharashtra)");

    // 2. Select Sub-Department -> Divisions
    const landRevSub = subDepts.find((s) => s.subDepartmentId === "rev-sub-land-revenue")!;
    expect(landRevSub).toBeDefined();
    const divNames = landRevSub.divisions.map((d) => d.divisionName);
    expect(divNames).toContain("Konkan Revenue Division (Mumbai, Thane, Palghar, Raigad, Ratnagiri, Sindhudurg)");
    expect(divNames).toContain("Pune Revenue Division (Pune, Satara, Sangli, Solapur, Kolhapur)");

    // 3. Select Division -> Designations and Services
    const konkanDiv = landRevSub.divisions.find((d) => d.divisionId === "rev-div-konkan")!;
    expect(konkanDiv).toBeDefined();

    // Services
    const serviceNames = konkanDiv.services.map((s) => s.serviceName);
    expect(serviceNames).toContain("Issuance of 7/12 (Saat-Baara) Extract");
    expect(serviceNames).toContain("Mutation Entry (Ferfar) Certification");
    expect(serviceNames).not.toContain("New Ration Card Issuance"); // Must not show FCS service

    // Designations
    const designations = getVerifiedDesignations(
      dept!.departmentId,
      landRevSub.subDepartmentId,
      konkanDiv.divisionId,
    );
    expect(designations.length).toBeGreaterThan(0);
    const designationNames = designations.map((d) => d.designationName);
    expect(designationNames).toContain("Divisional Commissioner");
    expect(designationNames).toContain("District Collector & District Magistrate");
    expect(designationNames).toContain("Tahsildar & Executive Magistrate");
    expect(designationNames).toContain("Talathi");
    expect(designationNames).not.toContain("Controller of Rationing & Director of Civil Supplies");
  });

  it("Test 3: Home Department loads verified hierarchy and differs from other departments", () => {
    const dept = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentName === "Home Department",
    );
    expect(dept).toBeDefined();

    // 1. Sub-Departments
    const subDepts = dept!.subDepartments;
    expect(subDepts.length).toBeGreaterThan(0);
    const subDeptNames = subDepts.map((s) => s.subDepartmentName);
    expect(subDeptNames).toContain("Maharashtra State Police (Director General of Police, Mumbai)");
    expect(subDeptNames).toContain("Maharashtra Prisons and Correctional Services");
    expect(subDeptNames).toContain("Directorate of Prosecution, Maharashtra");

    // 2. Select Sub-Department -> Divisions
    const policeSub = subDepts.find((s) => s.subDepartmentId === "home-sub-police-headquarters")!;
    expect(policeSub).toBeDefined();
    const divNames = policeSub.divisions.map((d) => d.divisionName);
    expect(divNames).toContain("Mumbai Police Commissionerate");
    expect(divNames).toContain("Divisional Ranges & District Police Establishments");

    // 3. Select Division -> Designations and Services
    const mumbaiPoliceDiv = policeSub.divisions.find((d) => d.divisionId === "home-div-mumbai-police")!;
    expect(mumbaiPoliceDiv).toBeDefined();

    // Services
    const serviceNames = mumbaiPoliceDiv.services.map((s) => s.serviceName);
    expect(serviceNames).toContain("Police Clearance Certificate (PCC) for Overseas Employment");
    expect(serviceNames).toContain("Tenant & Domestic Help Police Verification");

    // Designations
    const designations = getVerifiedDesignations(
      dept!.departmentId,
      policeSub.subDepartmentId,
      mumbaiPoliceDiv.divisionId,
    );
    expect(designations.length).toBeGreaterThan(0);
    const designationNames = designations.map((d) => d.designationName);
    expect(designationNames).toContain("Director General of Police (DGP)");
    expect(designationNames).toContain("Commissioner of Police (CP)");
    expect(designationNames).toContain("Deputy Commissioner of Police (DCP)");
    expect(designationNames).toContain("Police Inspector (PI)");
    expect(designationNames).not.toContain("Talathi");
  });

  it("Test 4: Changing Department resets all child options and never leaks options between departments", () => {
    const fcsDept = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentName === "Food, Civil Supply and Consumer Protection Department",
    )!;
    const revDept = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentName === "Revenue Department",
    )!;

    const fcsSubIds = fcsDept.subDepartments.map((s) => s.subDepartmentId);
    const revSubIds = revDept.subDepartments.map((s) => s.subDepartmentId);

    // Overlap check
    const intersection = fcsSubIds.filter((id) => revSubIds.includes(id));
    expect(intersection).toHaveLength(0);

    // Designation check
    const fcsDesignations = getVerifiedDesignations(fcsDept.departmentId);
    const revDesignations = getVerifiedDesignations(revDept.departmentId);

    const fcsNames = fcsDesignations.map((d) => d.designationName);
    const revNames = revDesignations.map((d) => d.designationName);

    // No cross-contamination
    expect(fcsNames).not.toContain("District Collector & District Magistrate");
    expect(revNames).not.toContain("Controller of Rationing & Director of Civil Supplies");
  });
});
