# forms.py
from django import forms
from .models import CategoriaImpacto

class CategoriaImpactoForm(forms.ModelForm):
    class Meta:
        model = CategoriaImpacto
        fields = '__all__'  