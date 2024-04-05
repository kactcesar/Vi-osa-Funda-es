from django.urls import path
from . views import *

app_name = 'categorias'

urlpatterns = [
    path('', cat_imp_index, name='index'),
    path('cat_imp_lista/', cat_imp_lista, name='cat_imp_lista'),
    path('cat_imp_atb/', cat_imp_atb, name='cat_imp_atb'),
    path('cat_imp_add/', cat_imp_add, name='cat_imp_add'),
    path('cat_imp_edt/', cat_imp_edt, name='cat_imp_edt'),
    path('cat_imp_del/', cat_imp_del, name='cat_imp_del'),
    
    path('cat_pes_index', cat_pes_index, name='index'),
    path('cat_pes_lista/', cat_pes_lista, name='cat_pes_lista'),
    path('cat_pes_atb/', cat_pes_atb, name='cat_pes_atb'),
    path('cat_pes_add/', cat_pes_add, name='cat_pes_add'),
    path('cat_pes_edt/', cat_pes_edt, name='cat_pes_edt'),
    path('cat_pes_del/', cat_pes_del, name='cat_pes_del'),




]
