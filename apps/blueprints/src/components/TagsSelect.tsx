import { MultiSelect } from "react-multi-select-component";
import { useFbeData } from "../hooks/fbe.hook";
import styled from "@emotion/styled";

const MultiSelectStyled = styled(MultiSelect)`
  color: black;
`;

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
    .filter((key) => !key.startsWith("factorio-logo") && !key.startsWith("crash-site"))
    .map((key) => {
      const item = data.entities[key];
      return { value: item.name, label: item.name.replace(/[_-]/g, " ") };
    });

  return (
    <MultiSelectStyled
      className={className}
      options={TAGS}
      value={value.map((value) => ({ value, label: value.replace(/[_-]/g, " ") }))}
      onChange={(tags: Tag[]) => onChange(tags.map((tag) => tag.value))}
      labelledBy="Select"
      hasSelectAll={false}
    />
  );
};
