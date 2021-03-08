import { css } from "@emotion/react";
import Link from "next/link";
import BBCode from "bbcode-to-react";
import { FactorioIcon } from "./FactorioIcon";
import { BlueprintObjectDataWithId } from "@factorio-sites/web-utils";

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
  data: BlueprintObjectDataWithId;
  base_url: string;
  selected_id: string;
}

export const BookChildTree: React.FC<BookChildTreeProps> = ({ data, base_url, selected_id }) => {
  if (data.blueprint_book) {
    return (
      <div css={componentStyles}>
        <div>
          <Link href={`${base_url}?selected=${data.blueprint_book.id}&type=book`}>
            <a className={"book" + (selected_id === data.blueprint_book.id ? " active" : "")}>
              <FactorioIcon type="item" icon="blueprint-book" size={20} />
              {data.blueprint_book.icons &&
                data.blueprint_book.icons.map((icon, index) => (
                  <FactorioIcon
                    key={index}
                    type={icon.signal.type}
                    icon={icon.signal.name}
                    size={20}
                  />
                ))}
              <span className="label">{BBCode.toReact(data.blueprint_book.label || "")}</span>
            </a>
          </Link>
          <div css={{ marginLeft: `20px` }}>
            {data.blueprint_book.blueprints.map((bpData) => {
              return bpData.blueprint ? (
                <Link
                  key={bpData.blueprint.id}
                  href={`${base_url}?selected=${bpData.blueprint.id}`}
                >
                  <a
                    className={"blueprint" + (selected_id === bpData.blueprint.id ? " active" : "")}
                  >
                    {bpData.blueprint.icons.map((icon, index) => (
                      <FactorioIcon
                        key={index}
                        type={icon.signal.type}
                        icon={icon.signal.name}
                        size={20}
                      />
                    ))}
                    <span className="label"> {BBCode.toReact(bpData.blueprint.label)}</span>
                  </a>
                </Link>
              ) : bpData.blueprint_book ? (
                <BookChildTree
                  key={bpData.blueprint_book.id}
                  data={bpData}
                  base_url={base_url}
                  selected_id={selected_id}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
