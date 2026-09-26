import type {
  Department,
  DepartmentPathSelection,
} from "../../config/departmentRegistry";

interface DepartmentHierarchyFieldsProps {
  department?: Department;
  selection: DepartmentPathSelection;
  onChange: (selection: DepartmentPathSelection) => void;
}

const DepartmentHierarchyFields = ({
  department,
  selection,
  onChange,
}: DepartmentHierarchyFieldsProps) => {
  if (!department) return null;

  const subDepartment = department.subDepartments.find(
    (item) => item.subDepartmentId === selection.subDepartmentId,
  );
  const divisions = department.subDepartments.length
    ? subDepartment?.divisions ?? []
    : department.divisions;
  const division = divisions.find((item) => item.divisionId === selection.divisionId);
  const sections = division?.sections ?? subDepartment?.sections ?? (
    department.subDepartments.length ? [] : department.sections
  );
  const section = sections.find((item) => item.sectionId === selection.sectionId);
  const services = section?.services ?? division?.services ?? subDepartment?.services ?? (
    department.subDepartments.length ? [] : department.services
  );

  const update = (changes: Partial<DepartmentPathSelection>) =>
    onChange({ ...selection, ...changes });

  const selectClassName = "w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <>
      {department.subDepartments.length > 0 ? (
        <select
          aria-label="Sub-department"
          required
          value={selection.subDepartmentId}
          onChange={(event) => update({
            subDepartmentId: event.target.value,
            divisionId: "",
            sectionId: "",
            serviceId: "",
          })}
          className={selectClassName}
        >
          <option value="">Select Sub-department</option>
          {department.subDepartments.map((item) => (
            <option key={item.subDepartmentId} value={item.subDepartmentId}>
              {item.subDepartmentName}
            </option>
          ))}
        </select>
      ) : (
        <select aria-label="Sub-department" disabled value="" className={selectClassName}>
          <option value="">No sub-department available</option>
        </select>
      )}

      {divisions.length > 0 && (
        <select
          aria-label="Division"
          required
          value={selection.divisionId}
          onChange={(event) => update({
            divisionId: event.target.value,
            sectionId: "",
            serviceId: "",
          })}
          className={selectClassName}
        >
          <option value="">Select Division</option>
          {divisions.map((item) => (
            <option key={item.divisionId} value={item.divisionId}>
              {item.divisionName}
            </option>
          ))}
        </select>
      )}

      {sections.length > 0 && (
        <select
          aria-label="Section or Unit"
          required
          value={selection.sectionId}
          onChange={(event) => update({
            sectionId: event.target.value,
            serviceId: "",
          })}
          className={selectClassName}
        >
          <option value="">Select Section or Unit</option>
          {sections.map((item) => (
            <option key={item.sectionId} value={item.sectionId}>
              {item.sectionName}
            </option>
          ))}
        </select>
      )}

      {services.length > 0 && (
        <select
          aria-label="Service or Function"
          required
          value={selection.serviceId}
          onChange={(event) => update({ serviceId: event.target.value })}
          className={selectClassName}
        >
          <option value="">Select Service or Function</option>
          {services.map((item) => (
            <option key={item.serviceId} value={item.serviceId}>
              {item.serviceName}
            </option>
          ))}
        </select>
      )}

    </>
  );
};

export default DepartmentHierarchyFields;