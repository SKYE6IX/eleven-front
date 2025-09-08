"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children }: { children: React.ReactNode }) {
   const [isBrowser, setIsBrowser] = useState(false);
   useEffect(() => {
      setIsBrowser(true);
   }, []);

   if (isBrowser) {
      return createPortal(children, document.body);
   } else {
      return null;
   }
}

export default Modal;
