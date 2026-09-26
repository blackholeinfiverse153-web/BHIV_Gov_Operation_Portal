import { describe, expect, it } from "vitest";
import {
  MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1,
  validateDepartmentPath,
  type DepartmentPathSelection,
} from "../../src/config/departmentRegistry";
import { getVerifiedDesignations } from "../../src/config/officerDesignationRegistry";

describe("Maharashtra government department registry", () => {
  it("contains officially listed Maharashtra Government departments", () => {
    expect(MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.length).toBeGreaterThanOrEqual(18);
    const departmentNames = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.map(
      (department) => department.departmentName,
    );
    expect(departmentNames).toContain("Food, Civil Supply and Consumer Protection Department");
    expect(departmentNames).toContain("Revenue Department");
    expect(departmentNames).toContain("Home Department");
    expect(departmentNames).toContain("Public Health Department");
    expect(departmentNames).toContain("Agriculture Department");
  });

  it("provides verified sub-departments, divisions, and services for departments", () => {
    const fcsDept = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentId === "mh-gom-food-civil-supplies-consumer-protection",
    );
    expect(fcsDept).toBeDefined();
    expect(fcsDept!.subDepartments.length).toBeGreaterThan(0);

    const subDeptNames = fcsDept!.subDepartments.map((s) => s.subDepartmentName);
    expect(subDeptNames).toContain(
      "Controller of Rationing and Directorate of Civil Supplies, Mumbai",
    );

    const rationingSub = fcsDept!.subDepartments.find(
      (s) => s.subDepartmentId === "fcs-sub-controller-rationing",
    );
    expect(rationingSub).toBeDefined();
    expect(rationingSub!.divisions.length).toBeGreaterThan(0);

    const division = rationingSub!.divisions[0];
    expect(division.services.length).toBeGreaterThan(0);
  });

  it("keeps associated boards and corporations separate from sub-departments", () => {
    for (const department of MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments) {
      if (department.associatedOrganisations && department.associatedOrganisations.length > 0) {
        for (const assoc of department.associatedOrganisations) {
          expect(assoc.name).toBeDefined();
          expect(["board", "corporation", "undertaking", "company", "society"]).toContain(
            assoc.organisationType,
          );
          // Confirm no associated organization is placed as a sub-department
          const subNames = department.subDepartments.map((s) => s.subDepartmentName);
          expect(subNames).not.toContain(assoc.name);
        }
      }
    }
  });

  it("filters designations by department, sub-department, and division", () => {
    const deptId = "mh-gom-food-civil-supplies-consumer-protection";
    const subDeptId = "fcs-sub-controller-rationing";
    const divId = "fcs-div-cr-mumbai-city";

    const deptDesignations = getVerifiedDesignations(deptId);
    expect(deptDesignations.length).toBeGreaterThan(0);

    const divDesignations = getVerifiedDesignations(deptId, subDeptId, divId);
    expect(divDesignations.length).toBeGreaterThan(0);
    expect(
      divDesignations.map((d) => d.designationName),
    ).toContain("Controller of Rationing & Director of Civil Supplies");

    // Must never return designations from another department
    for (const desig of divDesignations) {
      expect(desig.departmentId).toBe(deptId);
    }
  });

  it("validates department paths correctly", () => {
    const department = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1.departments.find(
      (d) => d.departmentId === "mh-gom-food-civil-supplies-consumer-protection",
    )!;

    const validSelection: DepartmentPathSelection = {
      subDepartmentId: "fcs-sub-controller-rationing",
      divisionId: "fcs-div-cr-mumbai-city",
      sectionId: "",
      serviceId: "fcs-svc-new-rc",
    };

    expect(validateDepartmentPath(undefined, validSelection)).toBe("Select a department.");
    expect(validateDepartmentPath(department, validSelection)).toBeNull();

    expect(
      validateDepartmentPath(department, {
        ...validSelection,
        subDepartmentId: "invalid-sub-dept",
      }),
    ).toContain("does not belong");

    expect(
      validateDepartmentPath(department, {
        ...validSelection,
        divisionId: "invalid-division",
      }),
    ).toContain("does not belong");

    expect(
      validateDepartmentPath(department, {
        ...validSelection,
        serviceId: "invalid-service",
      }),
    ).toContain("does not belong");
  });
});