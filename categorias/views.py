from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from categorias.serializador import *
from django.db import DatabaseError
from django.shortcuts import render
from .forms import CategoriaImpactoForm


def cat_index(request):
    return render(request, 'categoria impacto/index.html')

def cat_imp_lista(request):
    try:
        dados = CategoriaImpactoSerializer(CategoriaImpacto.objects.all().order_by('cat_imp_nome'), many=True)
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Problema ao consultar os dados'
        }, status=500)
    else:
        return JsonResponse({'dados': dados.data})
    
def cat_imp_atb(request):
    try:
        item = CategoriaImpactoSerializer(CategoriaImpacto.objects.get(pk=request.GET['id']))
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': error, 
            'aviso': 'Problema ao consultar os dados'}, 
            status=500)
    else:
        return JsonResponse(item.data) 

def cat_imp_add(request):
    if request.method == 'POST':
        form = CategoriaImpactoForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({
                'item': None,
                'aviso': 'Adicionado com sucesso!'
            }, status=200)
    else:
        form = CategoriaImpactoForm()
    return render(request, 'template.html', {'form': form})

def cat_imp_edt(request):
    try:
        item = CategoriaImpacto.objects.get(pk=request.POST['cat_imp_id'])
        if request.method=="POST":
            item.cat_imp_id=request.POST['cat_imp_id']
            item.cat_imp_nome=request.POST['cat_imp_nome']
            item.save()
    except(Exception,DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao editar a pessoa'},
            status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Editado com sucesso!'},
            status=200)
    
def cat_imp_del(request):
    try:
        if request.method == "POST":
            item = CategoriaImpacto.objects.get(pk=request.POST['cat_imp_id'])
            item.delete()
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao deletar a Pessoa'
        }, status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Excluido com sucesso!'
        }, status=200)
        