import MultiSelect from "react-multi-select-component";

interface Tag {
  value: string;
  label: string;
}

interface SelectProps {
  options: string[];
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
  const TAGS = options.map((key) => {
    return { value: key, label: key.replace(/[_-]/g, " ") };
  });

  return (
    <MultiSelect
      css={{ color: "black" }}
      className={className}
      options={TAGS}
      value={value.map((value) => ({ value, label: value.replace(/[_-]/g, " ") }))}
      onChange={(tags: Tag[]) => onChange(tags.map((tag) => tag.value))}
      labelledBy="Select"
      hasSelectAll={false}
    />
  );
};
