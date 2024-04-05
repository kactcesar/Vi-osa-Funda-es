
from rest_framework import serializers
from.models import*


class CategoriaImpactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaImpacto
        fields = '__all__'  