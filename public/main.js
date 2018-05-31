const socket = io();

const App = (() => {
    "use strict";

    const headers = {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };

    return {
        bindEvents: bindEvents
    };

    function bindEvents() {
        const queueForm = document.getElementById('start-queue-form');

        queueForm.addEventListener('submit', submitForm);
    }

    async function submitForm(event) {
        event.preventDefault();

        await postData();
    }

    async function postData() {
        try {
            await fetch('/create', { headers })
                .then((res) => {
                    socket.on('statusMessage', function (res) {
                        document.getElementById('in-queue').innerHTML = `In queue: ${res}`;
                    });
                });
        } catch (err){
            alert(err.message);

            throw err;
        }
    }
})();

App.bindEvents();