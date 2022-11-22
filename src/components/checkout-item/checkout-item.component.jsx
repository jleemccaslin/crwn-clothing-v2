import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { 
  ImageContainer, 
  CheckoutItemContainer, 
  BaseSpan, 
  Quantity, 
  Arrow, 
  Value,
  RemoveButton 
} from './checkout-item.styles';

const CheckoutItem = ({ checkoutItem }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
  const { name, imageUrl, price, quantity } = checkoutItem;

  const addItemHandler = () => addItemToCart(checkoutItem);
  const removeItemHandler = () => removeItemFromCart(checkoutItem);
  const clearItemHandler = () => clearItemFromCart(checkoutItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow><br />
        <Value>{quantity}</Value><br />
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan className='price'>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;