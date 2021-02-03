// Init service worker
if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push are supported");

    navigator.serviceWorker
        .register("service-worker.js")
        .then(function (swReg) {
            console.log("Service Worker is registered", swReg);
            swRegistration = swReg;
        })
        .catch(function (error) {
            console.error("Service Worker Error", error);
        });
} else {
    console.warn("Push messaging is not supported");
}

// Init vue (to acess data : vue.drawer = true)
let vue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        drawer: null,
        group: null,
        show_install_button: false,
    }),
    methods: {}
})

// Get data
get_data_from_server().then(data => console.log("Data from server : " + data));
get_data_from_cache().then(data => console.log("Data from cache : " + data));

// Get data from the server
function get_data_from_server() {
    return fetch("/get_data")
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            return null;
        });
}

// Get data from the cache
function get_data_from_cache() {
    if (!("caches" in window)) {
        return null;
    }
    const url = window.origin + "/get_data";
    return caches
        .match(url)
        .then((response) => {
            if (response) {
                return response.json();
            }
            return null;
        })
        .catch((err) => {
            console.error("Error getting data from cache", err);
            return null;
        });
}


