import React, { useMemo, useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { MdCheck, MdClose } from "react-icons/md";

const SUCCESS_ICON_DURATION = 2000;

export const CopyButton: React.FC<
  Omit<ButtonProps, "children"> & { content: string; label?: string }
> = ({ content, label, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState<"red" | "green" | null>(null);

  const iconProps = useMemo(() => {
    if (icon === "green") {
      return {
        colorScheme: "green",
        leftIcon: <MdCheck />,
      };
    } else if (icon === "red") {
      return {
        colorScheme: "red",
        leftIcon: <MdClose />,
      };
    } else {
      return { colorScheme: "green" };
    }
  }, [icon]);

  return (
    <Button
      {...props}
      isLoading={loading}
      {...iconProps}
      onClick={() => {
        setLoading(true);
        navigator.clipboard
          .writeText(content)
          .then(() => {
            setLoading(false);
            setIcon("green");
            setTimeout(() => setIcon(null), SUCCESS_ICON_DURATION);
          })
          .catch(() => {
            setLoading(false);
            setIcon("red");
          });
      }}
    >
      {label || "copy"}
    </Button>
  );
};
