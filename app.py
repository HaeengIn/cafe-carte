import json
import logging
from logging import Logger
from pathlib import Path
from typing import Any

import aiofiles
from auto_template import setup_templates
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, Response
from fastapi.staticfiles import StaticFiles
from markdownify import markdownify
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.templating import Jinja2Templates

from routers.members import members_router
from routers.sns import sns_router

app: FastAPI = FastAPI(title="Cafe Carte")
app.mount("/static", StaticFiles(directory="static"), name="static")

templates: Jinja2Templates = setup_templates(directory="templates")
BUCKET_BASE_URL: str = "https://static.cafe-carte.fans/img"
logger: Logger = logging.getLogger(__name__)


def accepts_markdown(request: Request) -> bool:
    accept_header: str = request.headers.get("accept", "")

    for media_range in accept_header.split(","):
        parts: list[str] = media_range.split(";")
        media_type: str = parts[0]
        parameters: list[str] = parts[1:]

        if media_type.strip().lower() != "text/markdown":
            continue

        quality: float = 1.0

        for parameter in parameters:
            name: str
            _: str
            value: str
            name, _, value = parameter.strip().partition("=")

            if name.lower() == "q":
                try:
                    quality = float(value)
                except ValueError:
                    quality = 0.0

        return quality > 0

    return False


@app.middleware("http")
async def markdown_negotiation(
    request: Request,
    call_next,
) -> Response:
    response = await call_next(request)

    content_type = response.headers.get("content-type", "").split(";", 1)[0]
    if not accepts_markdown(request) or content_type != "text/html":
        return response

    html: str = b"".join([chunk async for chunk in response.body_iterator]).decode("utf-8")
    markdown: str = markdownify(html, strip=["script", "style", "nav"]).strip() + "\n"

    headers: dict = dict(response.headers)
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


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(
    request: Request,
    exception: StarletteHTTPException,
) -> HTMLResponse:
    ERROR_MESSAGES: dict[int, str] = {
        400: "잘못된 요청입니다.",
        403: "접근 권한이 없습니다.",
        404: "요청하신 페이지를 찾을 수 없습니다.",
        405: "허용되지 않은 요청 방식입니다.",
        408: "요청 시간이 초과되었습니다.",
        409: "요청이 현재 서버 상태와 충돌합니다.",
        422: "요청 데이터의 형식이 올바르지 않습니다.",
        429: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",
        500: "서버 내부 오류가 발생했습니다.",
        502: "외부 서비스 연결에 실패했습니다.",
        503: "서비스를 일시적으로 사용할 수 없습니다.",
        504: "외부 서비스 응답 시간이 초과되었습니다.",
    }

    context: dict[str, Any] = {
        "error": ERROR_MESSAGES.get(
            exception.status_code,
            exception.detail,
        ),
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="error.html",
        status_code=exception.status_code,
    )


@app.exception_handler(Exception)
async def general_exception_handler(
    request: Request,
    exception: Exception,
) -> HTMLResponse:
    logger.exception("Unhandled exception occured")

    context: dict[str, str] = {
        "error": "Error has occured at server",
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="error.html",
        status_code=500,
    )


@app.get(
    "/",
    include_in_schema=False,
    response_class=HTMLResponse,
)
async def index(request: Request) -> HTMLResponse:
    title: str = "카페 카르테 - Cafe Carte | 비공식 웹 사이트"
    meta_description: str = "카페 카르테의 비공식 팬 웹 사이트. Not associated with SAMG Entertainment or TWILLIT Studio."
    fanding_link: str = "https://fanding.kr/@TWILLITSTUDIO_"

    members: list[str] = [
        "mocoparfe",
        "hanseorin",
        "dangkey",
        "uuhee",
        "aerusolstice",
    ]

    members_ko: dict[str, str] = {
        "mocoparfe": "모코 파르페",
        "hanseorin": "한서린",
        "dangkey": "댕키",
        "uuhee": "유우희",
        "aerusolstice": "에루 솔스티스",
    }

    twillit_links: dict[str, str] = {
        "x": "https://x.com/TWILLIT_studio_",
        "naver_cafe": "https://cafe.naver.com/twillitstudio",
        "youtube": "https://youtube.com/@TWILLITSTUDIOofficial",
    }

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "image_base_url": BUCKET_BASE_URL,
        "members": members,
        "members_ko": members_ko,
        "fanding": fanding_link,
        "twillit_links": twillit_links,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="index.html",
        headers={
            "Link": '</openapi.json>; rel="service-desc", </docs>; rel="service-doc"',
        },
    )


@app.get(
    "/about",
    include_in_schema=False,
    response_class=HTMLResponse,
)
async def about(request: Request) -> HTMLResponse:
    title: str = "소개 - 카페 카르테"
    meta_description: str = "비공식 웹 사이트 소개 및 개발자 정보."

    warning: str = (
        '본 웹 사이트는 <a href="https://samg.net" target="_blank" rel="noopener noreferrer">SAMG Entertainment</a>의 브랜드인 TWILLIT STUDIO의 3D 버츄얼 스트리머/유튜버 그룹, \'카페 카르테\'의 <b>비공식 팬 웹 사이트</b>입니다.<br>'
        "SAMG Entertainment 또는 TWILLIT STUDIO의 허가없이 제작된 웹 사이트이며, 사전 공지 없이 언제든 삭제될 수 있습니다."
    )
    developer_username: str = "HaeengIn"
    developer_contact: str = "haeengin@gmail.com"
    github_url: str = "https://github.com/HaeengIn/cafe-carte"

    context: dict[str, Any] = {
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
        name="about.html",
    )


@app.get(
    "/status",
    include_in_schema=False,
    response_class=HTMLResponse,
)
async def status(request: Request) -> HTMLResponse:
    async with aiofiles.open(
        "static/data/status/data.json",
        "r",
        encoding="utf-8",
    ) as file:
        data: dict = json.loads(await file.read())

    image_base_url: str = f"{BUCKET_BASE_URL}/parents"

    license_data: list = data["parents_profile_image_license"]
    availability_data: list = data["system"]["availability"]
    compatibility_data: list = data["system"]["compatibility"]

    title: str = "시스템 상태 - 카페 카르테"
    meta_description: str = "카페 카르테 비공식 웹 사이트의 시스템 상태"

    context: dict[str, Any] = {
        "title": title,
        "meta_description": meta_description,
        "license_items": license_data,
        "availability_items": availability_data,
        "compatibility_items": compatibility_data,
        "image_base_url": image_base_url,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="status.html",
    )


@app.get(
    "/sitemap.xml",
    include_in_schema=False,
    response_class=FileResponse,
)
async def sitemap() -> FileResponse:
    SITEMAP: Path = Path(__file__).parent / "sitemap.xml"

    return FileResponse(
        SITEMAP,
        media_type="application/xml",
    )


@app.get(
    "/robots.txt",
    include_in_schema=False,
    response_class=FileResponse,
)
async def robots() -> FileResponse:
    ROBOTS: Path = Path(__file__).parent / "robots.txt"

    return FileResponse(
        ROBOTS,
        media_type="text/plain",
    )


app.include_router(members_router)
app.include_router(sns_router)
