from rest_framework import serializers
from .models import DishCategory, Dish, Banner, GalleryImage, ContactInfo

class DishCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DishCategory
        fields = ['id', 'name', 'description', 'order']

class DishSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image_url = serializers.ImageField(source='image', read_only=True)
    
    class Meta:
        model = Dish
        fields = [
            'id', 'name', 'description', 'price', 'weight',
            'image', 'image_url', 'is_popular', 'order', 
            'category', 'category_name', 'created_at'
        ]

class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(source='image', read_only=True)
    
    class Meta:
        model = Banner
        fields = ['id', 'title', 'subtitle', 'image', 'image_url', 'is_active', 'order']

class GalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(source='image', read_only=True)
    
    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'image', 'image_url', 'description', 'order']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = [
            'id', 'phone', 'address', 'email', 
            'working_hours', 'instagram', 'whatsapp', 'telegram'
        ]