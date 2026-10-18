import json

import aiofiles
from auto_template import setup_templates
from fastapi import APIRouter, Request

sns_router = APIRouter(
    prefix="/sns",
    tags=["SNS"],
)

templates = setup_templates(directory="templates")

BUCKET_BASE_URL = "https://static.cafe-carte.fans/img"


@sns_router.get("")
async def index(request: Request):
    async with aiofiles.open(
        "static/data/members-name.json",
        "r",
        encoding="utf-8",
    ) as file:
        items = json.loads(await file.read())

    async with aiofiles.open(
        "static/data/meet-us/links.json",
        "r",
        encoding="utf-8",
    ) as file:
        links = json.loads(await file.read())

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
        name="sns.html",
    )
