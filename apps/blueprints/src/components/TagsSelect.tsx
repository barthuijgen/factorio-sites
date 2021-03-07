import MultiSelect from "react-multi-select-component";
import { useFbeData } from "../hooks/fbe.hook";

interface Tag {
  value: string;
  label: string;
}

interface TagsSelectProps {
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export const TagsSelect: React.FC<TagsSelectProps> = ({ value, onChange, className }) => {
  const data = useFbeData();

  if (!data) return null;

  const TAGS = Object.keys(data.entities)
    .filter((key) => !key.startsWith("factorio_logo") && !key.startsWith("crash_site"))
    .map((key) => {
      const item = data.entities[key];
      return { value: item.name, label: item.name.replace(/_/g, " ") };
    });

  return (
    <MultiSelect
      css={{ color: "black" }}
      className={className}
      options={TAGS}
      value={value.map((value) => ({ value, label: value.replace(/_/g, " ") }))}
      onChange={(tags: Tag[]) => onChange(tags.map((tag) => tag.value))}
      labelledBy="Select"
      hasSelectAll={false}
    />
  );
};
