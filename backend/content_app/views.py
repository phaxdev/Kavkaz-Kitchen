from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from .models import DishCategory, Dish, Banner, GalleryImage, ContactInfo
from .serializers import *

class DishCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = DishCategory.objects.all()
    serializer_class = DishCategorySerializer

class DishViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        popular_dishes = Dish.objects.filter(is_popular=True).order_by('-order')
        serializer = self.get_serializer(popular_dishes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_id = request.query_params.get('category')
        if category_id:
            dishes = Dish.objects.filter(category_id=category_id)
        else:
            dishes = Dish.objects.all()
        serializer = self.get_serializer(dishes, many=True)
        return Response(serializer.data)

class BannerViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Banner.objects.filter(is_active=True).order_by('order')
    serializer_class = BannerSerializer

class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = GalleryImage.objects.all().order_by('order')
    serializer_class = GalleryImageSerializer

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    
    def list(self, request):
        contact = ContactInfo.objects.first()
        if contact:
            serializer = self.get_serializer(contact)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)