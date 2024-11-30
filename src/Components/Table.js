import React, { useEffect, useState } from "react";
import { database } from "../firebase.init";
import { ref, onValue, update, remove } from "firebase/database";

function Table() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedReviews, setExpandedReviews] = useState({});
  const maxLength = 60;
  const reviewsPerPage = 10000;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReview = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const toggleText = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Create funtion to handle comments approval
  const handleApproval = (id) => {
    const reviewRef = ref(database, `reviews/${id}`);   // Refer the databse using db name
    update(reviewRef, { isApproved: 1 }).then(() => {
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id ? { ...review, isApproved: 1 } : review
        )
      );
    });
  };

  // Create funtion to delete unusual comments
  const handleDelete = (id) => {
    const reviewRef = ref(database, `reviews/${id}`);
      remove(reviewRef, null).then(() => {
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
    });
  };
  
useEffect(()=>{
console.log('hi, im your conflict');
console.log('hi, im your');
});
  useEffect(() => {
    const referdb = ref(database, 'reviews');   // Refer the database using db name
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
            <table className="w-full border-collapse border border-gray-400 rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 border border-gray-300">
                    Name
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 border border-gray-300">
                    Rating
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 border border-gray-300">
                    Comment
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 border border-gray-300">
                    Status
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-900 border border-gray-300">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentReview.map((review) => {
                  const isTextLong = review.reviewText.length > maxLength;
                  return (
                    <tr
                      key={review.id}
                      className="bg-white hover:bg-gray-50 transition-all"
                    >
                      <td className="p-5 text-sm text-gray-900 border border-gray-300">
                        {review.name || "N/A"}
                      </td>
                      <td className="p-5 text-sm text-gray-900 border border-gray-300">
                        {review.rating || "N/A"}
                      </td>
                      <td className="p-5 text-sm text-gray-900 border border-gray-300">
                        {expandedReviews[review.id]
                          ? review.reviewText
                          : `${review.reviewText.slice(0, maxLength)}${
                              isTextLong ? "..." : ""
                            }`}
                        {isTextLong && (
                          <span
                            onClick={() => toggleText(review.id)}
                            className="text-blue-500 cursor-pointer hover:underline ml-2"
                          >
                            {expandedReviews[review.id] ? "Show less" : "Show more"}
                          </span>
                        )}
                      </td>
                      <td className="p-5 border border-gray-300">
                        {review.isApproved === 0 ? (
                          <button
                            onClick={() => handleApproval(review.id)}
                            className="py-1 px-3 text-xs font-semibold bg-orange-300 text-orange-800 rounded-full hover:bg-green-100 hover:text-green-600 transition-colors"
                          >
                            Pending...
                          </button>
                        ) : (
                          <span className="py-1 px-2 rounded-full text-xs bg-green-100 text-green-600">
                            Approved
                          </span>
                        )}
                      </td>
                      <td className="p-5 border border-gray-300">
                        <button
                        onClick={() => handleDelete(review.id)}
                        className="py-2 px-4 text-xs font-semibold bg-red-300 text-red-800 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">
                          Remove
                         </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

//Test comment
export default Table;
