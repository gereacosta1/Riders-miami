const { useState, useEffect } = React;

const STORAGE_KEY = 'usedmoto_cart';

const motos = [
  {
    id: 1,
    marca: 'Honda',
    modelo: 'CB 500X',
    año: 2019,
    km: 15000,
    estado: 'Excelente',
    precio: 5500,
    img: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    marca: 'Yamaha',
    modelo: 'MT-07',
    año: 2020,
    km: 8000,
    estado: 'Como nueva',
    precio: 6800,
    img: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    marca: 'Kawasaki',
    modelo: 'Ninja 650',
    año: 2018,
    km: 22000,
    estado: 'Muy bueno',
    precio: 5200,
    img: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    marca: 'Suzuki',
    modelo: 'V-Strom 650',
    año: 2021,
    km: 5000,
    estado: 'Excelente',
    precio: 7500,
    img: 'https://images.pexels.com/photos/2519370/pexels-photo-2519370.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 5,
    marca: 'BMW',
    modelo: 'F 750 GS',
    año: 2019,
    km: 18000,
    estado: 'Muy bueno',
    precio: 9200,
    img: 'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 6,
    marca: 'Ducati',
    modelo: 'Monster 821',
    año: 2017,
    km: 25000,
    estado: 'Bueno',
    precio: 7800,
    img: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 7,
    marca: 'Triumph',
    modelo: 'Street Triple',
    año: 2020,
    km: 12000,
    estado: 'Excelente',
    precio: 8500,
    img: 'https://images.pexels.com/photos/2317711/pexels-photo-2317711.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 8,
    marca: 'KTM',
    modelo: '390 Duke',
    año: 2021,
    km: 6000,
    estado: 'Como nueva',
    precio: 4800,
    img: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (moto) => {
    const existingItem = cart.find(item => item.id === moto.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === moto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...moto, cantidad: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, cantidad } : item
      ));
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const getFilteredMotos = () => {
    let filtered = motos.filter(moto => {
      const searchLower = searchText.toLowerCase();
      return (
        moto.marca.toLowerCase().includes(searchLower) ||
        moto.modelo.toLowerCase().includes(searchLower)
      );
    });

    if (sortBy === 'precio_asc') {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'precio_desc') {
      filtered.sort((a, b) => b.precio - a.precio);
    } else if (sortBy === 'año_asc') {
      filtered.sort((a, b) => a.año - b.año);
    } else if (sortBy === 'año_desc') {
      filtered.sort((a, b) => b.año - a.año);
    }

    return filtered;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (typeof affirm === 'undefined') {
      alert('Affirm no está disponible. Por favor, recarga la página.');
      return;
    }

    const items = cart.map(item => ({
      display_name: `${item.marca} ${item.modelo} (${item.año})`,
      sku: `MOTO-${item.id}`,
      unit_price: Math.round(item.precio * 100),
      qty: item.cantidad,
      item_image_url: item.img,
      item_url: window.location.href
    }));

    const total = Math.round(getTotal() * 100);

    const checkoutObj = {
      merchant: {
        user_confirmation_url: `${window.location.origin}/.netlify/functions/affirm-confirm`,
        user_cancel_url: window.location.href,
        user_confirmation_url_action: 'POST',
        name: 'UsedMoto'
      },
      shipping: {
        name: {
          first: 'Cliente',
          last: 'UsedMoto'
        },
        address: {
          line1: 'Pendiente',
          city: 'Ciudad',
          state: 'Estado',
          zipcode: '00000',
          country: 'ESP'
        }
      },
      billing: {
        name: {
          first: 'Cliente',
          last: 'UsedMoto'
        },
        address: {
          line1: 'Pendiente',
          city: 'Ciudad',
          state: 'Estado',
          zipcode: '00000',
          country: 'ESP'
        }
      },
      items: items,
      metadata: {
        shipping_type: 'UPS Ground',
        mode: 'modal'
      },
      order_id: `ORDER-${Date.now()}`,
      currency: 'EUR',
      tax_amount: 0,
      shipping_amount: 0,
      total: total
    };

    affirm.checkout(checkoutObj);
    affirm.checkout.open();
  };

  const scrollToMotos = () => {
    document.getElementById('motos-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <span className="navbar-brand">
            <i className="bi bi-bicycle me-2"></i>
            UsedMoto
          </span>
          <button
            className="btn btn-primary position-relative"
            onClick={() => setShowCart(true)}
          >
            <i className="bi bi-cart3 me-2"></i>
            Carrito
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle cart-badge">
                {cart.reduce((sum, item) => sum + item.cantidad, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="container">
          <h1>Encuentra tu Moto Ideal</h1>
          <p>Las mejores motos usadas al mejor precio</p>
          <button className="btn btn-primary btn-lg" onClick={scrollToMotos}>
            Ver motos usadas
          </button>
        </div>
      </div>

      <div className="container my-5" id="motos-section">
        <div className="search-section rounded-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por marca o modelo..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Ordenar por...</option>
                  <option value="precio_asc">Precio: Menor a Mayor</option>
                  <option value="precio_desc">Precio: Mayor a Menor</option>
                  <option value="año_asc">Año: Más antiguo</option>
                  <option value="año_desc">Año: Más reciente</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          {getFilteredMotos().map(moto => (
            <div key={moto.id} className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm rounded-3">
                <img src={moto.img} className="card-img-top" alt={`${moto.marca} ${moto.modelo}`} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{moto.marca}</h5>
                  <h6 className="text-muted">{moto.modelo}</h6>
                  <p className="card-text small mb-2">
                    <i className="bi bi-calendar3 me-2"></i>
                    Año: {moto.año}
                  </p>
                  <p className="card-text small mb-2">
                    <i className="bi bi-speedometer2 me-2"></i>
                    {moto.km.toLocaleString()} km
                  </p>
                  <p className="card-text small mb-3">
                    <span className="badge">{moto.estado}</span>
                  </p>
                  <div className="mt-auto">
                    <p className="price-tag mb-3">${moto.precio.toLocaleString()}</p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => addToCart(moto)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`offcanvas offcanvas-end ${showCart ? 'show' : ''}`}
           tabIndex="-1"
           style={{ visibility: showCart ? 'visible' : 'hidden' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            <i className="bi bi-cart3 me-2"></i>
            Carrito de Compras
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowCart(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x" style={{ fontSize: '3rem', color: '#64748b' }}></i>
              <p className="mt-3 text-muted">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="list-group mb-3">
                {cart.map(item => (
                  <div key={item.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">{item.marca} {item.modelo}</h6>
                        <small className="text-muted">{item.año}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <button className="btn btn-outline-secondary" disabled>
                          {item.cantidad}
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                      <strong className="price-tag" style={{ fontSize: '1.1rem' }}>
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Total:</h5>
                  <h4 className="price-tag">${getTotal().toLocaleString()}</h4>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleCheckout}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Finalizar compra con Affirm
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={clearCart}
                >
                  <i className="bi bi-trash me-2"></i>
                  Vaciar carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showCart && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setShowCart(false)}
        ></div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
