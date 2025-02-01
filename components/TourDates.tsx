"use client";

import useWaveAnimation from "@/lib/hooks/useWaveAnimation";

export default function TourDates() {
  useWaveAnimation("tour-waves");

  return (
    <section id="tour-dates" className="bg-gray-100">
      <canvas id="tour-waves" />
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
    </section>
  );
}
