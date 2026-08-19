from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from markdownify import markdownify

from routers.members import members_router
from routers.meet_us import meet_us_router
from routers.about import about_router
from routers.status import status_router

from template_config import templates

app = FastAPI(redirect_slashes=True)


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


app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)


@app.get("/")
async def index(request: Request):
    title = "CAFE CARTE - Unofficial Fan Website"
    meta_description = "Cafe Carte - 카페 카르테의 비공식 팬 웹 사이트. 모코 파르페, 한서린, 댕키, 유우희, 에루 솔스티스로 구성된 카페 카르테를 만나보세요."

    context = {
        "title": title,
        "meta_description": meta_description,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="index.html",
        headers={
            "Link": '</openapi.json>; rel="service-desc", </docs>; rel="service-doc"',
        },
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
app.include_router(meet_us_router)
app.include_router(about_router)
app.include_router(status_router)
