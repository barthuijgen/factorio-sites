import parser, { Tag } from "bbcode-to-react";
import { FactorioIcon } from "./FactorioIcon";

class ImgTag extends Tag {
  toReact() {
    const content = this.getContent(true);
    const img = (this.params as any).img;
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
    const item = (this.params as any).item;
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
    const signal = (this.params as any)["virtual-signal"];
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

parser.registerTag("img", ImgTag as any);
parser.registerTag("item", ItemTag as any);
parser.registerTag("virtual-signal", VirtualSignalTag as any);

export const BBCode: React.FC<{ code: string }> = ({ code }) => {
  return <>{parser.toReact(code)}</>;
};
