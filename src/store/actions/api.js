const apiUrl = 'https://www.mayamall.com/mobile-app-api/'

export const homeApi = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      }
    }).then((response) => response.json())
      .then( (responseJson) => {
       
       const {status,currencySymbol,unread_notifications,data,cart_count,fav_count,unread_messages}=responseJson
       const {sponsored_products,sponsored_shops,slides,banners,collections}=data
       //const {'3','4',5}=collections
       const three=collections['4']
       //console.log(JSON.stringify(three))
        dispatch({type:'GET_HOME_ITEMS',payload:{slides,collections}})
      })
      .catch((error) => {
        console.log('Error initiating home : ' + error); 
      });
  }
}

export const getProductsApi = (token) => {
  return async (dispatch, getState) => {

    fetch(`${apiUrl}get_products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      }
    }).then((response) => response.json())
      .then( (responseJson) => {
       
       const {status,currencySymbol,unread_notifications,data,cart_count,fav_count,unread_messages}=responseJson
       const {products,total_pages,page,total_records}=data
      
        dispatch({type:'GET_PRODUCTS',payload:{products,total_pages,page,total_records,cart_count}})
      })
      .catch((error) => {
        console.log('Error initiating all products : ' + error); 
      });
  }
}


export const addToCartApi = (token,selprod_id) => {
  return async (dispatch, getState) => {
    const currency=1
    const language=1
    //const selprod_id=test
    const quantity=1

    console.log(`inilah barisan kita : ${currency}  ${language}  ${selprod_id} ${quantity}`)

    fetch(`${apiUrl}add_to_cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-TOKEN': token,
        'X-USER-TYPE': '1',
      },
      formData: JSON.stringify({ currency,language,selprod_id,quantity }),
    }).then((response) => response.json())
      .then( (responseJson) => {
    console.log(JSON.stringify(responseJson))
      })
      .catch((error) => {
        console.log('Error adding : ' + error + selprod_id); 
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
      .then( (responseJson) => {
    
       const {data}=responseJson
       const {products,cartSummary,}=data
      
        dispatch({type:'GET_CART_DETAIL',payload:{products,cartSummary}})
      })
      .catch((error) => {
        console.log('Error initiating cart detail : ' + error); 
      });
  }
}

export const registerApi = (user_name, user_username, user_email, user_password) => {
  console.log("PAsswrod"+user_password)
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