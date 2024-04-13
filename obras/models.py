from django.db import models
from vicosafundacoes.models import *
from categorias.models import *
from fornecedor.models import *

# Create your models here.
class Obra(models.Model):
    obr_id = models.BigAutoField(primary_key=True)
    obr_prop = models.CharField(max_length=255)
    obr_loc = models.CharField(max_length=255)
    obr_dta_ini = models.DateField()
    obr_dta_fin = models.DateField()
    usu_cad_dta = models.DateField(auto_now_add=True)
    usu_alt_dta = models.DateField(auto_now=True)
    cat_obr = models.ForeignKey(CategoriaObra, on_delete=models.CASCADE)
    cat_sta = models.ForeignKey(CategoriaStatus, on_delete=models.CASCADE)
    usu_cad = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name='usu_cad_obr')
    usu_alt = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name='usu_alt_obr')
    
    
    class Meta:
        managed = False
        db_table = 'obra'
        
class Pedido(models.Model):
    ped_id = models.BigAutoField(primary_key=True)
    ped_num = models.IntegerField()
    ped_qtd = models.DecimalField(max_digits=10, decimal_places=2)  #
    ped_desc = models.CharField(max_length=255)
    ped_arq_path = models.CharField(max_length=255)
    ped_dta = models.DateField()
    cat_pes = models.ForeignKey(CategoriaPessoa, on_delete=models.CASCADE)
    forn = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)
    obr = models.ForeignKey(Obra, on_delete=models.CASCADE)
    usu_cad = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name='usu_cad_ped')
    usu_alt = models.ForeignKey(Pessoa, on_delete=models.CASCADE, related_name='usu_alt_ped')
    usu_cad_dta = models.DateField(auto_now_add=True)
    usu_alt_dta = models.DateField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'pedido'