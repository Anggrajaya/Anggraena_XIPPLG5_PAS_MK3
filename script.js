const navEl=document.querySelector('.navbar');
window.addEventListener('scroll',() =>{
    if(window.scrollY >= 56){
        navEl.classList.add('navbar-scrolled');
    }
    else if(window.scrollY < 56){
        navEl.classList.remove('navbar-scrolled');
    }
})
//memanggil data ke ke html//

document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'pongo', img: 'catalog_1.png', price: 300000 },
            { id: 2, name: 'Pago', img: 'catalog_2.png', price: 300000 },
            { id: 3, name: 'Pego', img: 'catalog_3.png', price: 300000 },
            { id: 4, name: 'Dago', img: 'catalog_4.png', price: 300000 },
            { id: 5, name: 'Bogo', img: 'catalog_5.png', price: 300000 },
            { id: 6, name: 'Bago', img: 'catalog_6.png', price: 300000 },
            { id: 7, name: 'Bago', img: 'catalog_7.png', price: 300000 },
            { id: 8, name: 'Bago', img: 'catalog_8.png', price: 300000 }
        ]
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if (!cartItem) {
              this.items.push({ ...newItem, quantity: 1, total: newItem.price });
              this.quantity++;
              this.total += newItem.price;
            } else {
              this.items = this.items.map((item) => {
                if (item.id !== newItem.id) {
                  return item;
                } else {
                  item.quantity++;
                  item.total = item.price * item.quantity;
                  this.quantity++;
                  this.total += item.price;
                  return item;
                }
                })
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);
      
            if (cartItem.quantity > 1) {
              this.items = this.items.map((item) => {
                if (item.id !== id) {
                  return item;
                } else {
                  item.quantity--;
                  item.total = item.price * item.quantity;
                  this.quantity--;
                  this.total -= item.price;
                  return item;
                }
              });
            } else if (cartItem.quantity === 1) {
              this.items = this.items.filter((item) => item.id !== id);
              this.quantity--;
              this.total -= cartItem.price;
            }
          },
    });
});

//mengkonfersi price ke rupiah//
const rupiah =(number) => {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits : 0,
    }).format(number);
}
//------------//

