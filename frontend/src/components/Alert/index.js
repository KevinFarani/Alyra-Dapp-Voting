import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

export const Alert = ({ title, style, icon, setter }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (setter) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setter(null);
      }, 3000);
    }
  }, [show]);
  return (
    <div className={`alert fixed bottom-4 right-5 w-fit ${style}`}>
      <Icon icon={icon} className="text-[24px]" />
      <span>{title}</span>
    </div>
  );
};
