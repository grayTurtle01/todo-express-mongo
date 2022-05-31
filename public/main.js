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
        location.reload() 
    })
}

function updateStates(){
    checks = document.querySelectorAll('input[type=checkbox]')

    for( check of checks ){
        state = check.getAttribute('state')
        if( state == 'true')
            check.checked = true
        else
            check.checked = false    
    }

}

updateStates()