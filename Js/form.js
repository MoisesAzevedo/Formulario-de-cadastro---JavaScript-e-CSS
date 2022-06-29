function testaFormulario(e){
    e.preventDefault();


/*     for (i in e.target.elements['phone'].value) {
        if ('0123456789'.indexOf(e.target.elements['phone'].value[i]) == -1){
            alert('Somente números são permitidos no campo telefone');
            return false;
        }
    } */
 
    var phonePattern = /[^0-9-() ]+/g      //Pattern: padrão em inglês  // g: Pegue a string inteira, não pare na primeira que encontrar // ^: se não for número // +: pega todos os números (vai ter mais de um character na lista)
    console.log(phonePattern)            

    if (phonePattern.test(e.target.elements['phone'].value)) {               
        alert('Apenas números são permitidos no campo telefone');   
        return false
    }

    if (e.target.elements['phone'].value.replace(/[-()]/g, '').length < 11) {
        alert('Número inválido');   
        return false
    }
   
    var peopleRaw = localStorage.getItem('people')
    if (peopleRaw != null) {
        var people = JSON.parse(peopleRaw)
    } else {
        var people = [];
    }

    if (id) {
        people[id] = {
            name: e.target.elements['name'].value ,
            tel: e.target.elements['phone'].value ,
            xp: (e.target.elements['xp'].value == 'true')
        } 
    }else {
        people.push({
            name: e.target.elements['name'].value ,
            tel: e.target.elements['phone'].value ,
            xp: (e.target.elements['xp'].value == 'true')
        })
    }
    
    localStorage.setItem('people', JSON.stringify(people))

    document.getElementById('goHome').click()
}

var urlPrincipal = new URL(window.location.href)   //antes de chegar nisso, criamos o link com um novo parâmetro no script.js; Ele também vasculhou umas coisas 

var id = urlPrincipal.searchParams.get('person')
if (id !== null) {          //Diferente esta com dois sinais de igual ('!=='), porque o valor pode ser 0
    console.log(id)
    var peopleRaw = localStorage.getItem('people')
    if (peopleRaw != null) {
        var people = JSON.parse(peopleRaw)
    } else {
        var people = [];
    }

    console.log(people[id])

    document.getElementById('name').value = people[id].name
    document.getElementById('phone').value = people[id].tel
    if (people[id].xp) {
        document.getElementById('xp-yes').checked = true
    } else {
        document.getElementById('xp-no').checked = true
    }
} 

function testaCampoTelefone(e) {
    e.preventDefault()
    console.log(e)

    if (e.target.value.length == 0) {
        e.target.value += '('
    }
    
    if (e.target.value.length == 3) {
        e.target.value += ')'
    }
   
    if (e.target.value.length  == 4) {
        e.target.value+= ' '
    }

    if (e.target.value.length == 10) {
        e.target.value += '-'
    }
    
    if ((/[0-9 -()]/g).test(e.key) && e.target.value.length < 15 ) {            
        e.target.value += e.key     // +=: concatena
    }
}

/* RESALVA: Os testes que usam a variável "phonePattern" (function testaFormulario(e)), não estão sendo usados, por causa dos testes da function testaCampoTelefone(e).
Porém, teste nunca é demais, então é preciso manter ambos os testes - tanto no frontend, quanto no backend - para o caso de acontecer alguma falha no testaCampoTeledone(e).
 */
  