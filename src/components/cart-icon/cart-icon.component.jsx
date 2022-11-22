import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';

import { CartContext } from '../../contexts/cart.context';
import { ShoppingIcon, CartIconContainer, CartItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const location = useLocation();
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location, setIsCartOpen]);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <CartItemCount>{cartCount}</CartItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;