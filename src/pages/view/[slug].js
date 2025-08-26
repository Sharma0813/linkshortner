import { URI } from "@/source";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function View() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const { slug } = router.query;

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${URI}/api/getlinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: slug }),
      });

      const result = await response.json();

      if (result?.data?.links) {
        setUserData(result.data.links);
        setUserName(result.data.username); // fixed: accessing username from result.data
      } else {
        console.warn("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);

  const handleLinkClick = (url) => {
    const newTab = window.open(url, "_blank");
    if (newTab) newTab.focus();
    else alert("Please allow pop-ups to open the link.");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-100 to-purple-100 p-5">
      <div className="flex flex-col items-center w-full max-w-md bg-white shadow-2xl rounded-2xl p-6">
        <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-3xl font-bold mb-3">
          {userName ? userName[0]?.toUpperCase() : "U"}
        </div>
        <div className="text-lg font-semibold text-gray-700 mb-6">
          @{userName || "username"}
        </div>

        {userData.length > 0 ? (
          userData.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              key={index}
              onClick={() => handleLinkClick(item.link)}
              className="cursor-pointer w-full bg-cyan-50 text-cyan-600 border border-cyan-300 rounded-xl px-6 py-3 text-center font-medium mb-3 shadow-md hover:bg-cyan-100"
            >
              {item.title}
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No links available</p>
        )}
      </div>
    </div>
  );
}
