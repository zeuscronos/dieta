const { useState, useEffect } = React;

import productos from "./productos.js";

const getUrlParams = () => {
  let params = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    params[key] = value;
  });
  return params;
};

const Producto = ({ producto }) => {
  return (
    <div className="producto">
      <div className={`genero ${producto.genero}`}>{producto.genero}</div>
      <div style={{ padding: '6px 6px 0' }}>
        <div className="descripcion">{producto.descripcion}</div>
        <div style={{ textAlign: 'right', marginTop: '6px' }}>
          <span>Marca: </span><span className="marca_valor">{producto.marca}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <table style={{ display: 'inline-block' }}>
            <tr>
              <td><span>Ref.: {producto.referencia}</span></td>
              <td>
                <a className="url" target="_blank" href={producto.url} ></a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <img className="vistaprevia" src={`photos/img_${producto.referencia}.jpg`} />
        <span className="precio">{sprintf('%0.2f', producto.precio)} €</span>
      </div>
    </div>
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
      <div>
        {
          productos.filter(producto => filteredRefs.length === 0 || filteredRefs.includes(producto.referencia)).map(producto => <Producto producto={producto}></Producto>)
        }
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
