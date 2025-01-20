// import { Button } from '@/components/ui/button';

// const tourDates = [
// 	{ date: 'July 15, 2023', venue: 'Rockstar Arena, New York', ticketLink: '#' },
// 	{ date: 'July 22, 2023', venue: 'Melody Hall, Los Angeles', ticketLink: '#' },
// 	{ date: 'July 29, 2023', venue: 'Rhythm Stadium, Chicago', ticketLink: '#' },
// 	{ date: 'August 5, 2023', venue: 'Harmony Center, Houston', ticketLink: '#' },
// ];

export default function TourDates() {
  return (
    <>
      <div className="wave-container3" />
      <section id="tour-dates" className="py-20 bg-gray-100">
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
            {/* {tourDates.map((event) => (
							<div
								key={`${event.date}-${event.venue}`}
								className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md p-4 rounded-lg"
							>
								<div>
									<h3 className="font-semibold">{event.date}</h3>
									<p>{event.venue}</p>
								</div>
								<Button asChild className="mt-2 sm:mt-0">
									<a
										href={event.ticketLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										Get Tickets
									</a>
								</Button>
							</div>
						))} */}
          </div>
        </div>
      </section>
    </>
  );
}
