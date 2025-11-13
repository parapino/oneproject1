import React from "react";
import { motion } from "framer-motion";

export default function Team() {
  const members = [
    { name: "Azamat Qodirov", role: "UI Designer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Nilufar To'raeva", role: "CTO", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Bekzod Sattorov", role: "Founder", img: "https://randomuser.me/api/portraits/men/65.jpg" },
    { name: "Gulnora Karimova", role: "DevOps", img: "https://randomuser.me/api/portraits/women/22.jpg" },
    { name: "Shahriyor Nematov", role: "Software Engineer", img: "https://randomuser.me/api/portraits/men/10.jpg" },
    { name: "Lola Rustamova", role: "UX Researcher", img: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Jasur Yusupov", role: "QA Engineer", img: "https://randomuser.me/api/portraits/men/54.jpg" },
    { name: "Malika Tursunova", role: "System Admin", img: "https://randomuser.me/api/portraits/women/19.jpg" },
    { name: "Rustam Khudoyberdiyev", role: "Product Manager", img: "https://randomuser.me/api/portraits/men/78.jpg" },
  ];

  return (
    <section className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-gray-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <motion.h1
            className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Bizning Jamoa
          </motion.h1>
          <motion.p
            className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            
          </motion.p>
        </div>
        <div className="flex flex-wrap -m-2">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              className="p-2 lg:w-1/3 md:w-1/2 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              <div className="h-full flex items-center border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800">
                <motion.img
                  alt={member.name}
                  className="w-16 h-16 bg-gray-100 dark:bg-gray-700 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={member.img}
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 dark:text-white title-font font-medium">{member.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
