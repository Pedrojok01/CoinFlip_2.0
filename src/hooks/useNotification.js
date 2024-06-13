import { useState, useEffect, useCallback } from "react";

export const useNotification = (hideIn, handleClose) => {
  const [isHiding, setIsHiding] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const closeNotification = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      setIsHidden(true);
      if (handleClose) {
        handleClose();
      }
    }, 500);
  }, [handleClose]);

  useEffect(() => {
    if (!hideIn) return;

    const timer = setTimeout(() => {
      closeNotification();
    }, hideIn);

    return () => clearTimeout(timer);
  }, [hideIn, closeNotification]);

  return { isHiding, isHidden, closeNotification };
};
