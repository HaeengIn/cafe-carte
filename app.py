from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

from routers.members import members_router
from routers.meet_us import meet_us_router
from routers.about import about_router

from template_config import templates

app = FastAPI(redirect_slashes=True)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def index(request: Request):
    title = "CAFE CARTE - Unofficial Fan Website"

    context = {
        "title": title,
    }

    return templates.TemplateResponse(
        request=request, context=context, name="index.html"
    )


app.include_router(members_router)
app.include_router(meet_us_router)
app.include_router(about_router)
