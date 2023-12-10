import { useEffect, useState } from "react";
import fetchData, { getEmoji } from "../../lib/api";

export default function New({ navigateToPage, cookie }) {
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let hasNext = true;
        let offset = 0;
        while (hasNext) {
          const data = await fetchData(cookie, offset);
          hasNext = data.data.hasNext;
          let orders = data.data.orders;
          if (offset == 0) {
            setEndDate(orders[0].submission_date);
          }
          setStartDate(orders[orders.length - 1].submission_date);
          const priceValues = orders.map((obj) => obj.price);
          setValues((prev) => {
            return [...prev, ...priceValues];
          });
          offset += 10;
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchOrders();
  }, []);

  const totalSum = values.reduce((acc, val) => acc + val, 0).toFixed(2);
  const emoji = getEmoji(totalSum);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#f63235] via-[rgb(216, 162, 162)] text-white py-8">
      <h1 className="text-4xl font-bold mb-2">E-Mood</h1>
      <div className="bg-white w-full rounded-lg p-6 shadow-lg flex flex-col items-center text-gray-800 mb-4">
        <p className="mb-8">
          Έχεις <i>φάει</i>
        </p>
        <div className="text-5xl font-bold mb-2 flex items-center">
          {totalSum}€ {emoji}
        </div>
        <div class="text-center">
          <p class="text-sm">μεταξύ</p>
          <div class="inline-flex">
            <p class="text-sm font-medium">{startDate}</p>
            <p class="text-sm mx-2">και</p>
            <p class="text-sm font-medium">{endDate}</p>
          </div>
        </div>
      </div>
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mt-4 bg-[#ff6464] hover:bg-[#ff5a5a] text-white"
        onClick={() => navigateToPage("index")}
      >
        Πίσω
      </button>
    </div>
  );
}
