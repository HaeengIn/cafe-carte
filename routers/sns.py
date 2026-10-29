import json
from typing import Any

import aiofiles
from auto_template import setup_templates
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from starlette.templating import Jinja2Templates

sns_router: APIRouter = APIRouter(
    prefix="/sns",
    tags=["SNS"],
)

templates: Jinja2Templates = setup_templates(directory="templates")

BUCKET_BASE_URL: str = "https://static.cafe-carte.fans/img"


@sns_router.get("")
async def index(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members-name.json",
        "r",
        encoding="utf-8",
    ) as file:
        items: dict = json.loads(await file.read())

    async with aiofiles.open(
        "static/data/meet-us/links.json",
        "r",
        encoding="utf-8",
    ) as file:
        links: dict = json.loads(await file.read())

    title: str = "SNS - 카페 카르테"
    meta_description: str = "카페 카르테의 소식, 활동, 그리고 공식 링크를 확인하세요."

    context: dict[str, Any] = {
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
