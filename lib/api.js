const fetchData = async (cookie, offset) => {
  try {
    const response = await fetch(
      `https://europe-west3-e-mood-api.cloudfunctions.net/gcp-emoodApi/orders?limit=10&offset=${offset}&mode=extended`,
      {
        method: "GET",
        headers: {
          userCookie: cookie,
        },
        credentials: "include",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

export const getEmoji = (amount) => {
  const thresholds = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
    3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000,
    5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 6800, 7000,
    7200, 7400, 7600, 7800, 8000, 8200, 8400, 8600, 8800, 9000,
    9200, 9400, 9600, 9800, 10000,
  ];

  const emojis = [
    "😌", "😊", "😀", "😐", "😬", "😕", "😟", "😰", "😨", "😱",
    "😧", "😢", "😭", "😫", "🤔", "😖", "😡", "🤯", "🤢", "🤮",
    "💀", "☠️", "👻", "👽", "🤖", "👾", "🤡", "👹", "🤠", "🤑",
    "🤓", "😎", "🤩", "😍", "🥳", "🎉", "🎊", "🏆", "😱", "😨",
    "😰", "😟", "😕", "😬", "😐", "😀", "😊", "😌", "😇", "🤠",
    "😎", "🤑", "🤓", "😍", "😘", "💣",
  ];

  for (let i = 0; i < thresholds.length; i++) {
    if (amount < thresholds[i]) {
      return emojis[i];
    }
  }

  return "💣";
};

export default fetchData;
