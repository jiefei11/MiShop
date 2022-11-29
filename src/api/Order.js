import { Service } from "@/utils/Service";


export function getOrderInfo(cartIds){
    return Service({
        url: '/order/getOrderInfo',
        params: {
            cartIds: cartIds
        }
    })
}

export function confirmOrder(data){
    return Service({
        url: '/order/confirmOrder',
        data
    })
}

export function getOrderList(status, size , pages ) {
    return Service({
        url: '/order/getOrderList',
        method: 'get',
        params: {
            status: status,
            size: size ,
            pages: pages
        }
    })
}



export function delOrder(orderId ) {
    return Service({
        url: '/order/delOrder',
        params: {
            orderId: orderId,
        }
    })
}

export function restoreOrder(orderId ) {
    return Service({
        url: '/order/restoreOrder',
        params: {
            orderId: orderId,
        }
    })
}

export function payment(orderId ) {
    return Service({
        url: '/order/payment',
        params: {
            orderId: orderId,
        }
    })
}