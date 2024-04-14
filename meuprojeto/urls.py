
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings
from django.urls import path

urlpatterns = [

    path('categorias/', include('categorias.urls')),
    path('vicosafundacoes/', include('vicosafundacoes.urls')),
    path('admin/', admin.site.urls),
    path('fornecedor/', include('fornecedor.urls')),
    path('obras/', include('obras.urls')),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)