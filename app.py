from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from routers.members import members_router
from routers.meet_us import meet_us_router
from routers.about import about_router
from routers.status import status_router

from template_config import templates

app = FastAPI(redirect_slashes=True)

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
