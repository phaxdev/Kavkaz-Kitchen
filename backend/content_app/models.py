from django.db import models

class DishCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название категории")
    description = models.TextField(blank=True, verbose_name="Описание")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    
    class Meta:
        verbose_name = "Категория блюд"
        verbose_name_plural = "Категории блюд"
        ordering = ['order']
    
    def __str__(self):
        return self.name

class Dish(models.Model):
    category = models.ForeignKey(DishCategory, on_delete=models.CASCADE, 
                                related_name='dishes', verbose_name="Категория")
    name = models.CharField(max_length=200, verbose_name="Название блюда")
    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    weight = models.CharField(max_length=50, blank=True, verbose_name="Вес/объем")
    image = models.ImageField(upload_to='dishes/', verbose_name="Изображение")
    is_popular = models.BooleanField(default=False, verbose_name="Популярное")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    
    class Meta:
        verbose_name = "Блюдо"
        verbose_name_plural = "Блюда"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.name

class Banner(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    subtitle = models.TextField(verbose_name="Подзаголовок")
    image = models.ImageField(upload_to='banners/', verbose_name="Изображение")
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    
    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    image = models.ImageField(upload_to='gallery/', verbose_name="Изображение")
    description = models.TextField(blank=True, verbose_name="Описание")
    order = models.IntegerField(default=0, verbose_name="Порядок")
    
    class Meta:
        verbose_name = "Изображение галереи"
        verbose_name_plural = "Галерея"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class ContactInfo(models.Model):
    phone = models.CharField(max_length=20, verbose_name="Телефон", 
                            default="+7 918-702-82-21")
    address = models.TextField(verbose_name="Адрес", 
                              default="Владикавказ, ул. Кухонная, 1")
    email = models.EmailField(blank=True, verbose_name="Email")
    working_hours = models.TextField(verbose_name="Часы работы", 
                                    default="Ежедневно с 9:00 до 21:00")
    instagram = models.URLField(blank=True, verbose_name="Instagram")
    whatsapp = models.CharField(max_length=20, blank=True, verbose_name="WhatsApp")
    telegram = models.CharField(max_length=100, blank=True, verbose_name="Telegram")
    
    class Meta:
        verbose_name = "Контактная информация"
        verbose_name_plural = "Контактная информация"
    
    def __str__(self):
        return "Контактная информация"