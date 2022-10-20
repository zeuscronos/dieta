const { useState } = React;

import productos from "./productos.js";

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
  const [count, setCount] = useState(0);
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      {
        productos.map(producto => <Producto producto={producto}></Producto>)
      }
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
