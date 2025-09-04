"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger, GSDevTools);
function GsapWrapper({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}

export default GsapWrapper;
