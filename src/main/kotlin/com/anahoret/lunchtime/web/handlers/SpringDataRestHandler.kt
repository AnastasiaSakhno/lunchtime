package com.anahoret.lunchtime.web.handlers

import javax.servlet.http.HttpServletRequest

class SpringDataRestHandler(val request: HttpServletRequest) {

    fun links(resource: String, id: Long) =
        HashMap<String, Any>().also {
            it["self"] = HashMap<String, Any>().also {
                it["href"] = link(resource, id)
            }
        }

    fun link(resource: String, id: Long) =
        "${request.scheme}://${request.getHeader("Host")}/api/$resource/$id"
}
