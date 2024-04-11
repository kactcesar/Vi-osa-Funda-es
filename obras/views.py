from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from categorias.serializador import *
from django.db import DatabaseError
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url="vicosafundacoes:my-login")        
def obr_index(request):
    return render(request, 'obra/obr_index.html')

@login_required(login_url="vicosafundacoes:my-login")
def obr_lista(request):
    try:
        dados = ObraSerializer(Obra.objects.all().order_by('obr_nome'), many=True)
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Problema ao consultar os dados'
        }, status=500)
    else:
        return JsonResponse({'dados': dados.data})
    
@login_required(login_url="vicosafundacoes:my-login")   
def obr_atb(request):
    try:
        item = ObraSerializer(Obra.objects.get(pk=request.GET['id']))
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': error, 
            'aviso': 'Problema ao consultar os dados'}, 
            status=500)
    else:
        return JsonResponse(item.data)

@login_required(login_url="vicosafundacoes:my-login")
def obr_add(request):
    try:
        item = Obra()
        item.obr_nome=request.POST['obr_nome']
        item.obr_cor=request.POST['obr_cor']
        item.obr_ativo = request.POST.get('obr_ativo') == 'on'
        item.save()
    except(Exception,DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao adicionar a produto'},
            status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Adicionado com sucesso!'},
            status=200)
        
@login_required(login_url="vicosafundacoes:my-login")
def obr_edt(request):
    try:
        item = Obra.objects.get(pk=request.POST['obr_id'])
        if request.method=="POST":
            item.obr_id=request.POST['obr_id']
            item.obr_nome=request.POST['obr_nome']
            item.obr_ativo = request.POST.get('obr_ativo') == 'on'
            item.obr_cor=request.POST['obr_cor']
            item.save()
    except(Exception,DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao editar a produto'},
            status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Editado com sucesso!'},
            status=200)
        
@login_required(login_url="vicosafundacoes:my-login")   
def obr_del(request):
    try:
        if request.method == "POST":
            item = Obra.objects.get(pk=request.POST['obr_id'])
            item.delete()
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao deletar a Produto'
        }, status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Excluido com sucesso!'
        }, status=200)
