import { useState } from "react";

export default function Index({ navigateToPage, isValid: isValidPage }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleButtonClick = () => {
    if (isChecked) {
      navigateToPage("calculation");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#f63235] via-[rgb(216, 162, 162)] text-white py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">E-Mood</h1>
        <p className="text-xl mb-6">An e-food calculator</p>
        <p className="mx-auto max-w-xs">
          Νιώθεις περίεργος και έτοιμος να μάθεις πόσα χρήματα έχεις <i>φάει</i>{" "}
          στο e-food?
        </p>
        {isValidPage && (
          <>
            <div class="flex items-center pt-8">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="default-checkbox" class="ms-2 text-sm text-white">
                Νιώθω έτοιμος
              </label>
            </div>
            <button
              className="bg-white text-[#ff758c] font-medium py-2 px-8 rounded-full"
              onClick={handleButtonClick}
              disabled={!isChecked}
            >
              Υπολογισμός
            </button>
          </>
        )}
      </div>
      {!isValidPage && (
        <h2 className="bg-gray-100 text-gray-500 rounded-lg p-4 font-mono mt-4 max-w-xs">
          Μπές στη σελίδα του e-food, συνδέσου στον λογαριασμό σου και άνοιξε το
          extension για να ξεκινήσεις!
        </h2>
      )}
    </div>
  );
}
