import json

from fastapi import APIRouter, Request

from template_config import templates

status_router = APIRouter(prefix="/status", redirect_slashes=True)


@status_router.get("")
async def index(request: Request):
    with open("static/data/status/data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    license_data = data["parents_profile_image_license"]
    availability_data = data["system"]["availability"]
    compatibility_data = data["system"]["compatibility"]

    title = "Status - Cafe Carte"

    context = {
        "title": title,
        "license_items": license_data,
        "availability_items": availability_data,
        "compatibility_items": compatibility_data,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="status/index.html",
    )
