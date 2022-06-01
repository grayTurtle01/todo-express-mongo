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
   
        row = check.parentNode.parentNode

        // update Content
        content = row.querySelector('.content')
        content.classList.toggle('done')
        
        // update done-column
        state = row.querySelector('.state')
        state.innerText = task.done

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

setInitialStates()