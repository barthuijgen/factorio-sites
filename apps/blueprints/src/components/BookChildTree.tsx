import { memo } from "react";
import { css } from "@emotion/react";
import Link, { LinkProps } from "next/link";
import { FactorioIcon } from "./FactorioIcon";
import { FactorioCode } from "./FactorioCode";
import { BlueprintBookData, BlueprintStringData, ChildTree, Icon } from "@factorio-sites/types";

const componentStyles = css`
  overflow: hidden;
  position: relative;

  .child-tree-wrapper {
    height: 480px;
    overflow: auto;
  }

  .blueprint,
  .book {
    display: flex;
    align-items: center;
    color: white;
    padding: 4px 0;
    &:hover {
      cursor: pointer;
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

interface BlueprintItem {
  type: "blueprint";
  id?: string;
  name: string;
  icons: Icon[];
}

export interface BlueprintBookItem {
  type: "blueprint_book";
  id?: string;
  name: string;
  icons: Icon[];
  children: TreeItem[];
}

type TreeItem = BlueprintItem | BlueprintBookItem;

interface BookChildTreeProps {
  book_item: BlueprintBookItem;
  base_url?: string;
  selected_id: string | null;
}

const OptionalLink: React.FC<LinkProps & { include: boolean; className?: string }> = ({
  include,
  children,
  className,
  ...props
}) => {
  return include ? (
    <Link {...props}>
      <a className={className}>{children}</a>
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
};

const InnerBookChildTree: React.FC<BookChildTreeProps> = ({ book_item, base_url, selected_id }) => {
  return (
    <>
      <OptionalLink
        include={Boolean(base_url && book_item.id)}
        href={`${base_url}?selected=${book_item.id}&type=book`}
        className={"book" + (selected_id === book_item.id ? " active" : "")}
        replace
        scroll={false}
      >
        <FactorioIcon type="item" icon="blueprint-book" size={20} />
        {book_item.icons &&
          book_item.icons.map((icon, index) => (
            <FactorioIcon key={index} type={icon.signal.type} icon={icon.signal.name} size={20} />
          ))}
        <span className="label">
          <FactorioCode code={book_item.name || ""} />
        </span>
      </OptionalLink>
      <div css={{ marginLeft: `20px` }}>
        {book_item.children.map((child, index) => {
          return child.type === "blueprint" ? (
            <OptionalLink
              include={Boolean(base_url && child.id)}
              key={child.id || index}
              href={`${base_url}?selected=${child.id}`}
              className={"blueprint" + (selected_id === child.id ? " active" : "")}
              replace
              scroll={false}
            >
              {child.icons &&
                child.icons.map((icon, index) => (
                  <FactorioIcon
                    key={index}
                    type={icon.signal.type}
                    icon={icon.signal.name}
                    size={20}
                  />
                ))}
              <span className="label">
                <FactorioCode code={child.name || ""} />
              </span>
            </OptionalLink>
          ) : child.type === "blueprint_book" ? (
            <InnerBookChildTree
              key={child.id || index}
              book_item={child}
              base_url={base_url}
              selected_id={selected_id}
            />
          ) : null;
        })}
      </div>
    </>
  );
};

export const BookChildTree: React.FC<BookChildTreeProps> = memo(
  ({ book_item, base_url, selected_id }) => {
    return (
      <div css={componentStyles}>
        <div className="child-tree-wrapper ">
          <InnerBookChildTree book_item={book_item} base_url={base_url} selected_id={selected_id} />
        </div>
      </div>
    );
  }
);

const convertBlueprintDataToTree = (data: BlueprintStringData): TreeItem | null => {
  if (data.blueprint_book) {
    return convertBlueprintBookDataToTree(data.blueprint_book);
  }
  if (data.blueprint) {
    return {
      type: "blueprint",
      name: data.blueprint.label || "",
      icons: data.blueprint.icons,
    };
  }

  // console.warn("convertBlueprintBookDataToTree called without a blueprint or blueprint book", data);
  return null;
};

export const convertBlueprintBookDataToTree = (data: BlueprintBookData): BlueprintBookItem => {
  return {
    type: "blueprint_book",
    name: data.label,
    icons: data.icons || [],
    children: data.blueprints
      .map(convertBlueprintDataToTree)
      .filter((x) => x !== null) as TreeItem[],
  };
};

export const mergeChildTreeWithTreeItem = (
  tree_item: TreeItem,
  id: string,
  child_tree?: ChildTree
): TreeItem => {
  if (tree_item.type === "blueprint") {
    return { ...tree_item, id };
  }

  return {
    ...tree_item,
    id,
    children: tree_item.children
      .map((child, index) => {
        const child_tree_item = child_tree?.[index];
        if (child_tree_item?.type === "blueprint_book") {
          return mergeChildTreeWithTreeItem(child, child_tree_item.id, child_tree_item.children);
        } else if (child_tree_item?.type === "blueprint") {
          return mergeChildTreeWithTreeItem(child, child_tree_item.id);
        }

        // console.warn("mergeChildTreeWithTreeItem called with invalid child_tree", child_tree_item);
        return null;
      })
      .filter((x) => x !== null) as TreeItem[],
  };
};
