let submitButton = document.querySelector('#app form button')
let zipCodeField = document.querySelector('#app form input')
let content = document.querySelector('#app main')

submitButton.addEventListener('click', run())

function run(event) {
    event.preventDefault();
    let zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '') // caso o user digite com espaço entre os números substitui por nada
    zipCode = zipCode.replace('.', '') // caso o user digite pontos substitui por nada
    zipCode = zipCode.replace('-', ''); // caso o user digite o traço substitui por nada
    zipCode = zipCode.trim(); // tira todos os espaçamentos tanto no inicio quanto no final

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
        if (response.data.erro) {
           throw new Error('CEP inválido')
        }
        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf)
        
    })
    .catch(function (error) {
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })
}

function createLine(text) {
    let line = document.createElement('p')
    let text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}
