import json
from fastapi import APIRouter, Request

from auto_template import setup_templates

members_router = APIRouter(prefix="/members")

templates = setup_templates(directory="templates")

BUCKET_BASE_URL = "https://static.cafe-carte.fans/img"


@members_router.get("")
async def index(request: Request):
    with open("static/data/members-name.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "MEMBERS - Cafe Carte"
    meta_description = "카페 카르테의 멤버들을 소개합니다. 모코 파르페, 한서린, 댕키, 유우희, 에루 솔스티스의 프로필을 확인하세요."

    image_base_url = f"{BUCKET_BASE_URL}"

    context = {
        "title": title,
        "meta_description": meta_description,
        "items": data,
        "image_base_url": image_base_url,
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
    meta_description = "모코 파르페(Moco Parfe)의 프로필 정보를 확인하세요."

    image_url = {
        "portrait": f"{BUCKET_BASE_URL}/mocoparfe/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/atwomaru.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/dohaonya.avif",
    }

    context = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
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
    meta_description = "한서린(Han Seorin)의 프로필 정보를 확인하세요."

    image_url = {
        "portrait": f"{BUCKET_BASE_URL}/hanseorin/portrait.avif",
        "mama_1": f"{BUCKET_BASE_URL}/parents/HAZE.avif",
        "mama_2": f"{BUCKET_BASE_URL}/parents/TWILLIT.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Grempa_Live2D.avif",
    }

    context = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
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
    meta_description = "댕키(DangKey)의 프로필 정보를 확인하세요."

    image_url = {
        "portrait": f"{BUCKET_BASE_URL}/dangkey/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/boni_53__.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Machi_0330_.avif",
    }

    context = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
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
    meta_description = "유우희(Uuhee)의 프로필 정보를 확인하세요."

    image_url = {
        "portrait": f"{BUCKET_BASE_URL}/uuhee/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/sake_dong.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Grempa_Live2D.avif",
    }

    context = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
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
    meta_description = "에루 솔스티스(AeruSolstice)의 프로필 정보를 확인하세요."

    image_url = {
        "portrait": f"{BUCKET_BASE_URL}/aerusolstice/portrait.avif",
        "mama": f"{BUCKET_BASE_URL}/parents/spe.avif",
        "papa": f"{BUCKET_BASE_URL}/parents/Machi_0330.avif",
    }

    context = {
        "title": title,
        "meta_description": meta_description,
        "rows": data,
        "image_url": image_url,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="members/view/aerusolstice.html",
    )
