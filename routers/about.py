import json
from fastapi import APIRouter, Request
from template_config import templates

about_router = APIRouter(prefix="/about", redirect_slashes=True)


@about_router.get("/")
async def index(request: Request):
    title = "ABOUT - Cafe Carte"

    warning = (
        '본 웹 사이트는 <a href="https://samg.net" target="_blank" rel="noopener noreferrer">SAMG Entertainment</a>의 브랜드인 TWILLIT STUDIO의 3D 버츄얼 스트리머/유튜버 그룹, \'카페 카르테\'의 <b>비공식 팬 웹 사이트</b>입니다.<br>'
        "SAMG Entertainment 또는 TWILLIT STUDIO의 허가없이 제작된 웹 사이트이며, 사전 공지 없이 언제든 삭제될 수 있습니다."
    )
    developer_username = "HaeengIn"
    developer_contact = "haeengin@gmail.com"
    github_url = "https://github.com/HaeengIn/cafe-carte"

    context = {
        "title": title,
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
