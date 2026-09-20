import json

from fastapi import APIRouter, Request

from auto_template import setup_templates

status_router = APIRouter(prefix="/status")

templates = setup_templates(directory="templates")

BUCKET_BASE_URL = "https://static.cafe-carte.fans/img/parents"


@status_router.get("")
async def index(request: Request):
    with open("static/data/status/data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

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
