
function pesq_forn(field){
    $(field).select2({
        width: "100%",
        allowClear: true,
        placeholder: "Pesquise aqui...",
        language: {
            "noResults": function(){
                return "Nenhum resultado encontrado";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        ajax: {
            url: '/fornecedor/pesq_forn/',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                var query = {
                    term: params.term,
                }
                return query;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.forn_nome,
                            id: item.forn_id,
                            value: item.forn_id,
                            forn_id : item.forn_id,
                            forn_nome : item.forn_nome,
                            forn_cnpj : item.forn_cnpj,
                            forn_ies : item.forn_ies,
                        }
                    })
                };
            },
            transport: function (params, success, failure) {
                var $request = $.ajax(params);
                $request.then(success);
                $request.fail(failure);
                return $request;
            }
        }
    });
}