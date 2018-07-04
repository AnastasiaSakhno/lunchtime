package com.anahoret.lunchtime.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.util.concurrent.atomic.AtomicLong

class User(val id: Long, val name: String)
class Message(val msgType: String, val data: Any)

class LunchtimeHandler : TextWebSocketHandler() {

    val sessionList = HashMap<WebSocketSession, User>()
    var uids = AtomicLong(0)

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        sessionList -= session
    }

    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        val json = ObjectMapper().readTree(message.payload)
        when (json.get("type").asText()) {
            JOIN_MESSAGE -> {
                // {type: "join", data: {id: "user_id"}}
                val user = User(uids.getAndIncrement(), json.get("data").get("id").asText())
                sessionList.put(session, user)
            }
            CHANGE_UDM_MESSAGE -> {
                // {type: "change_udm", data: {id: "udm_id", out: true/false, menu: {href: "http://..."}}}
                broadcastToOthers(session, Message(CHANGE_UDM_MESSAGE, json.get("data")))
            }
            CHANGE_DAY_STATUS_MESSAGE -> {
                // {type: "change_day_status", data: {id: "day_id", closed: true/false}}
                broadcastToOthers(session, Message(CHANGE_DAY_STATUS_MESSAGE, json.get("data")))
            }
        }
    }

    fun emit(session: WebSocketSession, msg: Message) = session.sendMessage(TextMessage(ObjectMapper().writeValueAsString(msg)))
    private fun broadcastToOthers(me: WebSocketSession, msg: Message) = sessionList.filterNot { it.key == me }.forEach { emit(it.key, msg) }

    companion object {
        const val JOIN_MESSAGE = "join"
        const val CHANGE_UDM_MESSAGE = "change_udm"
        const val CHANGE_DAY_STATUS_MESSAGE = "change_day_status"
    }
}

@Configuration
@EnableWebSocket
class WebSocketConfig : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry
            .addHandler(LunchtimeHandler(), "/udm")
            .setAllowedOrigins("*")
            .withSockJS()
    }
}
