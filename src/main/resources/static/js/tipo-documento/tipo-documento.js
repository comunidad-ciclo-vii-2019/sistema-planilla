$(document).ready(function(){

    $('#tipoDocumentoModal').on('show.bs.modal', function(event){

        $('#divError').hide();

        var modal = $(this);
        var link = $(event.relatedTarget);

        var idTipoDocumento = link.data('id-tipo-documento');
        var tipoDocumento = link.data('tipo-documento');
        var formato = link.data('formato');

        modal.find('.card-body #idTipoDocumentoInput').val(idTipoDocumento);
        modal.find('.card-body #tipoDocumentoInput').val(tipoDocumento);
        modal.find('.card-body #formatoInput').val(formato);


    });

    $('#tipoDocumentoBtnNuevo').on('click',function () {

        var modal = $('#tipoDocumentoModal');

        modal.find('.modal-header #tipoDocumentoModalTitle').text('Crear Tipo de Documento');
        modal.find('.card-body #idTipoDocumentoInput').attr('disabled',true);

        modal.find('.card-body #tipoDocumentoInput').attr('disabled',false);
        modal.find('.card-body #tipoDocumentoInput').attr('readonly',false);
        modal.find('.card-body #tipoDocumentoInput').attr('class','form-control');

        modal.find('.card-body #formatoInput').attr('disabled',false);
        modal.find('.card-body #formatoInput').attr('readonly',false);
        modal.find('.card-body #formatoInput').attr('class','form-control');

        modal.find('.card-footer #tipoDocumentoBtnSubmit').text('Crear');
        modal.find('.card-footer #tipoDocumentoBtnSubmit').attr('class','btn btn-primary');
        modal.find('.card-footer #tipoDocumentoBtnCancelar').text('Cancelar');
        modal.find('.card-footer #tipoDocumentoBtnCancelar').attr('class','btn btn-secondary');

    });

    $('.tipoDocumentoBtnEditar').on('click',function () {

        var modal = $('#tipoDocumentoModal');

        modal.find('.modal-header #tipoDocumentoModalTitle').text('Editar Tipo de Documento');
        modal.find('.card-body #idTipoDocumentoInput').attr('disabled',false);

        modal.find('.card-body #tipoDocumentoInput').attr('disabled',false);
        modal.find('.card-body #tipoDocumentoInput').attr('readonly',false);
        modal.find('.card-body #tipoDocumentoInput').attr('class','form-control');

        modal.find('.card-body #formatoInput').attr('disabled',false);
        modal.find('.card-body #formatoInput').attr('readonly',false);
        modal.find('.card-body #formatoInput').attr('class','form-control');

        modal.find('.card-footer #tipoDocumentoBtnSubmit').text('Editar');
        modal.find('.card-footer #tipoDocumentoBtnSubmit').attr('class','btn btn-primary');
        modal.find('.card-footer #tipoDocumentoBtnCancelar').text('Cancelar');
        modal.find('.card-footer #tipoDocumentoBtnCancelar').attr('class','btn btn-secondary');

    });

    $('.tipoDocumentoBtnVer').on('click',function () {

        var modal = $('#tipoDocumentoModal');

        modal.find('.modal-header #tipoDocumentoModalTitle').text('Información de Tipo de Documento');

        modal.find('.card-body #tipoDocumentoInput').attr('readonly',true);
        modal.find('.card-body #tipoDocumentoInput').attr('class','form-control-plaintext');

        modal.find('.card-body #formatoInput').attr('readonly',true);
        modal.find('.card-body #formatoInput').attr('class','form-control-plaintext');

        modal.find('.card-footer #tipoDocumentoBtnSubmit').attr('class','d-none');
        modal.find('.card-footer #tipoDocumentoBtnCancelar').text('Aceptar');
        modal.find('.card-footer #tipoDocumentoBtnCancelar').attr('class','btn btn-info');

    });

    $('#tipoDocumentoModalDisable').on('show.bs.modal', function(event){

        var modal = $(this);
        var link = $(event.relatedTarget);

        var idTipoDocumento = link.data('id-tipo-documento');
        var tipoDocumento = link.data('tipo-documento');
        var tipoDocumentoHabilitado = link.data('tipo-documento-habilitado');

        modal.find('.modal-body #idTipoDocumentoInputDisable').val(idTipoDocumento);

        if(tipoDocumentoHabilitado==1){
            modal.find('.modal-header #disableModalTitle').text('Deshabilitar Tipo de Documento');
            modal.find('.modal-body #message').text('¿Está seguro que desea deshabilitar el Tipo de Documento '+tipoDocumento+'?');
            modal.find('.modal-footer #tipoDocumentoBtnSubmitDeshabilitar').text('Deshabilitar');
            modal.find('.modal-footer #tipoDocumentoBtnSubmitDeshabilitar').attr('class','btn btn-danger')
        }else{
            modal.find('.modal-header #disableModalTitle').text('Habilitar Tipo de Documento');
            modal.find('.modal-body #message').text('¿Está seguro que desea habilitar el Tipo de Documento '+tipoDocumento+'?');
            modal.find('.modal-footer #tipoDocumentoBtnSubmitDeshabilitar').text('Habilitar');
            modal.find('.modal-footer #tipoDocumentoBtnSubmitDeshabilitar').attr('class','btn btn-info')
        }
    });

    $('#tipoDocumentoBtnSubmit').click(function (e) {

        e.preventDefault();

        var form = $(this).parents('form');
        var url = form.attr('action');

        $.ajax({

            type: 'POST',
            url: url,
            data: form.serialize(),

            success: function (response) {

                if (response.status=="SUCCESS"){

                    $('#tipoDocumentoBtnSubmit').attr('disabled',true);
                    $('#divError').hide();

                    if($('#idTipoDocumentoInput').val()!=''){
                        window.location.href = document.location.origin + "/tipo-documento/index?update_success=true";

                    }else{
                        window.location.href = document.location.origin + "/tipo-documento/index?store_success=true";
                    }

                }else{

                    $('#divError').show();
                    var child = document.getElementById("ulError").lastElementChild;

                    while (child) {
                        document.getElementById("ulError").removeChild(child);
                        child = document.getElementById("ulError").lastElementChild;
                    }

                    for(i=0;i<response.result.length;i++){
                        var li = document.createElement('li');
                        var liContent = document.createTextNode(response.result[i].code);
                        li.appendChild(liContent);
                        document.getElementById("ulError").appendChild(li);
                    }

                }

            },

            error: function (e) {
                alert('Error: '+e);
            }

        });
    });

    function setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            textbox.addEventListener(event, function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });
    }

    setInputFilter(document.getElementById("formatoInput"), function(value) {
        return /^[0a-]*$/.test(value);
    });

    var store = $('#store').val();
    var update = $('#update').val();
    var enable = $('#enable').val();
    var disable = $('#disable').val();

    setTimeout(function() {$(".alert").fadeOut();},3000);

    if(store === 'true'){
        toastr.success("Tipo de Documento creado con éxito");
    }
    if(update === 'true'){
        toastr.success("Tipo de Documento editado con éxito");
    }
    if(enable === 'true'){
        toastr.info("Tipo Documento habilitado");
    }
    if(disable === 'true'){
        toastr.error("Tipo Documento deshabilitado");
    }

});