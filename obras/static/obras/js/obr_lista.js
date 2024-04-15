"use strict";

$.fn.dataTable.Api.register('column().title()', function() {
    return $(this.header())[0].dataset.field;
}); 

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function isValidColor(color) {
    // Implemente sua lógica para validar a cor aqui
    // Por exemplo, você pode usar expressões regulares ou outras técnicas de validação
    return /^#[0-9A-F]{6}$/i.test(color); // Verifica se a cor está no formato "#RRGGBB"
}

var tab_obr = function() {
    var kt_obr = function() {
        
        var table = $('#kt_obr');
        // begin first table
        table.on('processing.dt', function (e, settings, processing) {
            if (processing) {
                Toast.fire({
                    icon: 'primary',
                    title: 'Sucesso! Carregando os dados ...'
                });
            } else {
                Toast.close();
            }
        }).DataTable({
            responsive: true,
            processing: true,
            pageLength: 10,
            paging: false,
            language: {
                processing:     "Processamento em andamento...",
                search:         "Pesquisar:",
                lengthMenu:     "MENU registros por página",
                info:           "Mostrando de START até END de TOTAL registros",
                infoEmpty:      "Mostrando 0 até 0 de 0 registros",
                infoFiltered:   "(Filtrados de MAX registros)",
                infoPostFix:    "",
                loadingRecords: "Carregando registros...",
                zeroRecords:    "Nenhum registro encontrado",
                emptyTable:     "Nenhum registro encontrado",
                paginate: {
                    first:      "Primeiro",
                    previous:   "Anterior",
                    next:       "Avançar",
                    last:       "Último"
                },
                aria: {
                    sortAscending:  ": Ordenar coluna por ordem crescente",
                    sortDescending: ": Ordenar coluna por ordem decrescente"
                }
            },
            ajax: {
                url: '/obras/obr_lista/',
                type: 'POST',
                dataSrc: 'dados',
                data: function(d) {
                    d.csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
                },
            },
            order: [[ 0, 'asc' ]],
            columns: [
                {data: 'obr_id'},
                {data: 'cat_obr_nome'},
                {data: 'obr_prop'},
                {data: 'obr_loc'},
                {data: 'obr_dta_ini'},
                {data: 'obr_dta_fin'},
                {data: 'cat_sta_nome'},
                {data: null, responsivePriority: -1},
            ],
            columnDefs: [
                {
                    targets: [4, 5],
                    render: function(data, type, row) {
                        if (data === null) {
                            return ''; // Retorna vazio se o valor for nulo
                        } else {
                            return moment(data).format("DD/MM/YYYY");
                        }
                    }
                },
                {
                    targets: [6],
                    render: function(data, type, row) {
                        return '<span class="btn btn-light" style="background-color:' + row.cat_sta_cor + '; color: white">' + data + '</span>';
                    }
                },
                
                {
                    targets: [-1],
                    orderable: false,
                    render: function(data, type, row) {
                        return '\
                            <button type="button" onclick="obr_edt(' + row.obr_id + ')" class="btn btn-light-primary btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" value="update" title="Editar">\
                                <i class="flaticon-edit"></i>\
                            </button> \
                            <button type="button" onclick="obr_del(' + row.obr_id + ')" class="btn btn-light-danger btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" title="Remover">\
                                <i class="flaticon-delete"></i>\
                            </button>\
                        ';
                    },
                },
            ],
        });  
    };

    return {
        //main function to initiate the module
        init: function() {
            kt_obr();
        },
    };
}();


var tabela_ped = function() {
    var kt_ped = function() {
        
        var table = $('#kt_ped');
        
        // Destrói a instância existente do DataTable, se houver
        if ($.fn.DataTable.isDataTable('#kt_ped')) {
            table.DataTable().destroy();
        }

        // Inicializa o DataTable novamente com as novas configurações
        table.on('processing.dt', function (e, settings, processing) {
            if (processing) {
                Toast.fire({
                    icon: 'success',
                    title: 'Sucesso! Carregando os dados ...'
                });
            } else {
                Toast.close();
            }
        }).DataTable({
            responsive: true,
            processing: true,
            pageLength: 10,
            paging: false,
            language: {
                processing:     "Processamento em andamento...",
                search:         "Pesquisar:",
                lengthMenu:     "MENU registros por página",
                info:           "Mostrando de START até END de TOTAL registros",
                infoEmpty:      "Mostrando 0 até 0 de 0 registros",
                infoFiltered:   "(Filtrados de MAX registros)",
                infoPostFix:    "",
                loadingRecords: "Carregando registros...",
                zeroRecords:    "Nenhum registro encontrado",
                emptyTable:     "Nenhum registro encontrado",
                paginate: {
                    first:      "Primeiro",
                    previous:   "Anterior",
                    next:       "Avançar",
                    last:       "Último"
                },
                aria: {
                    sortAscending:  ": Ordenar coluna por ordem crescente",
                    sortDescending: ": Ordenar coluna por ordem decrescente"
                }
            },
            ajax: {
                url: '/obras/ped_lista/',
                type: 'POST',
                dataSrc: 'dados',
                data: function(d) {
                    d.csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
                    d.obr_id = $("#obr_id").val();
                },
            },
            order: [[ 0, 'asc' ]],
            columns: [
                {data: 'ped_id'},
                {data: 'ped_dta'},
                {data: 'pes_nome'},
                {data: 'forn_nome'},
                {data: 'forn_cnpj'},
                {data: 'forn_ies'},
                {data: 'ped_num'},
                {data: 'ped_qtd'},
                {data: 'cat_uni_nome'},
                {data: 'ped_desc'},
                {data: 'ped_arq_path'},
                {data: null, responsivePriority: -1},
            ],
            columnDefs: [
                {
                    targets: [1],
                    render: function(data, type, row) {
                        if (data === null) {
                            return ''; // Retorna vazio se o valor for nulo
                        } else {
                            return moment(data).format("DD/MM/YYYY");
                        }
                    }
                },
                {
                    targets: [10],
                    className: 'text-center',
                    orderable: false,
                    render: function(data, type, row) {
                        if (row.ped_arq_path.match(/.(jpg|jpeg|png|jpg2|bmp|svg)$/i)){
                            return '\
                                <img onclick="visualizar(' + row.ped_arq_id + ')"\
                                    id="ped_arq_path_' + row.ped_arq_id +'"\
                                    src="' + row.ped_arq_path + '"\
                                    class="img-thumbnail"\
                                    width="200" height="200"\
                                    "\
                                >\
                            ';
                        }
                        else{
                            return '\
                                <a href="' + row.ped_arq_path + '" target="_blank">' + row.ped_arq_path + '</a>\
                            ';
                        }
                    },
                },
                {
                    targets: [-1],
                    orderable: false,
                    render: function(data, type, row) {
                        return '\
                            <button type="button" onclick="ped_edt(' + row.ped_id + ')" class="btn btn-light-success btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" value="update" title="Editar">\
                                <i class="flaticon-edit"></i>\
                            </button> \
                            <button type="button" onclick="ped_del(' + row.ped_id + ')" class="btn btn-light-danger btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" title="Remover">\
                                <i class="flaticon-delete"></i>\
                            </button>\
                        ';
                    },
                },
            ],
        });  
    };

    return {
        //main function to initiate the module
        init: function() {
            kt_ped();
        },
    };
}();


var tabela_ped_esp = function() {
    var kt_ped_esp = function() {
        
        var table = $('#kt_ped_esp');
        
        // Destrói a instância existente do DataTable, se houver
        if ($.fn.DataTable.isDataTable('#kt_ped_esp')) {
            table.DataTable().destroy();
        }

        // Inicializa o DataTable novamente com as novas configurações
        table.on('processing.dt', function (e, settings, processing) {
            if (processing) {
                Toast.fire({
                    icon: 'success',
                    title: 'Sucesso! Carregando os dados ...'
                });
            } else {
                Toast.close();
            }
        }).DataTable({
            responsive: true,
            processing: true,
            pageLength: 10,
            paging: false,
            language: {
                processing:     "Processamento em andamento...",
                search:         "Pesquisar:",
                lengthMenu:     "MENU registros por página",
                info:           "Mostrando de START até END de TOTAL registros",
                infoEmpty:      "Mostrando 0 até 0 de 0 registros",
                infoFiltered:   "(Filtrados de MAX registros)",
                infoPostFix:    "",
                loadingRecords: "Carregando registros...",
                zeroRecords:    "Nenhum registro encontrado",
                emptyTable:     "Nenhum registro encontrado",
                paginate: {
                    first:      "Primeiro",
                    previous:   "Anterior",
                    next:       "Avançar",
                    last:       "Último"
                },
                aria: {
                    sortAscending:  ": Ordenar coluna por ordem crescente",
                    sortDescending: ": Ordenar coluna por ordem decrescente"
                }
            },
            ajax: {
                url: '/obras/ped_esp_lista/',
                type: 'POST',
                dataSrc: 'dados',
                data: function(d) {
                    d.csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
                    d.ped_id = $("#ped_id").val();
                },
            },
            order: [[ 0, 'asc' ]],
            columns: [
                {data: 'ped_esp_id'},
                {data: 'ped_esp_obs'},
                {data: 'ped_esp_psq'},
                {data: 'ped_esp_fispq'},
                {data: null, responsivePriority: -1},
            ],
            columnDefs: [
                {
                    targets: [2,3],
                    type: "text",
                    render: function(data) {
                        if (data === true) {
                            return '<span class="btn btn-text-primary btn-hover-light-primary font-weight-bold mr-2">Sim</span>';
                        } else {
                            return '<span class="btn btn-text-danger btn-hover-light-danger font-weight-bold mr-2">Não</span>';
                        }
                    },
                },         
                {
                    targets: [-1],
                    orderable: false,
                    render: function(data, type, row) {
                        return '\
                            <button type="button" onclick="ped_esp_edt(' + row.ped_esp_id + ')" class="btn btn-light-success btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" value="update" title="Editar">\
                                <i class="flaticon-edit"></i>\
                            </button> \
                            <button type="button" onclick="ped_esp_del(' + row.ped_esp_id + ')" class="btn btn-light-danger btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" title="Remover">\
                                <i class="flaticon-delete"></i>\
                            </button>\
                        ';
                    },
                },
            ],
        });  
    };

    return {
        //main function to initiate the module
        init: function() {
            kt_ped_esp();
        },
    };
}();

var tabela_ped_ent = function() {
    var kt_ped_ent = function() {
        
        var table = $('#kt_ped_ent');
        
        // Destrói a instância existente do DataTable, se houver
        if ($.fn.DataTable.isDataTable('#kt_ped_ent')) {
            table.DataTable().destroy();
        }

        // Inicializa o DataTable novamente com as novas configurações
        table.on('processing.dt', function (e, settings, processing) {
            if (processing) {
                Toast.fire({
                    icon: 'success',
                    title: 'Sucesso! Carregando os dados ...'
                });
            } else {
                Toast.close();
            }
        }).DataTable({
            responsive: true,
            processing: true,
            pageLength: 10,
            paging: false,
            language: {
                processing:     "Processamento em andamento...",
                search:         "Pesquisar:",
                lengthMenu:     "MENU registros por página",
                info:           "Mostrando de START até END de TOTAL registros",
                infoEmpty:      "Mostrando 0 até 0 de 0 registros",
                infoFiltered:   "(Filtrados de MAX registros)",
                infoPostFix:    "",
                loadingRecords: "Carregando registros...",
                zeroRecords:    "Nenhum registro encontrado",
                emptyTable:     "Nenhum registro encontrado",
                paginate: {
                    first:      "Primeiro",
                    previous:   "Anterior",
                    next:       "Avançar",
                    last:       "Último"
                },
                aria: {
                    sortAscending:  ": Ordenar coluna por ordem crescente",
                    sortDescending: ": Ordenar coluna por ordem decrescente"
                }
            },
            ajax: {
                url: '/obras/ped_ent_lista/',
                type: 'POST',
                dataSrc: 'dados',
                data: function(d) {
                    d.csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
                    d.ped_id = $("#ped_id").val();
                },
            },
            order: [[ 0, 'asc' ]],
            columns: [
                {data: 'ped_ent_id'},
                {data: 'ped_ent_dta'},
                {data: 'ped_ent_rua'},
                {data: 'ped_ent_num'},
                {data: 'ped_ent_com'},
                {data: 'ped_ent_bairro'},
                {data: 'ped_ent_cidade'},
                {data: 'ped_ent_cep'},
                {data: 'obr_prop'},
                {data: 'ped_ent_obs'}, 
                {data: null, responsivePriority: -1},
            ],
            columnDefs: [
                {
                    targets: [1],
                    render: function(data, type, row) {
                        if (data === null) {
                            return ''; // Retorna vazio se o valor for nulo
                        } else {
                            return moment(data).format("DD/MM/YYYY");
                        }
                    }
                },
                {
                    targets: [-1],
                    orderable: false,
                    render: function(data, type, row) {
                        return '\
                            <button type="button" onclick="ped_ent_edt(' + row.ped_ent_id + ')" class="btn btn-light-success btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" value="update" title="Editar">\
                                <i class="flaticon-edit"></i>\
                            </button> \
                            <button type="button" onclick="ped_ent_del(' + row.ped_ent_id + ')" class="btn btn-light-danger btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" title="Remover">\
                                <i class="flaticon-delete"></i>\
                            </button>\
                        ';
                    },
                },
            ],
        });  
    };

    return {
        //main function to initiate the module
        init: function() {
            kt_ped_ent();
        },
    };
}();

var tabela_ped_ver = function() {
    var kt_ped_ver = function() {
        
        var table = $('#kt_ped_ver');
        
        // Destrói a instância existente do DataTable, se houver
        if ($.fn.DataTable.isDataTable('#kt_ped_ver')) {
            table.DataTable().destroy();
        }

        // Inicializa o DataTable novamente com as novas configurações
        table.on('processing.dt', function (e, settings, processing) {
            if (processing) {
                Toast.fire({
                    icon: 'success',
                    title: 'Sucesso! Carregando os dados ...'
                });
            } else {
                Toast.close();
            }
        }).DataTable({
            responsive: true,
            processing: true,
            pageLength: 10,
            paging: false,
            language: {
                processing:     "Processamento em andamento...",
                search:         "Pesquisar:",
                lengthMenu:     "MENU registros por página",
                info:           "Mostrando de START até END de TOTAL registros",
                infoEmpty:      "Mostrando 0 até 0 de 0 registros",
                infoFiltered:   "(Filtrados de MAX registros)",
                infoPostFix:    "",
                loadingRecords: "Carregando registros...",
                zeroRecords:    "Nenhum registro encontrado",
                emptyTable:     "Nenhum registro encontrado",
                paginate: {
                    first:      "Primeiro",
                    previous:   "Anterior",
                    next:       "Avançar",
                    last:       "Último"
                },
                aria: {
                    sortAscending:  ": Ordenar coluna por ordem crescente",
                    sortDescending: ": Ordenar coluna por ordem decrescente"
                }
            },
            ajax: {
                url: '/obras/ped_ver_lista/',
                type: 'POST',
                dataSrc: 'dados',
                data: function(d) {
                    d.csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
                    d.ped_id = $("#ped_id").val();
                },
            },
            order: [[ 0, 'asc' ]],
            columns: [
                {data: 'ped_ver_id'},
                {data: 'ped_ver_chk'},
                {data: 'ped_ver_rnc_num'},
                {data: 'ped_ver_desc'},
                {data: 'ped_ver_sol'},
                {data: 'usu_cad_nome'},
                {data: null, responsivePriority: -1},
            ],
            columnDefs: [
                {
                    targets: [1],
                    type: "text",
                    render: function(data) {
                        if (data === true) {
                            return '<span class="btn btn-text-primary btn-hover-light-primary font-weight-bold mr-2">Sim</span>';
                        } else {
                            return '<span class="btn btn-text-danger btn-hover-light-danger font-weight-bold mr-2">Não</span>';
                        }
                    },
                },     
                {
                    targets: [-1],
                    orderable: false,
                    render: function(data, type, row) {
                        return '\
                            <button type="button" onclick="ped_ver_edt(' + row.ped_ver_id + ')" class="btn btn-light-success btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" value="update" title="Editar">\
                                <i class="flaticon-edit"></i>\
                            </button> \
                            <button type="button" onclick="ped_ver_del(' + row.ped_ver_id + ')" class="btn btn-light-danger btn-icon btn-circle"\
                                data-toggle="tooltip" data-placement="bottom" title="Remover">\
                                <i class="flaticon-delete"></i>\
                            </button>\
                        ';
                    },
                },
            ],
        });  
    };

    return {
        //main function to initiate the module
        init: function() {
            kt_ped_ver();
        },
    };
}();


var KTDropzonePedidoArquivo = function() {

    var dropzone_arquivos = function () {
        // single file upload
        $('#ped_arq_images').dropzone({
            autoProcessQueue: false,
            url: '/obras/ped_add/',
            method: 'POST',
            parallelUploads: 10,
            uploadMultiple: true,
            maxFiles: 10,
            maxFilesize: 10, // MB
            addRemoveLinks: true,
            init: function() {
                this.on("sendingmultiple", function(files, xhr, formData){
                    for (var i = 0; i < files.length; i++) {
                        formData.append("arquivos", files[i]); // Corrigido para "arquivos"
                    }
    
                    if (!formData.has('csrfmiddlewaretoken')) {
                        formData.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                    }
                });
                
                this.on("success", function(files, response) {
                    // A resposta já é um objeto JSON, não é necessário fazer parse
                    // Atualiza o src da imagem com o caminho do arquivo, se houver
                    if (response.item) {
                        $("#ped_arq_path").attr("src", response.item.ped_arq_path);
                    }
                    Swal.fire("Deu tudo certo!", response.aviso, "success");
                    this.removeAllFiles(); // Remove todos os arquivos após o upload
                    $('#frm_ped_modal').modal('hide');
                });
                
                this.on("error", function (files, errorMessage) {
                    Swal.fire("Ops! Algo deu errado!", errorMessage.responseText, "error");
                });
            },
        });
    };
    return {
        init: function() {
            dropzone_arquivos();
        },
    };
}();



jQuery(document).ready(function() {
    tab_obr.init()
    KTDropzonePedidoArquivo.init();

    pesq_cat_obr('#cat_obr')
    pesq_pessoa('#cat_pes')
    pesq_unidade('#cat_uni')
    pesq_forn('#forn')

    $('input[type=radio][name=ped_ver_chk_radio]').change(function() {
        $('#ped_ver_chk').val(this.value);
    });

    $('input[name="ped_ver_chk_radio"]').change(function() {
        if ($(this).val() === 'true') {
            // Se for "Conforme", esconda as áreas de descrição do problema e solução
            $('.row-des-prob-sol').hide();
        } else {
            // Se for "Não Conforme", mostre as áreas de descrição do problema e solução
            $('.row-des-prob-sol').show();
        }
    });
});

function abrir_modal_obr(){
    $('#obr_btn_salvar').val('insert');
    $('#obr_prop').val('');
    $('#obr_loc').val(''); 
    $('#cat_obr').val('').trigger('change'); 
    $('#aba2').hide();
    $('#frm_obr_modal').modal('show');
}

function abrir_modal_ped(){
    $('#ped_btn_salvar').val('insert');
    $('#frm_ped').trigger ('reset');
    $('#ped_dta').val('');
    $('#ped_arq_path').val('');
    var dropzoneInstance = Dropzone.forElement('#ped_arq_images');
    dropzoneInstance.removeAllFiles();
    $('#ped_qtd').val('');
    $('#ped_desc').val('');
    $('#ped_desc').val('');
    $('#forn').val('').trigger('change'); 
    $('#cat_uni').val('').trigger('change'); 
    $('#cat_pes').val('').trigger('change');
    $('#frm_ped_modal').modal('show');
    $('#aba_ped_esp').hide();
    $('#aba_ped_ent').hide();
    $('#aba_ped_ver').hide();
}

function abrir_modal_ped_esp(){
    $('#ped_esp_btn_salvar').val('insert');
    $('#ped_esp_obs').val('');
    $('#ped_esp_fispq').prop('checked', false);
    $('#ped_esp_psq').prop('checked', false); 
    $('#frm_ped_esp_modal').modal('show');
}


function abrir_modal_ped_ent(){
    $('#ped_ent_btn_salvar').val('insert');
    $('#ped_ent_rua').val('');
    $('#ped_ent_bairro').val('');
    $('#ped_ent_cidade').val('');
    $('#ped_ent_num').val('');
    $('#ped_ent_com').val('');
    $('#ped_ent_cep').val('');
    $('#ped_ent_obs').val('');
    $('#ped_ent_dta').val('')
    $('#frm_ped_ent_modal').modal('show');
}

function abrir_modal_ped_ver(){
    $('#ped_ver_btn_salvar').val('insert');
    $('#ped_ver_rnc_num').val('');
    $('#ped_ver_desc').val('');
    $('#ped_ver_sol').val('');
    $('#ped_ver_chk').prop('checked', false);
    $('#ped_ver_chk2').prop('checked', false);
    $('#frm_ped_ver_modal').modal('show');
}



function obr_add(){
    var url
    if($('#obr_btn_salvar').val() == 'update'){
        url = '/obras/obr_edt/'
        KTDropzonePedidoArquivo.save(); 
    }else{
        url = '/obras/obr_add/'
        
    }

    var frm_obr = new FormData(document.getElementById('frm_obr'));

    $.ajax({
        method: 'POST',
        url: url,
        data: frm_obr,
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
            $('#kt_obr').DataTable().ajax.reload();
            $('#frm_obr_modal').modal('hide');
            Swal.close();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        Swal.close();
        console.log(jqXHR);
        Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
    });
}

function obr_edt(obr_id){
    $.getJSON('/obras/obr_atb/',
        {
            id:obr_id
        }
    ).done(function (item) {
        $('#obr_id').val(item.obr_id);
        $('#obr_prop').val(item.obr_prop);
        $('#obr_loc').val(item.obr_loc);
        
        $('#obr_dta_ini').val(moment(item.obr_dta_ini).format("YYYY-MM-DD"));
        
        $('#cat_obr').empty();
        var cat_obr = new Option(item.cat_obr_nome,item.cat_obr_id,true,true);
        $('#cat_obr').append(cat_obr).trigger('change');
        
        $('#cat_uni').empty();
        var cat_uni = new Option(item.cat_uni_nome,item.cat_uni_id,true,true);
        $('#cat_uni').append(cat_uni).trigger('change');

        $('#obr_btn_salvar').val('update');
        $('#aba2').show();
        $('[href="#kt_tab_pane_1"]').tab('show');
        $('#frm_obr_modal').modal('show');
        tabela_ped.init()
    })
    .fail(function (jqxhr, settings, ex) {
        exibeDialogo(result.responseText, tipoAviso.ERRO);
    });
}

function obr_del(obr_id) {
    Swal.fire({
        title: "Deseja executar esta operação?",
        text: "O registro " + obr_id + " será removido permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok, desejo remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            var dados = new FormData();
                dados.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                dados.append("obr_id",obr_id);
            $.ajax({
                method: 'POST',
                url:'/obras/obr_del/',
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
                    $('#kt_obr').DataTable().ajax.reload();
                    $('#frm_obr_modal').modal('hide');
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


function ped_add() {
    var url;

    if ($('#ped_btn_salvar').val() == 'update') {
        url = '/obras/ped_edt/';
    } else {
        url = '/obras/ped_add/';
    }

    var frm_ped = new FormData(document.getElementById('frm_ped'));
    frm_ped.append('obr_id', $('#obr_id').val());

    // Obter arquivos do Dropzone.js
    var dropzoneFiles = $('#ped_arq_images').get(0).dropzone.files;
    for (var i = 0; i < dropzoneFiles.length; i++) {
        frm_ped.append('arquivos', dropzoneFiles[i]);
    }

    $.ajax({
        method: 'POST',
        url: url,
        data: frm_ped,
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
    .done(function(data, textStatus, jqXHR) {
        if (jqXHR.status === 200 && jqXHR.readyState === 4) {
            $('#kt_ped').DataTable().ajax.reload();
            $('#frm_ped_modal').modal('hide');
            Swal.close();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        Swal.close();
        console.log(jqXHR);
        Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
    });
}


function ped_edt(ped_id){
    $.getJSON('/obras/ped_atb/',
        {
            id: ped_id
        }
    ).done(function (item) {
        $('#ped_id').val(item.ped_id);
        $('#ped_num').val(item.ped_num);
        $('#ped_qtd').val(item.ped_qtd);
        $('#ped_desc').val(item.ped_desc);
        $('#ped_dta').val(moment(item.ped_dta).format("YYYY-MM-DD"));
        
        $('#cat_pes').empty();
        var cat_pes = new Option(item.pes_nome,item.pes_id,true,true);
        $('#cat_pes').append(cat_pes).trigger('change');

        $('#forn').empty();
        var forn = new Option(item.forn_nome,item.forn_id,true,true);
        $('#forn').append(forn).trigger('change');

        tabela_ped_esp.init()
        tabela_ped_ent.init()
        tabela_ped_ver.init()
        
        $('#aba_ped_esp').show();
        $('#aba_ped_ent').show();
        $('#aba_ped_ver').show();

        $('#ped_btn_salvar').val('update');
        $('#frm_ped_modal').modal('show');
    })
    .fail(function (jqxhr, settings, ex) {
        exibeDialogo(result.responseText, tipoAviso.ERRO);
    });
}

function ped_del(ped_id) {
    Swal.fire({
        title: "Deseja executar esta operação?",
        text: "O registro " + ped_id + " será removido permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok, desejo remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            var dados = new FormData();
                dados.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                dados.append("ped_id", ped_id);

            $.ajax({
                method: 'POST',
                url: '/obras/ped_del/',
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
                    $('#kt_ped').DataTable().ajax.reload();
                    $('#frm_ped_modal').modal('hide');
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


function ped_esp_add(){
    var url
    if($('#ped_esp_btn_salvar').val() == 'update'){
        url = '/obras/ped_esp_edt/'
    }else{
        url = '/obras/ped_esp_add/'
    }

    var frm_ped_esp = new FormData(document.getElementById('frm_ped_esp'));
    frm_ped_esp.append('ped_id', $('#ped_id').val());

    $.ajax({
        method: 'POST',
        url: url,
        data: frm_ped_esp,
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
            $('#kt_ped_esp').DataTable().ajax.reload();
            $('#frm_ped_esp_modal').modal('hide');
            Swal.close();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        Swal.close();
        console.log(jqXHR);
        Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
    });
}

function ped_esp_edt(ped_esp_id){
    $.getJSON('/obras/ped_esp_atb/',
        {
            id:ped_esp_id
        }
    ).done(function (item) {
        $('#ped_esp_id').val(item.ped_esp_id);
        $('#ped_esp_obs').val(item.ped_esp_obs);

        if (item.ped_esp_fispq) {
            $('#ped_esp_fispq').prop('checked', true);
        } else {
            $('#ped_esp_fispq').prop('checked', false);
        }
        if (item.ped_esp_psq) {
            $('#ped_esp_psq').prop('checked', true);
        } else {
            $('#ped_esp_psq').prop('checked', false);
        }
        $('#ped_esp_btn_salvar').val('update');
        $('[href="#kt_tab_pane_1"]').tab('show');
        $('#frm_ped_esp_modal').modal('show');
    })
    .fail(function (jqxhr, settings, ex) {
        exibeDialogo(result.responseText, tipoAviso.ERRO);
    });
}

function ped_esp_del(ped_esp_id) {
    Swal.fire({
        title: "Deseja executar esta operação?",
        text: "O registro " + ped_esp_id + " será removido permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok, desejo remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            var dados = new FormData();
                dados.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                dados.append("ped_esp_id",ped_esp_id);
            $.ajax({
                method: 'POST',
                url:'/obras/ped_esp_del/',
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
                    $('#kt_ped_esp').DataTable().ajax.reload();
                    $('#frm_ped_esp_modal').modal('hide');
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




function ped_ent_add(){
    var url
    if($('#ped_ent_btn_salvar').val() == 'update'){
        url = '/obras/ped_ent_edt/'
    }else{
        url = '/obras/ped_ent_add/'
    }

    var frm_ped_ent = new FormData(document.getElementById('frm_ped_ent'));
    frm_ped_ent.append('ped_id', $('#ped_id').val());
    $.ajax({
        method: 'POST',
        url: url,
        data: frm_ped_ent,
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
            $('#kt_ped_ent').DataTable().ajax.reload();
            $('#frm_ped_ent_modal').modal('hide');
            Swal.close();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        Swal.close();
        console.log(jqXHR);
        Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
    });
}

function ped_ent_edt(ped_ent_id){
    $.getJSON('/obras/ped_ent_atb/',
        {
            id:ped_ent_id
        }
    ).done(function (item) {
        $('#ped_ent_id').val(item.ped_ent_id);
        $('#ped_ent_rua').val(item.ped_ent_rua);
        $('#ped_ent_bairro').val(item.ped_ent_bairro);
        $('#ped_ent_cidade').val(item.ped_ent_cidade);
        $('#ped_ent_num').val(item.ped_ent_num);
        $('#ped_ent_com').val(item.ped_ent_com);
        $('#ped_ent_cep').val(item.ped_ent_cep);
        $('#ped_ent_obs').val(item.ped_ent_obs);
        $('#ped_ent_dta').val(moment(item.ped_ent_dta).format("YYYY-MM-DD"));
        $('#ped_ent_btn_salvar').val('update');
        $('[href="#kt_tab_pane_1"]').tab('show');
        $('#frm_ped_ent_modal').modal('show');
    })
    .fail(function (jqxhr, settings, ex) {
        exibeDialogo(result.responseText, tipoAviso.ERRO);
    });
}

function ped_ent_del(ped_ent_id) {
    Swal.fire({
        title: "Deseja executar esta operação?",
        text: "O registro " + ped_ent_id + " será removido permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok, desejo remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            var dados = new FormData();
                dados.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                dados.append("ped_ent_id",ped_ent_id);
            $.ajax({
                method: 'POST',
                url:'/obras/ped_ent_del/',
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
                    $('#kt_ped_ent').DataTable().ajax.reload();
                    $('#frm_ped_ent_modal').modal('hide');
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

function ped_ver_add(){
    var url
    if($('#ped_ver_btn_salvar').val() == 'update'){
        url = '/obras/ped_ver_edt/'
    }else{
        url = '/obras/ped_ver_add/'
    }

    var frm_ped_ver = new FormData(document.getElementById('frm_ped_ver'));
    frm_ped_ver.append('ped_id', $('#ped_id').val());
    $.ajax({
        method: 'POST',
        url: url,
        data: frm_ped_ver,
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
            $('#kt_ped_ver').DataTable().ajax.reload();
            $('#frm_ped_ver_modal').modal('hide');
            Swal.close();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        Swal.close();
        console.log(jqXHR);
        Swal.fire("Ops! Algo deu errado!", jqXHR.responseJSON.aviso, "error");
    });
}

function ped_ver_edt(ped_ver_id){
    $.getJSON('/obras/ped_ver_atb/',
        {
            id:ped_ver_id
        }
    ).done(function (item) {
        $('#ped_ver_id').val(item.ped_ver_id);
        $('#ped_ver_rnc_num').val(item.ped_ver_rnc_num);
        $('#ped_ver_desc').val(item.ped_ver_desc);
        $('#ped_ver_sol').val(item.ped_ver_sol);
        
        if (item.ped_ver_chk) {
            $('#ped_ver_chk').prop('checked', true);
        } else {
            $('#ped_ver_chk').prop('checked', false);
        }
        $('#ped_ver_btn_salvar').val('update');
        $('[href="#kt_tab_pane_1"]').tab('show');
        $('#frm_ped_ver_modal').modal('show');
    })
    .fail(function (jqxhr, settings, ex) {
        exibeDialogo(result.responseText, tipoAviso.ERRO);
    });
}

function ped_ver_del(ped_ver_id) {
    Swal.fire({
        title: "Deseja executar esta operação?",
        text: "O registro " + ped_ver_id + " será removido permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ok, desejo remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            var dados = new FormData();
                dados.append("csrfmiddlewaretoken", $("input[name=csrfmiddlewaretoken]").val());
                dados.append("ped_ver_id",ped_ver_id);
            $.ajax({
                method: 'POST',
                url:'/obras/ped_ver_del/',
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
                    $('#kt_ped_ver').DataTable().ajax.reload();
                    $('#frm_ped_ver_modal').modal('hide');
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
function visualizar(ped_id) {
    const image = new Viewer(document.getElementById('ped_arq_path_' + ped_id));
     image.show();
}