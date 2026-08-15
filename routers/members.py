import json
from fastapi import APIRouter, Request
from template_config import templates

members_router = APIRouter(prefix="/members", redirect_slashes=True)


@members_router.get("")
async def index(request: Request):
    with open("static/data/members-name.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "MEMBERS - Cafe Carte"

    context = {
        "title": title,
        "items": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/index.html",
    )


@members_router.get("/mocoparfe")
async def mocoparfe(request: Request):
    with open("static/data/members/mocoparfe.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "모코 파르페 - Cafe Carte"

    context = {
        "title": title,
        "rows": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/view/mocoparfe.html",
    )


@members_router.get("/hanseorin")
async def hanseorin(request: Request):
    with open("static/data/members/hanseorin.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "한서린 - Cafe Carte"

    context = {
        "title": title,
        "rows": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/view/hanseorin.html",
    )


@members_router.get("/dangkey")
async def dangkey(request: Request):
    with open("static/data/members/dangkey.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "댕키 - Cafe Carte"

    context = {
        "title": title,
        "rows": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/view/dangkey.html",
    )


@members_router.get("/uuhee")
async def uuhee(request: Request):
    with open("static/data/members/uuhee.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "유우희 - Cafe Carte"

    context = {
        "title": title,
        "rows": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/view/uuhee.html",
    )


@members_router.get("/aerusolstice")
async def aerusolstice(request: Request):
    with open("static/data/members/aerusolstice.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "에루 솔스티스 - Cafe Carte"

    context = {
        "title": title,
        "rows": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/view/aerusolstice.html",
    )
