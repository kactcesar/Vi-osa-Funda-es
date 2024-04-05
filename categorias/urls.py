from django.urls import path
from . views import *

app_name = 'categorias'

urlpatterns = [
    path('', cat_index, name='index'),
    path('cat_imp_lista/', cat_imp_lista, name='cat_imp_lista'),
    path('cat_imp_atb/', cat_imp_atb, name='cat_imp_atb'),
    path('cat_imp_add/', cat_imp_add, name='cat_imp_add'),
    path('cat_imp_edt/', cat_imp_edt, name='cat_imp_edt'),
    path('cat_imp_del/', cat_imp_del, name='cat_imp_del'),
]
