const api = 'https://api.shrtco.de/v2/';
let compteur = 0;


document.addEventListener('DOMContentLoaded', function() {

    const button = document.getElementById('shorten-it');
    const history = document.getElementById('link-history');
    const invalidLink = document.getElementById('invalid-link');

    button.addEventListener('click', function() {

        const userLink = document.getElementById('link-input').value;
        if (userLink === '') {
            invalidLink.classList.remove('hidden');
            return
        }
        if (!invalidLink.classList.contains('hidden')){
            invalidLink.classList.add('hidden');
        }

        fetch(`${api}shorten?url=${userLink}`)
        .then(response => response.json())
        .then(data => {
        
        const shortLink = data.result.short_link;
        console.log('yo');

        const container = document.createElement('div');
        container.id = `container${compteur}`;
        container.classList.add("container");
        container.classList.add('container');
        const sub1 = document.createElement('div');
        const subSub1 = document.createElement('p');
        subSub1.textContent = userLink;
        subSub1.classList.add('alinea-left', 'sub-sub1');
        const subSub2 = document.createElement("div");
        subSub2.id = `close${compteur}`;
        subSub2.classList.add('sub-sub2');
        subSub2.textContent = 'Close';
        subSub2.onclick = () => close(container);
        sub1.classList.add('sub1', 'custflex')
        const sub2 = document.createElement('p');
        sub2.textContent = shortLink;
        sub2.classList.add('sub2', 'custflex');
        sub2.id= 'shorted-link'+compteur;
        const sub3 = document.createElement('div');
        sub3.classList.add('sub3', 'custflex');
        sub3.textContent = "Copy me !";
        sub3.id=`${compteur}`;
        console.log(sub3.id);
        sub3.onclick = () => copy(sub3.id);

        sub1.appendChild(subSub1);
        sub1.appendChild(subSub2);
        container.appendChild(sub1);
        container.appendChild(sub2);
        container.appendChild(sub3);
        history.appendChild(container);
        console.log(shortLink);

        compteur += 1;

        })
        .catch(error => {
        console.log("Erreur lors de la requête : ", error);
        alert("erreur lors de l'opération");
        });
    });
});

function copy(id) {

    const textToCopy = document.getElementById('shorted-link'+id).textContent;  
    const button = document.getElementById(id);
    button.style.backgroundColor = '#1E3A8A';
    button.textContent = 'Link copied !';   

    navigator.clipboard.writeText(textToCopy).then(() => {
    console.log('Content copied to clipboard');
      },() => {
        console.error('Failed to copy');
      });
        
}

function close(element) {

    console.log("fonction auto destruction");

    element.remove();
          
}

const openMobileMenu = document.getElementById('open-mobile-menu');
const mobileMenu = document.getElementById('mobile-menu')

openMobileMenu.addEventListener('click', function() {
    event.stopPropagation();
    if(mobileMenu.classList.contains('flex')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        return;
    }
    console.log('ouvrir menu');
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
}
)

document.addEventListener('click', function(event) {
    console.log('fermer menu');
    if (mobileMenu.classList.contains('flex')) {
        if (!mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('flex');
            mobileMenu.classList.add('hidden');
        }
    }
  });