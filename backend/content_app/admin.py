from django.contrib import admin
from django.utils.html import format_html
from .models import DishCategory, Dish, Banner, GalleryImage, ContactInfo

@admin.register(DishCategory)
class DishCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'dish_count']
    list_editable = ['order']
    search_fields = ['name']
    
    def dish_count(self, obj):
        return obj.dishes.count()
    dish_count.short_description = 'Кол-во блюд'

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_popular', 'order', 'image_preview']
    list_filter = ['category', 'is_popular']
    list_editable = ['price', 'is_popular', 'order']
    search_fields = ['name', 'description']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "Нет изображения"
    image_preview.short_description = 'Превью'

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order', 'image_preview']
    list_editable = ['is_active', 'order']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="50" />', obj.image.url)
        return "Нет изображения"
    image_preview.short_description = 'Превью'

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'image_preview']
    list_editable = ['order']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "Нет изображения"
    image_preview.short_description = 'Превью'

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['phone', 'address', 'working_hours']
    
    def has_add_permission(self, request):
        return not ContactInfo.objects.exists()