import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LatestRelease = () => {
  return (
    <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Latest Release
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Image
            src="/pleasant_tense.jpg"
            alt="Album cover"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Pleasant Tense</h3>
            <div className="flex flex-col gap-4 mb-4">
              <p>
                Pleasant Tense is a labor of love meant to take listeners on a
                genre-defying journey down a rabbit hole of self discovery,
                longing to escape, and ultimately finding contentment in the
                present moment, our natural world, and those we choose to
                share it with.
              </p>
            </div>
            <Button asChild>
              <Link
                href="https://open.spotify.com/album/6b5aJPyRPjcbAu1zJiOuwT?si=ivNJET7gR2CqA488VYVHnA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stream Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
  );
};

export default LatestRelease;