"use client";
import React from "react";
import WhoWeAre from "./WhoWeAre";
import WhoBelieve from "./WhoBelieve";
import Services from "./Services";
import "./about-us.scss";
function AboutUs() {
   const getMoveXAndStartScale = (headingText: HTMLDivElement) => {
      const wrapper = document.querySelector<HTMLDivElement>(
         ".about-us-page__inner-wrapper"
      )!;
      const headingTextRect = headingText.getBoundingClientRect();
      const wrapperWidth = wrapper.offsetWidth;
      const wrapperHeight = wrapper.offsetHeight;
      const maxScaleX = wrapperWidth / headingTextRect.width;
      const maxScaleY = wrapperHeight / headingTextRect.height;
      const maxAllowedScale = Math.min(maxScaleX, maxScaleY);
      const preferredScale = 2;
      const startScale = Math.min(preferredScale, maxAllowedScale);
      const moveX = (wrapper.offsetWidth - headingTextRect.width) / 2;
      return { startScale, moveX };
   };

   return (
      <div className="about-us-page">
         <div className="about-us-page__inner-wrapper">
            <WhoWeAre getMoveXAndStartScale={getMoveXAndStartScale} />
            <WhoBelieve getMoveXAndStartScale={getMoveXAndStartScale} />
         </div>
         <Services getMoveXAndStartScale={getMoveXAndStartScale} />
      </div>
   );
}
export default AboutUs;
