
from rest_framework import serializers
from.models import*


class CategoriaPessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaPessoa
        fields = '__all__'  
        
        
class CategoriaImpactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaImpacto
        fields = '__all__'  