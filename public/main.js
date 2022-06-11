function deleteTask(btn){
    id = btn.id
    fetch("/tasks", {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': id})
    })
    .then( res => res.json() )
    .then( data => {
        console.log(data)
        location.reload()
    })
}

function openEditor(btn){
    id = btn.id
    location.replace("/tasks/edit/"+id)
}

function toggleState(check){
    id = check.getAttribute('task_id')

    fetch("/tasks/toggle/" + id)
    .then( res => res.json())
    .then( task => {
   
        console.log(task)

        row = check.parentNode.parentNode

        // update Content
        content = row.querySelector('.content')
        content.classList.toggle('done')
        
        // update done-column
        state = row.querySelector('.state')
        if( state.innerText == 'true' )
            state.innerText = 'false'
        else
            state.innerText = 'true'

        // location.reload()
    })
}

function setInitialStates(){
    
    rows = document.querySelectorAll('.row')

    for( row of rows ){
        content = row.querySelector('.content')
        state = row.querySelector('.state')
        check = row.querySelector('input[type=checkbox]')


        if( state.innerText == 'true'){
            content.classList.add('done')    
            check.checked = true
        }    
    }

}

function addLike(btn){
    id = btn.getAttribute('task_id')
    
    fetch('/tasks/addLike', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify({
            id : id
        })

    })
    .then( res => res.json() )
    .then( data => {
        console.log(data)
        location.reload()
    })

}

function upRow(btn){
    let row = btn.parentNode.parentNode
    let id = row.getAttribute('task_id')

    fetch('/tasks/upRow/' + id)
    // fetch('/tasks/upRow/')
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            location.reload(true)
        })
        .catch( err => console.log(err))

}


setInitialStates()