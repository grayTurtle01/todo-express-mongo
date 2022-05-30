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

