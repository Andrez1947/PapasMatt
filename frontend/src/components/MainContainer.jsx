import React from "react";
import CarouselContainer from "./CarouselContainer";
import HomeContainer from "./HomeContainer";
import BgImage from "./BgImage";

const MainContainer = () => {
  
  return (
    <div className="w-auto h-auto flex flex-col items-center justify-center mt-6">
      <div>
        <HomeContainer />
        <CarouselContainer />
        <BgImage />
      </div>
    </div>
  );
};

export default MainContainer;