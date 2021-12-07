import { MultiSelect } from "react-multi-select-component";
import styled from "@emotion/styled";

type ISelectProps = Parameters<typeof MultiSelect>[0];

interface Tag {
  value: string;
  label: string;
}

interface SelectProps extends Omit<ISelectProps, "options" | "value" | "labelledBy" | "onChange"> {
  options: Array<string | { value: string; label: string }>;
  value: string[];
  labelledBy?: string;
  onChange: (tags: string[]) => void;
}

const StyledSelect = styled(MultiSelect)`
  color: black;
  &.rmsc {
    .dropdown-container {
      outline: none;
      border: none;

      &:hover .dropdown-heading,
      &:focus .dropdown-heading,
      &[aria-expanded="true"] .dropdown-heading {
        cursor: pointer;
        color: #000;
        text-decoration: none;
        outline: 0;
        box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000, inset 0 9px 2px -8px #fff,
          inset 0 8px 4px -8px #000, inset 0 -8px 4px -8px #000, inset 0 -9px 2px -8px #432400,
          0 0 4px 0 #000, inset 0 0 4px 2px #f9b44b;
        background-color: #e39827;
        filter: drop-shadow(0 0 2px #f9b44b);
      }

      .dropdown-heading {
        border: none;
        border-radius: 0;
        background-color: #8e8e8e;
        box-shadow: inset 8px 0 4px -8px #000, inset -8px 0 4px -8px #000,
          inset 0 10px 2px -8px #e3e3e3, inset 0 10px 2px -8px #282828, inset 0 -9px 2px -8px #000,
          0 0 4px 0 #000;

        .gray {
          color: #000 !important;
        }
      }
    }

    .panel-content {
      border-radius: 0 !important;
    }
  }
`;

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  labelledBy = "Select",
  className,
  ...props
}) => {
  const TAGS = options.map((tag) => {
    return typeof tag === "string" ? { value: tag, label: tag.replace(/[_-]/g, " ") } : tag;
  });

  return (
    <StyledSelect
      className={className}
      options={TAGS}
      value={value.map((value) => ({ value, label: value.replace(/[_-]/g, " ") }))}
      onChange={(tags: Tag[]) => onChange(tags.map((tag) => tag.value))}
      labelledBy={labelledBy}
      hasSelectAll={false}
      {...props}
    />
  );
};
