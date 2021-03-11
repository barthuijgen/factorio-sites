import MultiSelect from "react-multi-select-component";

interface Tag {
  value: string;
  label: string;
}

interface SelectProps {
  options: Array<string | { value: string; label: string }>;
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
  const TAGS = options.map((tag) => {
    return typeof tag === "string" ? { value: tag, label: tag.replace(/[_-]/g, " ") } : tag;
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
