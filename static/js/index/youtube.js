document.querySelectorAll(".channel a").forEach((a) => {
  a.addEventListener("click", async (e) => {
    e.preventDefault();
    const channelId = a.dataset.channelId;
    const res = await fetch(`/api/youtube/latest?channel_id=${channelId}`);
    const data = await res.json();
    document.getElementById("ytPlayer").src =
      `https://www.youtube.com/embed/${data.video_id}?autoplay=1`;
    document.getElementById("moreVideo").href =
      `https://www.youtube.com/channel/${channelId}`;
  });
});
