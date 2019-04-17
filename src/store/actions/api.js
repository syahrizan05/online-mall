import { SecureStore, Facebook, GoogleSignIn } from 'expo'
// import {Constants, Facebook, GoogleSignIn} from 'expo';
import _ from 'lodash'
const apiUrl = 'https://www.mayamall.com/mobile-app-api/'

export const loginApi = (email, password) => {

  return async (dispatch, getState) => {
    var formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    fetch(`${apiUrl}login`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`login Response : ${JSON.stringify(responseJson)}`)
        const authentication = responseJson
        const { status } = authentication
        if (status == 1) {
          const stringifyAuthentication = await JSON.stringify(authentication)
          await SecureStore.setItemAsync('authentication', stringifyAuthentication);

          dispatch({ type: 'SET_LOGIN', payload: { msg: '' } })
          dispatch({ type: 'GET_USER', payload: { ...authentication } })

        } else {
          dispatch({ type: 'SET_LOGIN', payload: { msg } })
        }


      })
      .catch((error) => {
        console.log('Error initiating login : ' + error);
      });
  }
}

export const fbLoginApi = (token) => {

  return async (dispatch, getState) => {
    var formData = new FormData();
    formData.append('fb_token', token);

    fetch(`${apiUrl}login_facebook`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
      .then(async (responseJson) => {
        console.log(`fb login Response : ${JSON.stringify(responseJson)}`)
        const authentication = responseJson
        const { status } = authentication
        if (status == 1) {
          const stringifyAuthentication = await JSON.stringify(authentication)
          await SecureStore.setItemAsync('authentication', stringifyAuthentication);

          dispatch({ type: 'SET_LOGIN', payload: { msg: '' } })
          dispatch({ type: 'GET_USER', payload: { ...authentication } })

        } else {
          dispatch({ type: 'SET_LOGIN', payload: { msg } })
        }


      })
      .catch((error) => {
        console.log('Error initiating login : ' + error);
      });
  }
}

export const homeApi = (token) => {

  const headers = token === undefined ? null : { 'X-TOKEN': token, 'X-USER-TYPE': '1', }
  return async (dispatch, getState) => {
    fetch(`${apiUrl}home`, {
      method: 'POST',
      headers,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`inilah apa yang home keluarkan : ${JSON.stringify(responseJson)}`)
        const { status, currencySymbol, unread_notifications, data, cart_count, fav_count, unread_messages } = responseJson
        const { sponsored_products, sponsored_shops, slides, banners, collections } = data

        console.log(`inilah cart count : ${cart_count}`)

        const two = collections['2'] //new collections
        const newCollection = two['1']
        const newCollectionItems = newCollection.products

        const four = collections['4']
        const featured = four['2']
        const featuredShop = _.values(featured.shops)
        const featuredShopDetail = []
        featuredShop.forEach((fs) => featuredShopDetail.push({ ...fs.shopData, products: fs.products }))

        const featuredProduct = []

        featuredShopDetail.forEach(fsd => {
          const prod = fsd.products
          prod.forEach(pr => {
            featuredProduct.push({ ...fsd, ...pr })
          })
        })


        dispatch({ type: 'GET_HOME_ITEMS', payload: { currencySymbol, unread_notifications, cart_count, fav_count, unread_messages, slides, newCollection, newCollectionItems, collections, featuredShopDetail, featuredProduct } })
      })
      .catch((error) => {
        console.log('Error initiating home : ' + error);
      });
  }
}

export const profileInfoApi = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}profile_info`, {
      method: 'POST',
      headers: {
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      },

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`profile api : ${JSON.stringify(responseJson)}`)
        const { status, currencySymbol, unread_notifications, data, cart_count, fav_count, unread_messages } = responseJson
        const { name, email, username, user_image, phone, dob, city, address_1, address_2 } = data

        dispatch({ type: 'GET_PROFILE', payload: { name, email, username, user_image, phone, dob, city, address_1, address_2 } })
        dispatch({ type: 'GET_PROFILE_INFO', payload: { unread_messages, unread_notifications, cart_count, fav_count } })
      })
      .catch((error) => {
        console.log('Error initiating profile : ' + error);
      });
  }
}

export const notificationApi = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}notifications`, {
      method: 'POST',
      headers: {
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      },

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`noti : ${JSON.stringify(responseJson)}`)
        const { status, currencySymbol, unread_notifications, data, cart_count, fav_count, unread_messages } = responseJson
        const { records } = data

        dispatch({ type: 'GET_NOTIFICATIONS', payload: { records, cart_count, unread_notifications } })
      })
      .catch((error) => {
        console.log('Error initiating profile : ' + error);
      });
  }
}

export const getProductsApi = (token) => {
  return async (dispatch, getState) => {
    var formData = new FormData();
    formData.append('page', 1);
    formData.append('pagesize', 1000);
    fetch(`${apiUrl}get_products`, {
      method: 'POST',
      headers: {
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {

        const { status, currencySymbol, unread_notifications, data, cart_count, fav_count, unread_messages } = responseJson
        const { products, total_pages, page, total_records } = data

        dispatch({ type: 'GET_PRODUCTS', payload: { products, total_pages, page, total_records, cart_count } })
      })
      .catch((error) => {
        console.log('Error initiating all products : ' + error);
      });
  }
}


export const searchProductsApi = (token, val) => {
  return async (dispatch, getState) => {

    var formData = new FormData();
    formData.append('keyword', val);

    fetch(`${apiUrl}get_products`, {
      method: 'POST',
      headers: {
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`result api : ${JSON.stringify(responseJson)}`)

        const { status, currencySymbol, unread_notifications, data, cart_count, fav_count, unread_messages } = responseJson
        const { products, total_pages, page, total_records } = data

        dispatch({ type: 'SEARCH_PRODUCTS', payload: { result: products, total_pages, page, total_records, cart_count } })
      })
      .catch((error) => {
        console.log('Error initiating all products : ' + error);
      });
  }
}

export const addToCartApi = (token, selprod_id) => {
  return async (dispatch, getState) => {
    const currency = 1
    const language = 1
    //const selprod_id=test
    const quantity = 1

    console.log(`inilah barisan kita : ${currency}  ${language}  ${selprod_id} ${quantity}`)

    var formData = new FormData();
    formData.append('currency', currency);
    formData.append('language', language);
    formData.append('selprod_id', selprod_id);
    formData.append('quantity', quantity);

    fetch(`${apiUrl}add_to_cart`, {
      method: 'POST',
      headers: {
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {

      })
      .catch((error) => {
        console.log('Error adding : ' + error + selprod_id);
      });
  }
}

export const getProductDetailApi = (token, product_id) => {
  console.log(`token ialah ${token} dan product id ialah ${product_id}`)
  return async (dispatch, getState) => {
    fetch(`${apiUrl}product_details/${product_id}`, {
      method: 'POST',

    }).then((response) => response.json())
      .then((responseJson) => {

        const { data } = responseJson
        const { product } = data
        const { product_description, product_image, product_name } = product

        dispatch({ type: 'GET_PRODUCT_DETAIL', payload: { product, product_description, product_image, product_name } })
      })
      .catch((error) => {
        console.log('Error initiating product detail : ' + error);
      });
  }
}

export const getCartDetailAPI = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}get_cart_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`cart api : ${JSON.stringify(responseJson)}`)
        const { data } = responseJson
        const { products, cartSummary, cart_selected_billing_address, cart_selected_shipping_address } = data
        const { cartTotal, cartTaxTotal, orderNetAmount, orderPaymentGatewayCharges } = cartSummary

        dispatch({ type: 'GET_CART_DETAIL', payload: { products, cart_selected_shipping_address, cart_selected_billing_address, cartTotal, cartTaxTotal, orderNetAmount, orderPaymentGatewayCharges, cart_count, unread_notifications } })
      })
      .catch((error) => {
        console.log('Error initiating cart detail : ' + error);
      });
  }
}

export const registerApi = (user_name, user_username, user_email, user_password) => {
  console.log("PAsswrod" + user_password)
  return async (dispatch, getState) => {
    var formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('user_username', user_username);
    formData.append('user_email', user_email);
    formData.append('user_password', user_password);
    fetch(`${apiUrl}signup`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        // const { status } = responseJson

        // dispatch({ type: 'SIGN_UP', payload: {status} })
      })
      .catch((error) => {
        console.log('Registration Error : ' + error);
      });
  }
}

export const getBuyerOrdersApi = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}buyer_orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(`orders : ${JSON.stringify(responseJson)}`)
        const { data } = responseJson
        const { orders } = data

        dispatch({ type: 'GET_ORDERS', payload: { orders } })
      })
      .catch((error) => {
        console.log('Error initiating order detail : ' + error);
      });
  }
}

export const getBuyerOrderApi = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}view_buyer_order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        const { data } = responseJson
        const { orders } = data

        dispatch({ type: 'GET_ORDER_DETAIL', payload: { orders } })
      })
      .catch((error) => {
        console.log('Error initiating order detail : ' + error);
      });
  }
}

//////////////////////////////////////////////////

