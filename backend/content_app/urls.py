from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'categories', DishCategoryViewSet)
router.register(r'dishes', DishViewSet)
router.register(r'banners', BannerViewSet)
router.register(r'gallery', GalleryImageViewSet)
router.register(r'contact', ContactInfoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]