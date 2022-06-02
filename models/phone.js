class Phone {
  constructor(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    id,
    quantity
  ) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.id = id;
    this.quantity = quantity;
  }

  render() {
    return `
    <div class="card col-4 mb-4">

        <div class="card-body card-item">
        <img src=${this.img} class="phone-img" alt=${this.name}/>
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text desc">
        ${this.desc}
        </p>
        <button class="btn btn-success cart-button" onclick="addToCart(${this.id})">Cart</button>
        </div>
  </div>
        `;
  }
}
