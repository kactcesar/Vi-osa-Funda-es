

function pes_add(){
    var url
    if($('#pes_btn_salvar').val() == 'update'){
        url = '/vicosafundacoes/pes_edt/'
    }else{
        url = '/vicosafundacoes/pes_add/'
    }

    var frm_pes = new FormData(document.getElementById('frm_pes'));

    $.ajax({
        method: 'POST',
        url:url,
        data: frm_pes,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function() {
            Swal.fire({
                title: "Carregando os dados",
                text: "Aguarde ...",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                didOpen: function() {            
                    Swal.showLoading();
                }
            })
        },
    })
    .done(function(data,  textStatus, jqXHR){
        if (jqXHR.status === 200 && jqXHR.readyState === 4){
            Swal.fire({
                title: "Sucesso!",
                text: "Os dados do usuário foram salvos com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
                onClose: function() {
                    window.location.href = '/vicosafundacoes/';
                }
            });
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        Swal.close();
        console.log(jqXHR);
        Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
    });
}

function pes_edt(pes_id){
    $.getJSON('/vicosafundacoes/pes_atb/',
        {
            id:pes_id
        }
    ).done(function (item) {
        $('#pes_id').val(item.pes_id);
        $('#pes_nome').val(item.pes_nome);
        $('#pes_email').val(item.pes_email);
        $('#pes_ctt').val(item.pes_ctt);
        $('#pes_doc').val(item.pes_doc);
        Swal.fire({
            title: "Sucesso!",
            text: "Os dados do usuário foram alterados com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
            onClose: function() {
                window.location.href = '/vicosafundacoes/';
            }
        });
    })
    .fail(function (jqxhr, settings, ex) {
        exibeDialogo(result.responseText, tipoAviso.ERRO);
    });
}

function pes_del(pes_id) {
    Swal.fire({
        title: "Deseja executar esta operação?",
        text: "O registro " + pes_id + " será removido permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok, desejo remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            var dados = new FormData();
                dados.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                dados.append("pes_id",pes_id);
            $.ajax({
                method: 'POST',
                url:'/vicosafundacoes/cat_pes_del/',
                data:  dados,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function() {
                    Swal.fire({
                        title: "Operação em andamento",
                        text: "Aguarde ...",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        didOpen: function() {            
                            Swal.showLoading();
                        }
                    })
                },
            })
            .done(function(data,  textStatus, jqXHR){
                console.log(jqXHR);
                if (jqXHR.status === 200 && jqXHR.readyState === 4){
                    $('#kt_pes').DataTable().ajax.reload();
                    $('#frm_pes_modal').modal('hide');
                    Swal.close();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                Swal.close();
                Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
            });
        }
    });
};