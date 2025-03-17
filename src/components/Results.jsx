import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useStateContext } from "../contexts/StateContextProvider";
import Loading from "./Loading";



const Results = () => {
  const {
    setModalIsOpen,
    setVideoKey,
    results,
    loading,
    getResults,
    searchTerm,
  } = useStateContext();
  const location = useLocation();
  const [validVideos, setValidVideos] = useState([])


  const getKeyYoutube = (url) => {
    return url.slice(-11);
  };
  const handleVideo = (url) => {
      setModalIsOpen(true)
      setVideoKey(getKeyYoutube(url))
  }

  const isValidYoutubeVideo = async (videoId) => {
    try {
        const response = await fetch(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
        return response.ok; // Nếu trả về 200 -> video hợp lệ
    } catch (error) {
        return false;
    }
  };

  useEffect(() => {
    const filterValidVideos = async () => {
      if (results?.videos?.length > 0) {
        const valid = await Promise.all(
          results.videos.map(async (video) => {
            const isValid = await isValidYoutubeVideo(getKeyYoutube(video.link));
            return isValid ? video : null;
          })
        );

        setValidVideos(valid.filter((v) => v !== null)); // Loại bỏ video lỗi
      }
    };

    filterValidVideos();
  }, [results])

  useEffect(() => {
    if (searchTerm !== "") {
      getResults(`${location.pathname}?q=${searchTerm}&num=40`);
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.organic?.length > 0 ? (
            results.organic.map(({ link, title }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            ))
          ) : (
            <p className="h-[370px] flex items-center justify-center text-gray-600 dark:text-gray-400 w-full">Không có kết quả nào.</p>
          )}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.images?.length > 0 ? (
            results.images.map(({ title, link, thumbnailUrl }, index) => (
              <a
                href={link}
                target="_blank"
                key={index}
                rel="noreferrer"
                className="sm:p-3 p-5"
              >
                <img src={thumbnailUrl} alt={title} loading="lazy" />
                <p
                  className="w-40 break-words text-sm mt-2"
                >
                  {title.length > 20 ? `${title.substring(0, 20)}...`  : title}
                </p>
              </a>
            ))
          ) : (
            <p className="h-[370px] flex items-center justify-center text-gray-600 dark:text-gray-400 w-full">Không có hình ảnh nào.</p>
          )}
        </div>
      );

    case "/news":
      return (
        <div className="px-56 flex flex-col items-center space-y-7">
          {results?.news?.length > 0 ? (
            results.news.map(
              ({ link, title, source, snippet, date, imageUrl }, index) => (
                <div className="w-full flex justify-between items-center">
                  <div key={index} className="w-[75%]">
                    <p className=" text-sm text-gray-600 dark:text-gray-400">{source}</p>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      <p className="text-lg dark:text-blue-300 text-blue-700">
                        {title}
                      </p>
                    </a>
                    <p className="w-full break-words text-gray-600 dark:text-gray-400 text-sm mb-1.5 mt-2">
                      {snippet}
                    </p>
                    <p className="w-full break-words text-gray-600 dark:text-gray-400 text-sm">
                      {date}
                    </p>
                  </div>
                  <div className="w-[120px] h-[120px]">
                    <img
                      src={imageUrl}
                      alt="image"
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                </div>
              )
            )
          ) : (
            <p className="h-[370px] flex items-center justify-center text-gray-600 dark:text-gray-400 w-full">Không có tin tức nào.</p>
          )}
        </div>
      );

    case "/videos":
      return (
        <div className="flex flex-wrap justify-between px-10">
          {validVideos.length > 0 ? (
            validVideos.map(({ link, title }, index) => (
              <div key={index} className="p-3 ">
                <div 
                    
                    className="w-[355px] h-[200px] pb-2 relative"
                    onClick={() => handleVideo(link)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${getKeyYoutube(
                      link
                    )}/mqdefault.jpg`}
                    alt="Video youtube"
                    className="w-full h-full object-cover"
                  />
                  <i className="fa-solid fa-circle-play text-white text-5xl absolute top-[75px] left-[160px] z-10"></i>
                </div>
                <p className="text-[15px] text-gray-900 dark:text-gray-400 w-[355px] break-words">
                  {title}
                </p>
              </div>
            ))
          ) : (
            <p className="h-[370px] flex items-center justify-center text-gray-600 dark:text-gray-400 w-full">Không có video nào.</p>
          )}
        </div>
      );

    default:
      return "Error...";
  }
};

export default Results;
