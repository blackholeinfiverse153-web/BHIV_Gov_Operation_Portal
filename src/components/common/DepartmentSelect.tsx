import {
  MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1,
  type DepartmentRegistry,
} from "../../config/departmentRegistry";

interface DepartmentSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  registry?: DepartmentRegistry;
}

const DepartmentSelect = ({
  value,
  onChange,
  className,
  placeholder = "Select Department",
  registry = MAHARASHTRA_GOV_DEPARTMENT_REGISTRY_V1,
}: DepartmentSelectProps) => (
  <select
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className={className}
  >
    <option value="">{placeholder}</option>
    {registry.departments
      .filter((department) => department.metadata.status === "listed_in_source")
      .map((department) => (
        <option key={department.departmentId} value={department.departmentName}>
          {department.departmentName}
        </option>
      ))}
  </select>
);

export default DepartmentSelect;