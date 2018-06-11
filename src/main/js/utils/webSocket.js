export const webSocket = new SockJS('/udm')

export const sendMessage = (type, data) => webSocket.send(JSON.stringify({type: type, data: data}))

export const CHANGE_UDM_MESSAGE = 'change_udm'
export const CHANGE_DAY_STATUS_MESSAGE = 'change_day_status'
