
import { toCents } from './currency'

export function buildAffirmCheckout(cartItems, totals) {
  const items = cartItems.map(({ id, title, price, qty, image }) => ({
    display_name: title,
    sku: String(id),
    unit_price: toCents(price),
    qty,
    item_url: window.location.origin + '/',
    image_url: window.location.origin + image
  }))

  const checkout = {
    merchant: {
      user_confirmation_url: window.location.origin + '/order-confirmed',
      user_cancel_url: window.location.origin + '/checkout'
    },
    shipping: {
      name: { first: 'Riders', last: 'Customer' },
      address: { line1: '123 Demo St', city: 'Miami', state: 'FL', zipcode: '33101', country: 'USA' },
      email: 'demo@ridersmiami.test',
      phone_number: '3050000000'
    },
    billing: {
      name: { first: 'Riders', last: 'Customer' },
      address: { line1: '123 Demo St', city: 'Miami', state: 'FL', zipcode: '33101', country: 'USA' }
    },
    items,
    shipping_amount: toCents(0),
    tax_amount: toCents(0),
    total: toCents(totals.subtotal)
  }
  return checkout
}

export function openAffirmCheckout(checkout) {
  return new Promise((resolve, reject) => {
    if (!window.affirm) return reject(new Error('Affirm SDK not loaded'))
    window.affirm.checkout(checkout)
    window.affirm.checkout.open({
      onSuccess: (res) => resolve(res),
      onFail: (e) => reject(e),
      onAbort: () => reject(new Error('User aborted'))
    })
  })
}
