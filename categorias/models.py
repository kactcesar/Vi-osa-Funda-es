from django.db import models

class CategoriaImpacto(models.Model):
    
    cat_imp_id = models.BigAutoField(primary_key=True)
    cat_imp_nome = models.CharField(max_length=255)
    cat_imp_cor = models.CharField(max_length=255)
    cat_imp_ativo = models.BooleanField()
    
    class Meta:
        managed = False
        db_table = 'categoriaimpacto'