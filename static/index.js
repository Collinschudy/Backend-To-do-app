// const bodyEl = document.querySelector('body')
const ulElement = document.querySelector('.list')
let childEl = document.querySelector('.child')
const btnElements = document.querySelectorAll('.button')
const formElement = document.querySelector('#form')
const errorMsg = document.querySelector('#Error')
const checkboxes = document.querySelectorAll('.check-comp');


for (let i = 0; i < btnElements.length; i++){
    const btnEl = btnElements[i]
    btnEl.onclick = function(e){
        let todoId = e.target.dataset['id'];
        fetch('/todo/'+ todoId, {
            method: 'DELETE'
           
        })
       
    }
}


for (let i = 0; i < checkboxes.length; i++){
    const checkbox = checkboxes[i];
    checkbox.onchange = function(e) {
        const newCompleted = e.target.checked;
        const todoId = e.target.dataset['id'];
        fetch('/todo/' + todoId + '/set-completed', {
            method: 'POST',
            body: JSON.stringify({
                'completed': newCompleted
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(){
            errorMsg.className = 'hidden'
        })
        .catch(function() {
            errorMsg.className = ''
        })

    }
}
formElement.onsubmit = function (e) {
    e.preventDefault()
    fetch('/todo/create', {
        method: 'POST',
        body: JSON.stringify({
            'description': document.getElementById('description').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            console.log(jsonResponse);

            const liItem = document.createElement('LI');
            liItem.innerHTML = jsonResponse['description'];
            ulElement.appendChild(liItem);
            errorMsg.className = 'hidden';
        })
        .catch(function() {
            errorMsg.className = ''
        })

}