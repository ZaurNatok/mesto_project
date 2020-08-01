export class CardList {
  constructor(container, createCard, api) {
    this.container = container;
    this.createCard = createCard;
    this.api = api;
    this.sort = this.sort.bind(this);
    this.sortReverse = this.sortReverse.bind(this);
    this.find = this.find.bind(this);
    this.loader = this.loader.bind(this);
    this.counterShowNewsStart = 0;
  }

  addCard(name, link, likes, id) {
    const { placeContainer } = this.createCard(name, link, this.container, likes, id, this.api);
    this.cards.push(placeContainer);
    this.container.appendChild(placeContainer);
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }

  render(cards) {
this.cards = cards;
    
    localStorage.setItem('cards', JSON.stringify(cards));
    for(let i = this.counterShowNewsStart; i < this.counterShowNewsStart + 21; i++) {
      this.createCard(cards[i].name, cards[i].link, this.container, cards[i].likes, cards[i]._id, this.api, cards[i].owner._id);
      this.loader(false);
      const count = document.querySelector('.filter__count');
        count.textContent = 'Всего карточек:' + ' ' + this.cards.length;
    }
  }

  loadMore(cards) {
    this.counterShowNewsStart += 21;
    this.render(cards);
}

  firstLoad() {
    
    this.loader(true);
    this.api.getInitialCards()
      .then((data) => {
      	if(data.length > 1000) {
      		data = data.splice(0,1000)
      	}
        this.render(data);
        const count = document.querySelector('.filter__count');
        count.textContent = 'Всего карточек:' + ' ' + data.length;
      })
      .catch((err) => {
        console.log(err);
        console.log('Ошибка. Запрос не выполнен');
      });
  }

  sort() {
    this.container.textContent = '';

    let newCards = this.cards;
    let newArrCards = newCards.sort(function(a, b) {
      let cardA = a.likes, cardB = b.likes
      if(cardA < cardB) return -1
      if(cardA > cardB) return 1
      return 0
    });
    this.render(newArrCards);
  }


  sortReverse() {
    this.container.textContent = '';
    
    let newCards = this.cards;
    let newArrCards = newCards.sort(function(a, b) {
      let cardA = a.likes, cardB = b.likes
      if(cardA < cardB) return -1
      if(cardA > cardB) return 1
      return 0
    });
    this.render(newArrCards.reverse());
  }

  find(){
    this.container.textContent = '';

    const findCard = document.querySelector('.filter__find')
    let finded = this.cards.filter(item => item.name.toLowerCase().includes(findCard.value));
    this.render(finded);
  }

  loader(isLoading) {
    const loader = document.querySelector('.loader');
    if(isLoading) {
      loader.style.display = 'flex';
    }
    else {
      loader.style.display = 'none';
    }
    
  }

}
