/** @jsx jsx */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { jsx, css } from "@emotion/react";
import Link from "next/link";
import BBCode from "bbcode-to-react";
import { BlueprintBookEntry } from "@factorio-sites/database";

const componentStyles = css`
  .blueprint,
  .book {
    display: block;
    color: white;
    padding: 4px 0;
    &:hover {
      background: #636363;
    }
  }
  .active {
    background: #41a73a;
    color: #000;
  }
`;

interface BookChildTreeProps {
  child_tree: BlueprintBookEntry["child_tree"];
  base_url: string;
  selected_id: string;
}

export const BookChildTree: React.FC<BookChildTreeProps> = ({
  child_tree,
  base_url,
  selected_id,
}) => {
  return (
    <div css={componentStyles}>
      {child_tree.map((bp, key) => {
        return bp.type === "blueprint" ? (
          <Link key={bp.id} href={`${base_url}?selected=${bp.id}`}>
            <a className={"blueprint" + (selected_id === bp.id ? " active" : "")}>
              {BBCode.toReact(bp.name)}
            </a>
          </Link>
        ) : (
          <div key={key}>
            <Link key={bp.id} href={`${base_url}?selected=${bp.id}&type=book`}>
              <a className={"book" + (selected_id === bp.id ? " active" : "")}>
                [book] {BBCode.toReact(bp.name)}
              </a>
            </Link>
            <div css={{ marginLeft: `20px` }}>
              <BookChildTree
                child_tree={bp.children}
                base_url={base_url}
                selected_id={selected_id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
