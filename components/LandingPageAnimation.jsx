import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTheme } from "styled-components";

// Import animations
const AnimationYellowBackground = require("@/public/lotties/landing-page-yellow.json");
const AnimationLightBackground = require("@/public/lotties/landing-page-light.json");

// Dynamically import Lottie without SSR
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const ContainerLottie = styled.div`
  width: 800px;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  background-color: transparent;

  @media (max-width: 1400px) {
    width: 700px;
    height: 700px;
  }

  @media (max-width: 1200px) {
    width: 600px;
    height: 600px;
  }

  @media (max-width: 900px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: auto;
  }
`;

const LottieWrapper = styled.div`
  max-width: 80%;
  max-height: 80%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimationsToShow = {
  dark: AnimationYellowBackground,
  light: AnimationLightBackground,
};

export default function LandingPageAnimation() {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure Lottie is only rendered on the client
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationsToShow[theme.name],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
      <ContainerLottie>
        {isClient && ( // Render Lottie only on the client
            <LottieWrapper>
              <Lottie
                  options={defaultOptions}
                  isStopped={false}
                  isPaused={false}
                  isClickToPauseDisabled={true}
              />
            </LottieWrapper>
        )}
      </ContainerLottie>
  );
}
