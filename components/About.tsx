import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">About</h2>
        <div className="max-w-3xl mx-auto text-lg">
          <p className="mb-4">
            Mr. Please is a genre-defying musical experience from Louisville,
            Kentucky. Drawing on a wide range of influences, from the
            bluegrass of their native Kentucky to psychedelia, funk, and indie
            rock, Mr. Please offers something for everyone with a sound
            uniquely their own.
          </p>
          <p>
            The band&apos;s dynamic live performances and innovative
            songwriting have earned them a dedicated following, as they
            continue to push boundaries and explore new musical territories
            while staying true to their roots.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;