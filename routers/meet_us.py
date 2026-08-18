import json
from fastapi import APIRouter, Request
from template_config import templates

meet_us_router = APIRouter(prefix="/meet-us", redirect_slashes=True)


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
        }

        return templates.TemplateResponse(
            request=request,
            context=context,
            name="meet-us/index.html",
        )
