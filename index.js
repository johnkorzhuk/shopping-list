$(function () {
  let state = {
    cart: {
      apples: {
        checked: false,
        name: 'apples'
      },
      oranges: {
        checked: false,
        name: 'oranges'
      },
      milk: {
        checked: true,
        name: 'milk'
      },
      bread: {
        checked: false,
        name: 'bread'
      }
    }
  }

  const $shoppingList = $('.shopping-list')

  $('#js-shopping-list-form').submit((e) => {
    e.preventDefault()
    const $formInput = $('#shopping-list-entry')
    const itemName = $formInput.val()

    if (itemName) {
      addItem(state, itemName)
      renderCart(state, $shoppingList)
      $formInput.val('')
    }
  })

  $('.shopping-list').on('click', 'button', function () {
    const item = this.getAttribute('data-item')
    const action = this.getAttribute('data-action')
    if (action === 'delete') removeItem(state, item)
    if (action === 'toggle') toggleChecked(state, item)

    renderCart(state, $shoppingList)
  })
})

function addItem (state, itemName) {
  Object.assign(state.cart, { 
    [itemName]: {
      checked: false,
      name: itemName
    } 
  })
}

function removeItem (state, itemName) {
  delete state.cart[itemName]
}

function toggleChecked (state, itemName) {
  state.cart[itemName].checked = !state.cart[itemName].checked
}

function renderCart (state, node) {
  let items = []
  const { cart } = state

  Object.keys(cart).forEach((item) => {
    items.push(`
      <li>
        <span class="shopping-item ${cart[item].checked ? 'shopping-item__checked' : ''}">
          ${cart[item].name}
        </span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle" data-item='${cart[item].name}' data-action="toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete" data-item='${cart[item].name}' data-action="delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>
    `)
  })

  node.html(items)
}

