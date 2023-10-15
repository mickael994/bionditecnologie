class Slider
{
  constructor(config)
  {
    // On récupère la config passée en paramètre et on lui affecte des valeur par défaut si nécessaire
    this.config = {};
    this.config.domTarget = config.domTarget || '.slider',
      this.config.transitionType = config.transitionType || 'random';
    this.config.transitionTimer = config.transitionTimer || 600;
    this.config.autoSlideTimer = config.autoSlideTimer || 4000;
    this.config.picList = config.picList || [];

    // On déclare l'état du slider à "inactif"
    this.isActive = false;

    // On récupère l'élément DOM correspondant à la racine de notre slider
    this.domElement = document.querySelector(this.config.domTarget);

    // On ajoute les animations potentielles
    this.direction = {};
    this.direction.up = this.direction[0] = 'translateY(-100%)';
    this.direction.down = this.direction[1] = 'translateY(100%)';
    this.direction.left = this.direction[2] = 'translateX(-100%)';
    this.direction.right = this.direction[3] = 'translateX(100%)';

    // On charge le contenu
    this.loadContent();
  }

  loadContent()
  {
    // On vérifie que l'élément DOM existe
    if(!this.domElement) throw "Slider - L'élément spécifié est introuvable";

    // Ajout du div qui contiendra les boutons de navigation
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('slider-buttons');
    this.domElement.appendChild(buttonContainer);

    this.config.picList.forEach((slide, index) =>
                                {
      // Ajout des slides
      let slideContainer = document.createElement('div');
      slideContainer.setAttribute('data-index', index);
      slideContainer.classList.add('slider-pics');
      slideContainer.style.backgroundImage = `url(${slide.path})`;
      slideContainer.innerHTML = slide.content;
      slideContainer.style.transition = `transform ${this.config.transitionTimer}ms ease-in-out`;
      this.domElement.appendChild(slideContainer);

      // Ajout des boutons
      let button = document.createElement('button');
      button.setAttribute('data-index', index);
      buttonContainer.appendChild(button);

      // Action des boutons
      button.addEventListener('click', event =>
                              {
        // On vérifie que l'animation du slider est terminée avant de pouvoir cliquer
        if(!event.target.classList.contains('active') && !this.isActive)
        {
          // On retire la classe "active" des boutons
          this.buttonList.forEach((element) => element.classList.remove('active'));

          // On affecte la classe "active" uniquement au bouton cliqué
          event.target.classList.add('active');

          // On passe l'état du slider à "actif"
          this.isActive = true;

          // On affiche le slide correspondant au bouton cliqué
          this.showSlide(event.target.getAttribute('data-index'));
        }
      })
    });

    // On stock notre liste de bouton et on clique sur le premier élément
    this.buttonList = this.domElement.querySelectorAll('.slider-buttons button');
    this.buttonList[0].click();
  }

  showSlide(index)
  {
    // On interrompt l'intervalle
    if(this.interval) clearInterval(this.interval);

    // On doit rechercher nos élements à chaque fois car leur ordre est modifié
    let firstSlide = this.domElement.querySelectorAll('.slider-pics')[0];
    let lastSlide = this.domElement.querySelectorAll('.slider-pics')[this.config.picList.length - 1];
    let currentSlide = this.domElement.querySelector(`.slider-pics[data-index="${index}"]`);

    // On place le nouvel élément à afficher en derniere position
    this.domElement.insertBefore(currentSlide, lastSlide);

    // Si la transition est dans la liste on l'affiche, sinon on lance une transition aléatoire
    lastSlide.style.transform = this.direction[this.config.transitionType] 
    || this.direction[Math.floor(Math.random() * 4)];

    setTimeout(() =>
               {
      // Une fois le nouvel élément affiché, on replace correctement l'ancien en première position
      lastSlide.style.transform = 'translate(0%)';
      this.domElement.insertBefore(lastSlide, firstSlide);

      // On repasse l'état du slider en "inactif"
      this.isActive = false;

      // On réactive l'intervalle (slide automatique)
      this.interval = setInterval(() =>
                                  {
        // On clique sur le bouton suivant (ou le premier si c'est nécessaire)
        // On multiplie index par 1 pour forcer sa conversion en int
        let nextSlide = index*1+1 < this.config.picList.length ? index*1+1 : 0;
        this.buttonList[nextSlide].click();

      }, this.config.autoSlideTimer);

    }, this.config.transitionTimer);
  }
}

let slider = new Slider(
{
    domTarget : '.slider',
    picList :
    [
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/4kwp0.jpg', content : '<h3>4 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/ComplessoCondominiale0.jpg', content : '<h3>Complesso condominiale</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/ComplessoCondominiale1.jpg', content : '<h3>Complesso condominiale</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/4kwp1.jpg', content : '<h3>4 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/3kwpIntegrazione.jpg', content : '<h3>Integrazione 3 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/6kwp0.jpg', content : '<h3>6 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/10kwp2.jpg', content : '<h3>10 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/10kwp3.jpg', content : '<h3>10 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/6kwp1.jpg', content : '<h3>6 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/StrumentoManutentivo.jpg', content : '<h3>Strumento Manutentivo</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/6kwp2.jpg', content : '<h3>6 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/16kwp0.jpg', content : '<h3>16 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/8kwp0.jpg', content : '<h3>8 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/10kwp0.jpg', content : '<h3>10 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/10kwp1.jpg', content : '<h3>10 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/12kwp0.jpg', content : '<h3>12 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/14kwp0.jpg', content : '<h3>14 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/10kwp4.jpg', content : '<h3>10 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/10kwp5.jpg', content : '<h3>10 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/15kwp0.jpg', content : '<h3>15 Kwp</h3>' },
      { path : 'https://www.bionditecnologie.it/assets/img/LavoriEseguiti/15kwp1.jpg', content : '<h3>15 Kwp</h3>' },



    ],
});