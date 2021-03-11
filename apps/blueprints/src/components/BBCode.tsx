import parser, { Tag } from "bbcode-to-react";
import { FactorioIcon } from "./FactorioIcon";

class ImgTag extends Tag {
  toReact() {
    const content = this.getContent(true);
    const img = (this.params as Record<string, string>).img;
    const [type, item] = img.split("/");
    if (type === "item") {
      return (
        <>
          <FactorioIcon type={type} icon={item} size={20} />
          {content && <span>{content}</span>}
        </>
      );
    }
    return null;
  }
}

class ItemTag extends Tag {
  toReact() {
    const content = this.getContent(true);
    const item = (this.params as Record<string, string>).item;
    if (item) {
      return (
        <>
          <FactorioIcon type="item" icon={item} size={20} />
          {content && <span>{content}</span>}
        </>
      );
    }
    return null;
  }
}

class VirtualSignalTag extends Tag {
  toReact() {
    const signal = (this.params as Record<string, string>)["virtual-signal"];
    const content = this.getContent(true);
    if (signal) {
      return (
        <>
          <FactorioIcon type="signal" icon={signal} size={20} />
          {content && <span>{content}</span>}
        </>
      );
    }
    return null;
  }
}

parser.registerTag("img", ImgTag as typeof Tag);
parser.registerTag("item", ItemTag as typeof Tag);
parser.registerTag("virtual-signal", VirtualSignalTag as typeof Tag);

export const BBCode: React.FC<{ code: string }> = ({ code }) => {
  return <>{parser.toReact(code)}</>;
};
