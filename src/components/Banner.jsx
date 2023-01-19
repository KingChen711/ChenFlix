import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ latest }) => {
  const backdropPath = latest?.backdrop_path;
  const title = latest?.original_title;
  const overview = latest?.overview;
  return (
    <Link
      to={`/movie/${latest.id}`}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdropPath}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="h-[500px] w-full rounded-md mt-6 relative overflow-hidden p-10 flex items-end"
    >
      <div className="absolute w-full h-full top-0 left-0 z-10 bg-black opacity-50" />
      <div className="relative z-20 md:w-2/5 text-white">
        <div className="text-2xl">{title}</div>
        <div className="text-sm">{overview}</div>
      </div>
    </Link>
  );
};

export default Banner;
