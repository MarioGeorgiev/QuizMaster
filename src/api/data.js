import * as api from './api.js'
api.settings.host='https://parseapi.back4app.com'

export const login = api.login
export const register = api.register
export const logout = api.logout


export async function getFurniture(){
    return await api.get(api.settings.host + '/data/catalog');
}

export async function getItemById(itemId){
    return await api.get(api.settings.host + '/data/catalog/' + itemId)
}

export async function getMyFurniture(){
    const userId = sessionStorage.getItem('userId')
    return await api.get(api.settings.hots + `/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

export async function createData(data){
    return await api.post(api.settings.host + '/data/catalog',data)
}

export async function editRecord(id,data){
    return await api.put(api.settings.host + '/data/catalog/' + id,data)
}
export async function deleteRecord(id){
    return await api.del(api.settings.host + '/data/catalog/' + id )
}