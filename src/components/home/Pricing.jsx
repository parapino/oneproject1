import React from "react";

export default function Pricing() {
  return (
    <section className="text-gray-600 dark:text-gray-300 dark:bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {/* Title */}
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 dark:text-white">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 dark:text-gray-400">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
          </p>
          <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
            <button className="py-1 px-4 bg-indigo-500 text-white focus:outline-none">
              Monthly
            </button>
            <button className="py-1 px-4 focus:outline-none dark:text-gray-200">
              Annually
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap -m-4">
          {/* START */}
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                START
              </h2>
              <h1 className="text-5xl text-gray-900 dark:text-white pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 leading-none">
                Free
              </h1>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Tumeric plaid portland
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Mixtape chillwave tumeric
              </p>
              <button className="flex items-center mt-auto text-white bg-gray-400 dark:bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 dark:hover:bg-gray-700 rounded">
                Button
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>

          {/* PRO */}
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
              <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                POPULAR
              </span>
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                PRO
              </h2>
              <h1 className="text-5xl text-gray-900 dark:text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <span>$38</span>
                <span className="text-lg ml-1 font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </h1>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Tumeric plaid portland
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Hexagon neutra unicorn
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Mixtape chillwave tumeric
              </p>
              <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>

          {/* BUSINESS */}
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                BUSINESS
              </h2>
              <h1 className="text-5xl text-gray-900 dark:text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <span>$56</span>
                <span className="text-lg ml-1 font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </h1>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Tumeric plaid portland
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Hexagon neutra unicorn
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Mixtape chillwave tumeric
              </p>
              <button className="flex items-center mt-auto text-white bg-gray-400 dark:bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 dark:hover:bg-gray-700 rounded">
                Button
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>

          {/* SPECIAL */}
          <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                SPECIAL
              </h2>
              <h1 className="text-5xl text-gray-900 dark:text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <span>$72</span>
                <span className="text-lg ml-1 font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              </h1>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Tumeric plaid portland
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Hexagon neutra unicorn
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Vexillologist pitchfork
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 text-white rounded-full flex-shrink-0">
                  ✓
                </span>
                Mixtape chillwave tumeric
              </p>
              <button className="flex items-center mt-auto text-white bg-gray-400 dark:bg-gray-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 dark:hover:bg-gray-700 rounded">
                Button
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
