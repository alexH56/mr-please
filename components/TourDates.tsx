"use client";

import useWaveAnimation from "@/lib/hooks/useWaveAnimation";

export default function TourDates() {
  useWaveAnimation({
    canvasId: "tour-waves",
    wave1Color: "rgba(103,58,183,0.8)",
    wave2Color: "rgba(83,46,146,0.7)",
  });

  return (
    <section id="tour-dates">
      <canvas id="tour-waves" />
      <div className="bg-[#6133B8] py-8">
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
    </section>
  );
}
