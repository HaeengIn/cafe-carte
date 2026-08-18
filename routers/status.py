import json

from fastapi import APIRouter, Request

from template_config import templates

status_router = APIRouter(prefix="/status", redirect_slashes=True)


@status_router.get("/parents")
async def parents(request: Request):
    with open("static/data/status/parents-license.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "LICENSE Status - Cafe Carte"

    context = {
        "title": title,
        "items": data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="status/license.html",
    )


@status_router.get("/system")
async def system(request: Request):
    with open("static/data/status/system.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    title = "System Status - Cafe Carte"

    availability_data = data["availability"]
    compatibility_data = data["compatibility"]

    context = {
        "title": title,
        "availability_items": availability_data,
        "compatibility_items": compatibility_data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="status/system.html",
    )
