from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from obras.serializador import *
from django.db import DatabaseError
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
import os

# Create your views here.
@login_required(login_url="vicosafundacoes:my-login")        
def obr_index(request):
    return render(request, 'obras/obr_lista.html')

@login_required(login_url="vicosafundacoes:my-login")
def obr_lista(request):
    try:
        dados = ObraSerializer(Obra.objects.all().order_by('obr_prop'), many=True)
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
        item.obr_prop = request.POST['obr_prop']
        item.obr_loc = request.POST['obr_loc']
        item.obr_dta_ini = datetime.strptime(request.POST['obr_dta_ini'], '%Y-%m-%d')
        item.cat_sta = CategoriaStatus.objects.get(cat_sta_id=3)
        item.cat_obr = CategoriaObra.objects.get(cat_obr_id=request.POST['cat_obr'])
        item.save()
    except(Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao adicionar a Obra'},
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
            item.obr_prop=request.POST['obr_prop']
            item.obr_loc=request.POST['obr_loc']
            item.cat_sta = CategoriaStatus(cat_sta_id = request.POST['cat_sta'])
            item.cat_obr = CategoriaObra(cat_obr_id = request.POST['cat_obr'])
            item.save()
    except(Exception,DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao editar a Obra'},
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
            'aviso': 'Erro ao deletar a Obra'
        }, status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Excluido com sucesso!'
        }, status=200)

##################################################################Pedido ######################################################################################################


@login_required(login_url="vicosafundacoes:my-login")
def ped_lista(request):
    try:
        dados= PedidoSerializer(Pedido.objects.filter(obr=request.POST['obr_id']).order_by('ped_num'), many=True)
    except(Exception,DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': error,
            'aviso': 'Problema ao consultar os dados'},
            status=500)
    else:
        return JsonResponse({'dados':dados.data})
    
@login_required(login_url="vicosafundacoes:my-login")   
def ped_atb(request):
    try:
        item = PedidoSerializer(Pedido.objects.get(pk=request.GET['id']))
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': error, 
            'aviso': 'Problema ao consultar os dados'}, 
            status=500)
    else:
        return JsonResponse(item.data)

@login_required(login_url="vicosafundacoes:my-login")
def ped_add(request):
    try:
        # Caminho para salvar os arquivos do pedido
        xpath = 'media/Pedido/' + 'arquivo_ped' + '/'
        # Cria o diretório se não existir
        if not os.path.exists(xpath):
            os.makedirs(xpath)
        
        # Armazena os arquivos no sistema de arquivos, se estiverem presentes no request
        arquivos = request.FILES.getlist('arquivos')  # Corrigido para 'arquivos'
        filepaths = []
        for arquivo in arquivos:
            xstorage = FileSystemStorage(location=xpath)
            filename = xstorage.save(arquivo.name, arquivo)
            filepath = os.path.join(xpath, filename)
            filepaths.append(filepath)
        
        # Cria um novo Pedido
        item = Pedido()
        item.ped_num = request.POST['ped_num']
        item.ped_qtd = request.POST['ped_qtd']
        item.ped_desc = request.POST['ped_desc']
        if filepaths:  # Se houver arquivos, use o primeiro caminho como caminho do arquivo
            item.ped_arq_path = filepaths[0]
        item.ped_dta = datetime.strptime(request.POST['ped_dta'], '%Y-%m-%d')
        item.obr = Obra.objects.get(obr_id=request.POST['obr_id'])
        item.cat_pes = CategoriaPessoa.objects.get(pes_id=request.POST['cat_pes'])
        item.forn = Fornecedor.objects.get(forn_id=request.POST['forn'])
        item.save()
        
        return JsonResponse({
            'item': None,
            'aviso': 'Adicionado com sucesso!'},
            status=200)
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao adicionar o Pedido'},
            status=500)
        
@login_required(login_url="vicosafundacoes:my-login")
def ped_edt(request):
    try:
        item = Pedido.objects.get(pk=request.POST['ped_id'])
        if request.method=="POST":
            item.ped_num = request.POST['ped_num']
            item.ped_qtd = request.POST['ped_qtd']
            item.ped_desc = request.POST['ped_desc']
            item.ped_dta = datetime.strptime(request.POST['ped_dta'], '%Y-%m-%d')
            item.obr = Obra(obr_id=request.POST['obr_id'])
            item.cat_pes = CategoriaPessoa.objects.get(cat_pes_id=request.POST['cat_pes'])
            item.forn = Fornecedor.objects.get(forn_id=request.POST['forn'])
            item.save()
    except(Exception,DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao editar a Pedido'},
            status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Editado com sucesso!'},
            status=200)
        
@login_required(login_url="vicosafundacoes:my-login")   
def ped_del(request):
    try:
        if request.method == "POST":
            item = Pedido.objects.get(pk=request.POST['ped_id'])
            item.delete()
    except (Exception, DatabaseError) as error:
        print(error)
        return JsonResponse({
            'error': str(error),
            'aviso': 'Erro ao deletar a Pedido'
        }, status=500)
    else:
        return JsonResponse({
            'item': None,
            'aviso': 'Excluido com sucesso!'
        }, status=200)
