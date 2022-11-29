import { Service } from "@/utils/Service";

export function addCart(uni,num,pid) {
    return Service({
        url: '/cart/addCart',
        method: 'post',
        params: {
            unique: uni,
            cartNum: num,
            pid: pid,
        }
    })
}

export function getCart(){
    return Service({
        url: '/cart',
        method: 'get'
    })
}
export function delCart(id) {
    return Service({
        url: '/cart/delCart',
        method: 'post',
        params: {
            id: id
        }
    })
}
export function uptNum(id,num){
    return Service({
        url: '/cart/uptNum',
        method: 'post',
        params: {
            id: id,
            cartNum:num
        }
    })
}