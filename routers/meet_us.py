import json
from fastapi import APIRouter, Request

from auto_template import setup_templates

meet_us_router = APIRouter(prefix="/meet-us")

templates = setup_templates(directory="templates")

BUCKET_BASE_URL = "https://static.cafe-carte.fans/img"


@meet_us_router.get("")
async def index(request: Request):
    with open("static/data/members-name.json", "r", encoding="utf-8") as f:
        items = json.load(f)

    with open("static/data/meet-us/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)

        title = "MEET US - Cafe Carte"
        meta_description = "카페 카르테의 소식, 활동, 그리고 공식 링크를 확인하세요."

        context = {
            "title": title,
            "meta_description": meta_description,
            "items": items,
            "links": links,
            "image_base_url": BUCKET_BASE_URL,
        }

        return templates.TemplateResponse(
            request=request,
            context=context,
            name="meet-us/index.html",
        )
