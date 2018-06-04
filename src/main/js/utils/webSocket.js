export const webSocket = new SockJS('/udm')

export const sendMessage = (type, data) => webSocket.send(JSON.stringify({type: type, data: data}))
