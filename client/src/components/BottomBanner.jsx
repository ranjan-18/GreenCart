import React from 'react';
import { assets, features } from '../assets/assets';

function BottomBanner() {
  return (
    <div className="relative mt-24">
      {/* Desktop banner */}
      <img
        className="w-full hidden md:block"
        src={assets.bottom_banner_image}
        alt="banner"
      />
      {/* Mobile banner */}
      <img
        className="w-full md:hidden"
        src={assets.bottom_banner_image_sm}
        alt="banner"
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="bg-white/70 md:bg-transparent p-4 md:p-0 rounded-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-6 text-center md:text-right">
            Why We Are the Best?
          </h1>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mt-3 max-w-xs md:max-w-md"
            >
              <img
                className="w-8 sm:w-9 md:w-11"
                src={feature.icon}
                alt={feature.title}
              />
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
