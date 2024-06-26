
from rest_framework import serializers
from.models import*


class CategoriaPessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaPessoa
        fields = '__all__'  
        

class CategoriaAvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaAvaliacao
        fields = '__all__'  
        
        
class CategoriaImpactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaImpacto
        fields = '__all__'  
        

class CategoriaStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoriaStatus
        fields = '__all__'  
        

class CategoriaTipoSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoriaTipo
        fields = '__all__' 
        

class CategoriaProdutoSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoriaProduto
        fields = '__all__'  
        
        
class CategoriaObraSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoriaObra
        fields = '__all__'  

class CategoriaUnidadeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoriaUnidade
        fields = '__all__'  