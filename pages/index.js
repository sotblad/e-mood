import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import Index from "../components/Index";
import Calculation from "../components/Calculation";

import fetchData from "../lib/api";

export default function Home() {
  const [activePage, setActivePage] = useState("index");
  const [isValidPage, setIsValidPage] = useState(false);
  const [cookie, setCookie] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    chrome.runtime.sendMessage(
      { action: "getActiveTabInfo" },
      async (response) => {
        setIsLoading(true);
        if (response.tabInfo.url.includes("e-food.gr")) {
          const cookie = response.tabInfo.cookies.join("; ");
          setCookie(cookie);

          const data = await fetchData(cookie, 0);
          if (data.error_code === "authentication_error") {
            setIsValidPage(false);
            return;
          }
          setIsValidPage(true);
        }
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <div
        style={{ display: isLoading ? "flex" : "none" }}
        className="fixed z-10 inset-0 overflow-hidden bg-black bg-opacity-40 flex items-center justify-center"
      >
        <div className="m-auto p-20 flex items-center">
          <ReactLoading
            type={"spin"}
            color={"#ffffff"}
            height={100}
            width={100}
          />
        </div>
      </div>
      {activePage === "index" && (
        <Index
          navigateToPage={navigateToPage}
          isValid={isValidPage}
          cookie={cookie}
        />
      )}
      {activePage === "calculation" && (
        <Calculation navigateToPage={navigateToPage} cookie={cookie} />
      )}
    </>
  );
}
