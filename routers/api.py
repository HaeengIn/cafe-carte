import xml.etree.ElementTree as ET

import httpx
from fastapi import APIRouter

api_router: APIRouter = APIRouter(
    prefix="/api",
    tags=["API"],
)


@api_router.get("/youtube/latest")
async def get_latest_video(channel_id: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}",
            headers={"User-Agent": "Mozilla/5.0 (compatible; cafe-carte-bot/1.0)"},
        )
    root = ET.fromstring(res.text)
    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "yt": "http://www.youtube.com/xml/schemas/2015",
    }
    entry = root.find("atom:entry", ns)
    video_id = entry.find("yt:videoId", ns).text

    return {
        "video_id": video_id,
    }
