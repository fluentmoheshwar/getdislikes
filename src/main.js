const form = document.querySelector("form");
const link = document.querySelector("#link");
const result = document.querySelector("#result");

const getDislikes = async (videoID) => {
  const response = await fetch(
    `https://returnyoutubedislikeapi.com/votes?videoId=${videoID}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dislikes");
  }
  const data = await response.json();
  return data.dislikes;
}


form.onsubmit = async (e) => {
  e.preventDefault();
  const videoID = link.value.split("v=")[1];

  if (!videoID) {
    result.innerHTML = "Invalid YouTube link";
    return;
  }

  const dislikes = await getDislikes(videoID);
  if (dislikes === undefined) {
    result.innerHTML = "Video not found";
    return;
  }

  result.innerHTML = `
  Video ID: ${videoID}
  <br>
  Dislikes: ${dislikes}
  `;
};
