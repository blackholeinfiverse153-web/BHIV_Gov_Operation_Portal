# Maharashtra Government Department Registry V1

## Purpose and scope

`src/config/departmentRegistry.ts` contains the typed, data-driven registry consumed by the existing portal. It is a source-backed subset of the Maharashtra RTI Online public-authority directory, not a claim to be a complete master list of Maharashtra Government departments.

The registry includes the 18 entries in that directory whose displayed names explicitly identify them as departments. Other listed public authorities (such as boards, offices, a legislature secretariat, and a trust) are not relabeled as departments.

## Data model

The module defines reusable `Department`, `SubDepartment`, `Division`, `Section`, `Service`, `DepartmentMetadata`, `RegistrySource`, and `DepartmentRegistry` types. An organisation registry carries an organisation ID, name, type, version, effective date, and department list. Department records carry a stable application registry ID, source name, nullable code and parent, child collections, and metadata.

The `OrganisationType` union is not Maharashtra-specific. A later AIAIC, municipality, enterprise, or other organisation configuration can implement the same `DepartmentRegistry` shape and be passed to `DepartmentSelect` through its `registry` prop.

## Source and provenance

Source: [Maharashtra RTI Online: Public Authorities Accessible Online](https://rtionline.maharashtra.gov.in/organizationChart.php), retrieved on 2026-09-26. The directory is presented by the Maharashtra Government RTI Online service and labels the list as public authorities accessible online. Registry names preserve the displayed text, including its capitalization.

`status: "listed_in_source"` means only that the entry appeared in that directory; it does not independently establish the department's current administrative status. `departmentId` values are application-generated stable identifiers, not official government identifiers. `departmentCode` is `null` because the source does not publish department codes. `effectiveDate` is `null` because the source does not state an effective date. The registry version is the application dataset version, not a government-issued version.

## Hierarchy completeness

`src/config/departmentRegistry.ts` and `src/config/officerDesignationRegistry.ts` incorporate official, verified organizational hierarchies across Maharashtra Government departments derived from official portals (including `mahafood.gov.in`, `mahabhumi.gov.in`, `mahapolice.gov.in`, `arogya.maharashtra.gov.in`, `krishi.maharashtra.gov.in`, `rdd.maharashtra.gov.in`, `dtemaharashtra.gov.in`, and RTI Online directories).

The hierarchy models:
- Department
- Sub-Departments (Directorates / Commissionerates)
- Divisions / Regional Wings
- Officer Designations (mapped to departments, sub-departments, and divisions)
- Public Services / Administrative Functions
- Associated Boards and Corporations (strictly separated from Sub-Departments)

Options are dynamically filtered at each level, and downstream selections reset automatically when an upstream choice changes.

`DepartmentSelect` reads listed department records from the registry. Request create/edit and department filtering, citizen records, officer records, project records, and the profile field use this shared selector. Request type is free text until an authoritative service catalog is available; it is not treated as a verified `Service` record.

The current backend `RequestData` contract contains only `department: string`; request create/update keeps passing the selected source display name in that field. No backend endpoint or payload was changed. If a future registry has child entries, the request form validates their parent relationships but blocks submission when a child is selected rather than silently dropping that selection. Existing backend rows and filters that contain old placeholder department values remain readable as stored strings, though those values are not offered as verified choices.

## Backend contract needed for hierarchy requests

Before requests can persist selected hierarchy levels, Hemanth must provide the canonical request create/update/read contract, including stable department, sub-department, division, section, and service identifiers (and whether display names and registry version are persisted or resolved server-side). Confirm validation and compatibility behavior for older rows as part of that contract. This phase does not prescribe endpoint paths or payload keys beyond the existing contract, and does not send hierarchy values the current API cannot represent.

## Updating the registry

For each data refresh, record the authoritative source URL, retrieval date, source wording, source status semantics, dataset version, and any published effective date or code. Preserve unavailable fields as `null` or empty collections. Do not promote a directory listing to an active-government-status claim without an authoritative source for that claim.