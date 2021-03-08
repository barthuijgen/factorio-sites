import { css } from "@emotion/react";
import Link from "next/link";
import BBCode from "bbcode-to-react";
import { FactorioIcon } from "./FactorioIcon";
import { ChildTreeBlueprintBookEnriched } from "@factorio-sites/web-utils";

const componentStyles = css`
  .blueprint,
  .book {
    display: flex;
    align-items: center;
    color: white;
    padding: 4px 0;
    &:hover {
      background: #636363;
    }
  }
  .label {
    margin-left: 5px;
  }
  .active {
    background: #41a73a;
    color: #000;
  }
`;

interface BookChildTreeProps {
  blueprint_book: ChildTreeBlueprintBookEnriched;
  base_url: string;
  selected_id: string;
}

export const BookChildTree: React.FC<BookChildTreeProps> = ({
  blueprint_book,
  base_url,
  selected_id,
}) => {
  return (
    <div css={componentStyles}>
      <div>
        <Link href={`${base_url}?selected=${blueprint_book.id}&type=book`}>
          <a className={"book" + (selected_id === blueprint_book.id ? " active" : "")}>
            <FactorioIcon type="item" icon="blueprint-book" size={20} />
            {blueprint_book.icons &&
              blueprint_book.icons.map((icon, index) => (
                <FactorioIcon
                  key={index}
                  type={icon.signal.type}
                  icon={icon.signal.name}
                  size={20}
                />
              ))}
            <span className="label">{BBCode.toReact(blueprint_book.name || "")}</span>
          </a>
        </Link>
        <div css={{ marginLeft: `20px` }}>
          {blueprint_book.children.map((child) => {
            return child.type === "blueprint" ? (
              <Link key={child.id} href={`${base_url}?selected=${child.id}`}>
                <a className={"blueprint" + (selected_id === child.id ? " active" : "")}>
                  {child.icons.map((icon, index) => (
                    <FactorioIcon
                      key={index}
                      type={icon.signal.type}
                      icon={icon.signal.name}
                      size={20}
                    />
                  ))}
                  <span className="label"> {BBCode.toReact(child.name || "")}</span>
                </a>
              </Link>
            ) : child.type === "blueprint_book" ? (
              <BookChildTree
                key={child.id}
                blueprint_book={child}
                base_url={base_url}
                selected_id={selected_id}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};
