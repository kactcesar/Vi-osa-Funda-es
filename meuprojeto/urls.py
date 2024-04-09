
from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path('categorias/', include('categorias.urls')),
    path('vicosafundacoes/', include('vicosafundacoes.urls')),
    path('admin/', admin.site.urls),
]