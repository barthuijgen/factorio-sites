import React, { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

export const CopyButton: React.FC<Omit<ButtonProps, "children"> & { content: string }> = ({
  content,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState<"check" | "small-close" | null>(null);

  return (
    <Button
      {...props}
      isLoading={loading}
      leftIcon={icon ?? undefined}
      variantColor={icon === "small-close" ? "red" : "green"}
      onClick={() => {
        setLoading(true);
        navigator.clipboard
          .writeText(content)
          .then(() => {
            setLoading(false);
            setIcon("check");
            setTimeout(() => setIcon(null), 2500);
          })
          .catch(() => {
            setLoading(false);
            setIcon("small-close");
          });
      }}
    >
      copy
    </Button>
  );
};
