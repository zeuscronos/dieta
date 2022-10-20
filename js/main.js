const { useState, useEffect } = React;

import products from "./products.js";

const colors = {
  'Mercadona': '#1485ff',
};

const getUrlParams = () => {
  let params = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    params[key] = value;
  });
  return params;
};

const Producto = ({ product }) => {
  return (
    <a href={product.link} className="product" target="_blank">
      <div className={`store ${product.store}`} style={{ backgroundColor: colors[product.store]}}>{product.store}</div>
      <div style={{ padding: '6px 6px 0' }}>
        <div className="description">{product.description}</div>
        <div style={{ textAlign: 'right' }}>
          <table style={{ display: 'inline-block' }}>
            <tr>
              <td><span>Ref.: {product.ref}</span></td>
            </tr>
          </table>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <img className="preview" src={product.image} />
        <span className="price">{sprintf('%0.2f', product.price)} €</span>
      </div>
    </a>
  );
};

const App = () => {
  const [ filter, setFilter ] = useState('');
  const [ filteredRefs, setFilteredRefs ] = useState([]);

  useEffect(() => {
    const params = getUrlParams();
    const filter = params['ids'] || '';
    const filteredRefs = [ ... new Set(filter.split(',').map(ref => ref.trim()).filter(ref => ref != '')) ];
    setFilter(filteredRefs.join(', '));
    setFilteredRefs(filteredRefs);
  }, []);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setFilter(filter);
    setFilteredRefs(filter.split(',').map(ref => ref.trim()).filter(ref => ref != ''));
  };

  return (
    <div>
      <div>
        Filtro: <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <div style={{marginTop: '10px'}}>
        {
          products.filter(product => filteredRefs.length === 0 || filteredRefs.includes(product.ref)).map(product => <Producto product={product}></Producto>)
        }
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
