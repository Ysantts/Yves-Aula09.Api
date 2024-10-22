$(document).ready(function () {
    $('#cnpj-message').text("").hide();
    $('#company-name-span').hide();
    $('#company-city-span').hide();
    $('#company-place-span').hide();
    $('#company-zip-span').hide();

    $('#cnpj-value').on('input', function () {
        const value = $(this).val();

        $(this).removeClass('border-danger').addClass('border-success'); // Adiciona a borda de sucesso

        if (!value) {
            $('#cnpj-message').text("").hide();
            $('#company-name-span').hide();
            $('#company-city-span').hide();
            $('#company-place-span').hide();
            $('#company-zip-span').hide();
            $(this).removeClass('border-success border-danger');
        }
        
    });

    $('#cnpj-form').on('submit', async function (event) {
        event.preventDefault();

        const cnpj = $('#cnpj-value').val().replace(/\//g, '');

        const cnpjData = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .catch(error => {
                // Limpa mensagens anteriores e define borda de erro
                $('#cnpj-message').text("").hide();
                $('#cnpj-value').removeClass('border-success').addClass('border-danger'); // Adiciona a borda de erro

                if (error.status === 404) {
                    Swal.fire({
                        title: "Erro",
                        text: "CNPJ não foi encontrado",
                        icon: "error"
                    });
                } 
                if (error.status === 400) {
                    Swal.fire({
                        title: "Erro",
                        text: "O CNPJ foi digitado de maneira incorreta",
                        icon: "error"
                    });
                } 
                if (error.status != 200) {
                    Swal.fire({
                        title: "Erro",
                        text: "Ocorreu algum erro desconhecido",
                        icon: "error"
                    });
                }
            });

        if (cnpjData) {
            $('#cnpj-value').removeClass('border-danger').addClass('border-success'); // Adiciona a borda de sucesso

            $('#company-name-span').show();
            $('#company-name').text(cnpjData.razao_social);

            $('#company-city-span').show();
            $('#company-city').text(cnpjData.municipio);

            $('#company-place-span').show();
            $('#company-place').text(cnpjData.logadouro);

            $('#company-zip-span').show();
            $('#company-zip').text(cnpjData.cep);
        }
    });
});
