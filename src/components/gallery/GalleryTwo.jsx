import React from 'react'

export default function GalleryTwo() {
  return (
    <section className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">
            Master Cleanse Reliac Heirloom
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. 
            Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {[
            { src: "https://dummyimage.com/600x360", title: "Shooting Stars" },
            { src: "https://dummyimage.com/601x361", title: "The Catalyzer" },
            { src: "https://dummyimage.com/603x363", title: "The 400 Blows" },
            { src: "https://dummyimage.com/602x362", title: "Neptune" },
            { src: "https://dummyimage.com/605x365", title: "Holden Caulfield" },
            { src: "https://dummyimage.com/606x366", title: "Alper Kamu" },
          ].map((item, index) => (
            <div key={index} className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={item.src}
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-0 hover:opacity-100 transition duration-300">
                  <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h1>
                  <p className="leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
