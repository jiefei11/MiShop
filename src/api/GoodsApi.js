import { Service } from "@/utils/Service";

export function addGoods(data) {
    return Service({
        url: '/goods/addGoods',
        data
    })
}

export function getGoods(data) {
    return Service({
        url: '/goods/getGoods',
        method: 'get',
        params: {
            keyword: data.keyword,
            size: data.size,
            page: data.page,
            isDelete: data.isDelete
        }
    })
}

export function getGoodsByCid(id) {
    return Service ({
        url: '/goods/getGoodsByCid',
        method: 'get',
        params: {
            id: id
        }
    })
}

export function delGoods(id) {
    return Service ({
        url: '/goods/delGoods',
        method: 'post',
        params: {
            id: id
        }
    })
}

export function restoreGoods(id) {
    return Service ({
        url: '/goods/restoreGoods',
        method: 'post',
        params: {
            id: id
        }
    })
}

export function deleteCompletely(id) {
    return Service ({
        url: '/goods/deleteCompletely',
        method: 'post',
        params: {
            id: id
        }
    })
}

export function getProductDetail(id) {
    return Service({
        url: '/goods/productDetail',
        method: 'get',
        params: {
            id: id
        }
    })
}

export function offShelf(id){
    return Service({
        url: '/goods/offShelf',
        method: 'post',
        params: {
            id: id
        }
    })
}

export function addFavorite(id){
    return Service({
        url: '/goods/addFavorite',
        params: {
            id: id
        }
    })
}

export function getFavorite(){
    return Service({
        url: '/goods/getFavorite',
        method: 'get'
    })
}
