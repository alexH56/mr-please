"use client";

import useWaveAnimation from "@/lib/hooks/useWaveAnimation";

export default function TourDates() {
  useWaveAnimation("tour-waves");

  return (
    <>
      {/* <div className="wave-container3" /> */}
      <canvas id="tour-waves" className="waves" />

      <div id="tour-dates" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Upcoming Shows
          </h2>
          <div className="space-y-4">
            <div
              id="seated-55fdf2c0"
              data-artist-id="fe1fd003-2d45-493e-af12-d463897baf04"
              data-css-version="3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
