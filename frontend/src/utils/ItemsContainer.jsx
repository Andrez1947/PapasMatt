import { Item } from "./Item";
import { PRODUCTOS, LEGAL, MICUENTA, HORARIOS } from "./FMenu";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-2">
      <Item Links={PRODUCTOS} title="PRODUCTOS" />
      <Item Links={LEGAL} title="LEGAL" />
      <Item Links={MICUENTA} title="MI CUENTA" />
      <Item Links={HORARIOS} title="HORARIOS" />
    </div>
  );
};

export default ItemsContainer;