var peopleRaw = localStorage.getItem('people')
if (peopleRaw != null) {
    var people = JSON.parse(peopleRaw)
} else {
    var people = [];
}

function desenhaTabela() {

    currentlines = [...document.querySelectorAll('table.lista tbody .dinamic-content')];
    currentlines.forEach((element) => {
        element.remove() 
    })

    for (person in people){
        document.querySelector('table.lista tbody').innerHTML += `
            <tr class="dinamic-content" style="background-color: ${((person % 2 == 0) ? '#fff' : '#eee' ) }">
                <td >
                    ${people[person].name}
                </td>          
                <td>
                     ${people[person].tel}    
                </td>
                <td>
                    ${(people[person].xp ? '<strong style="color:green">Sim</strong>': '<strong style="color:red">Não</strong>') }  
                </td>
                <td id='as' >
                    <button onclick="deleteUser(${person})"> Excluir </button>
                    <button id='but-a'> <a href="./form.html?person=${person}">Editar</a> </button>
                </td>
            </tr>
        `
    }
}


function deleteUser(p){
    people.splice(p, 1);   
    desenhaTabela(); 
    localStorage.setItem('people', JSON.stringify(people))
}

desenhaTabela()