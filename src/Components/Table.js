import React, { useEffect, useState } from "react";
import { database } from "../firebase.init";
import { ref, onValue } from "firebase/database";

function Table() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReview = reviews.slice(indexOfFirstReview, indexOfLastReview);

  useEffect(() => {
    const referdb = ref(database, "reviews");
    const unsubscribe = onValue(referdb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsArray = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setReviews(reviewsArray);
      } else {
        setReviews([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="block">
          <div className="overflow-x-auto w-full border rounded-lg border-gray-300">
            <table className="w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5">
                    <input
                      type="checkbox"
                      className="w-5 h-5 appearance-none border border-gray-300 rounded-md hover:border-indigo-500 hover:bg-indigo-100 checked:bg-indigo-500"
                    />
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Comment
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
				  <th className="p-5 text-left text-sm font-semibold text-gray-900">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentReview.map((review) => (
                  <tr
                    key={review.id}
                    className="bg-white hover:bg-gray-50 transition-all"
                  >
                    <td className="p-5">
                      <input
                        type="checkbox"
                        className="w-5 h-5 appearance-none border border-gray-300 rounded-md hover:border-indigo-500 hover:bg-indigo-100 checked:bg-indigo-500"
                      />
                    </td>
                    <td className="p-5 text-sm text-gray-900">
                      {review.name || "N/A"}
                    </td>
                    <td className="p-5 text-sm text-gray-900">
                      {review.rating || "N/A"}
                    </td>
                    <td className="p-5 text-sm text-gray-900">
                      {review.reviewText || "No Comment"}
                    </td>
                    <td className="p-5">
                      <span
                        className={`py-1 px-2 rounded-full text-xs ${
                          review.isApproved === 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {review.isApproved || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
