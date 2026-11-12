import json
from typing import Any

import aiofiles
from auto_template import setup_templates
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from starlette.templating import Jinja2Templates

members_router: APIRouter = APIRouter(
    prefix="/members",
    tags=["Members"],
)

templates: Jinja2Templates = setup_templates(directory="templates")

BUCKET_BASE_URL = "https://static.cafe-carte.fans/img"


@members_router.get("")
async def index(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members-name.json",
        "r",
        encoding="utf-8",
    ) as file:
        data: dict = json.loads(await file.read())

    title: str = "멤버 - 카페 카르테"
    meta_description: str = "카페 카르테의 멤버, 「모코 파르페/한서린/댕키/유우희/에루 솔스티스」에 대해 알아보세요."

    image_base_url: str = f"{BUCKET_BASE_URL}"

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "items": data,
        "image_base_url": image_base_url,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members.html",
    )


@members_router.get("/mocoparfe")
async def mocoparfe(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members/mocoparfe.json",
        "r",
        encoding="utf-8",
    ) as file:
        data: dict = json.loads(await file.read())

    title: str = "모코 파르페 - 멸망한 핫초코 왕국의 왕녀"
    meta_description: str = (
        "멸망한 핫초코 왕국의 왕녀, 모코 파르페의 프로필 정보를 확인하세요."
    )

    image_url: dict[str, str] = {
        "portrait": f"{BUCKET_BASE_URL}/mocoparfe/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/atwomaru.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/dohaonya.avif",
    }

    member: dict[str, str] = {
        "en": "mocoparfe",
        "en_title": "Moco Parfe",
        "kr": "모코 파르페",
    }

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
        "member": member,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/mocoparfe.html",
    )


@members_router.get("/hanseorin")
async def hanseorin(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members/hanseorin.json",
        "r",
        encoding="utf-8",
    ) as file:
        data = json.loads(await file.read())

    title = "한서린 - 강력한 저승사자 공무원"
    meta_description = "강력한 저승사자 공무원, 한서린의 프로필 정보를 확인하세요."

    image_url: dict[str, str] = {
        "portrait": f"{BUCKET_BASE_URL}/hanseorin/portrait.avif",
        "mama_1": f"{BUCKET_BASE_URL}/parents/HAZE.avif",
        "mama_2": f"{BUCKET_BASE_URL}/parents/TWILLIT.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Grempa_Live2D.avif",
    }

    member: dict[str, str] = {
        "en": "hanseorin",
        "en_title": "Han Seo Rin",
        "kr": "한서린",
    }

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
        "member": member,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/hanseorin.html",
    )


@members_router.get("/dangkey")
async def dangkey(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members/dangkey.json",
        "r",
        encoding="utf-8",
    ) as file:
        data: dict = json.loads(await file.read())

    title: str = "댕키 - 시골 출신 배달부 시바견"
    meta_description: str = "시골 출신 배달부 시바견, 댕키의 프로필 정보를 확인하세요."

    image_url: dict[str, str] = {
        "portrait": f"{BUCKET_BASE_URL}/dangkey/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/boni_53__.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Machi_0330.avif",
    }

    member: dict[str, str] = {
        "en": "dangkey",
        "en_title": "DangKey",
        "kr": "댕키",
    }

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
        "member": member,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/dangkey.html",
    )


@members_router.get("/uuhee")
async def uuhee(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members/uuhee.json",
        "r",
        encoding="utf-8",
    ) as file:
        data: dict = json.loads(await file.read())

    title: str = "유우희 - 이고의 유유자적 지박령"
    meta_description: str = "이고의 유유자적 지박령, 유우희의 프로필 정보를 확인하세요."

    image_url: dict[str, str] = {
        "portrait": f"{BUCKET_BASE_URL}/uuhee/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/sake_dong.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Grempa_Live2D.avif",
    }

    member: dict[str, str] = {
        "en": "uuhee",
        "en_title": "UuHee",
        "kr": "유우희",
    }

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
        "member": member,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/uuhee.html",
    )


@members_router.get("/aerusolstice")
async def aerusolstice(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/members/aerusolstice.json",
        "r",
        encoding="utf-8",
    ) as file:
        data: dict = json.loads(await file.read())

    title: str = "에루 솔스티스 - 북부대공 솔스티스 가문의 막내딸"
    meta_description: str = (
        "북부대공 솔스티스 가문의 막내딸, 에루 솔스티스의 프로필 정보를 확인하세요."
    )

    image_url: dict[str, str] = {
        "portrait": f"{BUCKET_BASE_URL}/aerusolstice/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/spe.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Machi_0330.avif",
    }

    member: dict[str, str] = {
        "en": "aerusolstice",
        "en_title": "Aeru Solstice",
        "kr": "에루 솔스티스",
    }

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
        "member": member,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/aerusolstice.html",
    )
