
from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path('categorias/', include('categorias.urls')),
    path('base/', include('base.urls')),
    path('admin/', admin.site.urls),
]