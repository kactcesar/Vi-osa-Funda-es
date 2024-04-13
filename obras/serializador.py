from rest_framework import serializers
from.models import*

class ObraSerializer(serializers.ModelSerializer):

    cat_obr_id = serializers.IntegerField(source="cat_obr.cat_obr_id", read_only="True")
    cat_obr_nome = serializers.CharField(source="cat_obr.cat_obr_nome", read_only="True")
    
    cat_sta_id = serializers.IntegerField(source="cat_obr.cat_obr_id", read_only="True")
    cat_sta_nome = serializers.CharField(source="cat_sta.cat_sta_nome", read_only="True")
    cat_sta_cor = serializers.CharField(source="cat_sta.cat_sta_cor", read_only="True")

    class Meta:
        model = Obra
        fields = '__all__'  
        
        
class PedidoSerializer(serializers.ModelSerializer):

    forn_id = serializers.IntegerField(source="forn.forn_id", read_only="True")
    forn_nome = serializers.CharField(source="forn.forn_nome", read_only="True")
    forn_cnpj = serializers.CharField(source="forn.forn_cnpj", read_only="True")
    forn_ies = serializers.CharField(source="forn.forn_ies", read_only="True")

    pes_id = serializers.IntegerField(source="cat_pes.pes_id", read_only="True")
    pes_nome = serializers.CharField(source="cat_pes.pes_nome", read_only="True")

    class Meta:
        model = Pedido
        fields = '__all__'  