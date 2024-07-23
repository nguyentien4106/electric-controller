export const defaultLoginOptions = {
    host: "zb52133e.ala.asia-southeast1.emqxsl.com",
    protocol: "wss",
    port: 8084,
    path: "/mqtt"
}

export const defaultSubscription = (topic, qos = 2, payload = {}) => {
    topic,
    qos,
    payload
}

export const defaultSettingsGaugeChart = {
    value: 300,
    maxValue: 1000
}