import json

from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response

from routers.members import members_router
from routers.sns import sns_router

from markdownify import markdownify

from auto_template import setup_templates

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = setup_templates(directory="templates")
BUCKET_BASE_URL = "https://static.cafe-carte.fans/img"


def accepts_markdown(request: Request) -> bool:
    for media_range in request.headers.get("accept", "").split(","):
        media_type, *parameters = media_range.split(";")
        if media_type.strip().lower() != "text/markdown":
            continue

        quality = 1.0
        for parameter in parameters:
            name, _, value = parameter.strip().partition("=")
            if name.lower() == "q":
                try:
                    quality = float(value)
                except ValueError:
                    quality = 0.0

        return quality > 0
    return False


@app.middleware("http")
async def markdown_negotiation(request: Request, call_next):
    response = await call_next(request)

    content_type = response.headers.get("content-type", "").split(";", 1)[0]
    if not accepts_markdown(request) or content_type != "text/html":
        return response

    html = b"".join([chunk async for chunk in response.body_iterator]).decode("utf-8")
    markdown = markdownify(html, strip=["script", "style", "nav"]).strip() + "\n"

    headers = dict(response.headers)
    headers.pop("content-length", None)
    headers.pop("content-type", None)
    vary = headers.get("vary", "")
    headers["vary"] = f"{vary}, Accept" if vary else "Accept"

    return Response(
        content=markdown,
        status_code=response.status_code,
        headers=headers,
        media_type="text/markdown",
    )


@app.get("/")
async def index(request: Request):
    title = "CAFE CARTE - Unofficial Fan Website"
    meta_description = "Cafe Carte - 카페 카르테의 비공식 팬 웹 사이트. Not associated with SAMG Entertainment or TWILLIT Studio."

    context = {
        "title": title,
        "meta_description": meta_description,
        "image_base_url": BUCKET_BASE_URL,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="index.html",
        headers={
            "Link": '</openapi.json>; rel="service-desc", </docs>; rel="service-doc"',
        },
    )


@app.get("/about")
async def about(request: Request):
    title = "ABOUT - Cafe Carte"
    meta_description = "Cafe Carte 팬 웹 사이트 소개 및 개발자 정보. TWILLIT STUDIO의 3D 버츄얼 스트리머 그룹 카페 카르테를 소개합니다."

    warning = (
        '본 웹 사이트는 <a href="https://samg.net" target="_blank" rel="noopener noreferrer">SAMG Entertainment</a>의 브랜드인 TWILLIT STUDIO의 3D 버츄얼 스트리머/유튜버 그룹, \'카페 카르테\'의 <b>비공식 팬 웹 사이트</b>입니다.<br>'
        "SAMG Entertainment 또는 TWILLIT STUDIO의 허가없이 제작된 웹 사이트이며, 사전 공지 없이 언제든 삭제될 수 있습니다."
    )
    developer_username = "HaeengIn"
    developer_contact = "haeengin@gmail.com"
    github_url = "https://github.com/HaeengIn/cafe-carte"

    context = {
        "title": title,
        "meta_description": meta_description,
        "warning": warning,
        "developer_username": developer_username,
        "developer_contact": developer_contact,
        "github_url": github_url,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="about/index.html",
    )


@app.get("/status")
async def status(request: Request):
    with open("static/data/status/data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    global BUCKET_BASE_URL
    BUCKET_BASE_URL = f"{BUCKET_BASE_URL}/parents"

    license_data = data["parents_profile_image_license"]
    availability_data = data["system"]["availability"]
    compatibility_data = data["system"]["compatibility"]

    title = "Status - Cafe Carte"
    meta_description = "카페 카르테 비공식 웹 사이트의 시스템 상태"

    context = {
        "title": title,
        "meta_description": meta_description,
        "license_items": license_data,
        "availability_items": availability_data,
        "compatibility_items": compatibility_data,
        "image_base_url": BUCKET_BASE_URL,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="status.html",
    )



@app.get("/sitemap.xml", include_in_schema=False)
async def sitemap():
    SITEMAP = Path(__file__).parent / "sitemap.xml"

    return FileResponse(
        SITEMAP,
        media_type="application/xml",
    )


@app.get("/robots.txt", include_in_schema=False)
async def robots():
    ROBOTS = Path(__file__).parent / "robots.txt"

    return FileResponse(
        ROBOTS,
        media_type="text/plain",
    )


app.include_router(members_router)
app.include_router(sns_router)
