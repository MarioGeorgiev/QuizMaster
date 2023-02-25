export const settings ={
    host:''
}
async function requst(url,options){
    try {
        let response = await fetch(url,options);
        
        if(response.ok ==false){
            const error = await response.json();
            throw Error(error.message)
        }
        try {
            let data = await response.json();
            return data;
        } catch (error) {
            return response
        }
        
       
    }
     catch (error) {
        alert(error.message);
        throw error
    }
}
function getOptions(method = 'get', body){
    const options = {
        method,
        headers:{
            "X-Parse-Application-Id": "UYAJ01bfIxzV2AxcufDIj2iR0xahyABWsFop53Or",
            "X-Parse-REST-API-Key": "bJX41VViIDJTG8wYOZAPMJrkeL0d3A2rgwkrRtSb"
        }
    };
    
    const token = sessionStorage.getItem('authToken')
    if(token !=null){
        options.headers['X-Parse-Session-Token'] = token
    }
   
    if(body){
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }
   
   return options
}
export async function get(url){
    return await requst(url,getOptions())
}

export async function post(url,data){
    return await requst(url,getOptions('post', data))
}
export async function put(url,data){
    return await requst(url,getOptions('put', data))
}
export async function del(url){
    return await requst(url,getOptions('delete'))
}

export async function login(username,password){
     const result = await post(settings.host + '/login',{username,password})

     sessionStorage.setItem('authToken' , result.sessionToken)
     sessionStorage.setItem('email' , result.email)
     sessionStorage.setItem('userId' , result.objectId)
     return result;
}

export async function register(email,username,password,){
    const result = await post(settings.host + '/users',{email,username,password,})

    sessionStorage.setItem('authToken' , result.sessionToken)
    sessionStorage.setItem('email' , result.email)
    sessionStorage.setItem('userId' , result.objectId)
    return result;
}
export async function logout(){
    const result = await post(settings.host + '/logout',{})

    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('userId')
    return result;
}