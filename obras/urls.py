from django.urls import path
from .views import * 

app_name = 'obras' #comando responsável por  deixar a app mais inteligente 

urlpatterns = [
    #obrecedor 
    path('', obr_index, name='obr_index'),
    path('obr_lista/', obr_lista, name='obr_lista'),
    path('obr_atb/', obr_atb, name='obr_atb'),
    path('obr_add/', obr_add, name='obr_add'),
    path('obr_edt/', obr_edt, name='obr_edt'),
    path('obr_del/', obr_del, name='obr_del'),
    
    
    path('', obr_index, name='obr_index'),
    path('obr_lista/', obr_lista, name='obr_lista'),
    path('obr_atb/', obr_atb, name='obr_atb'),
    path('obr_add/', obr_add, name='obr_add'),
    path('obr_edt/', obr_edt, name='obr_edt'),
    path('obr_del/', obr_del, name='obr_del'),

]