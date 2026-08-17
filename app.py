from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from routers.members import members_router
from routers.meet_us import meet_us_router
from routers.about import about_router

from template_config import templates

app = FastAPI(redirect_slashes=True)

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

SITEMAP = Path(__file__).parent / "sitemap.xml"


@app.get("/")
async def index(request: Request):
    title = "CAFE CARTE - Unofficial Fan Website"

    context = {
        "title": title,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="index.html",
    )


@app.get("/sitemap.xml", include_in_schema=False)
async def sitemap():
    return FileResponse(
        SITEMAP,
        media_type="application/xml",
    )


app.include_router(members_router)
app.include_router(meet_us_router)
app.include_router(about_router)
