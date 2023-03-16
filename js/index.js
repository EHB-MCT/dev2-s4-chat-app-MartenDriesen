"use strict";

const chat = {
    author: "Smewt",
    init() {
        this.fetchMessages();
        document.getElementById("chatForm").addEventListener("submit", this.sendMessage);

    },
    sendMessage(event) {
        event.preventDefault();
        let newmessage = document.getElementById("chatInput").value;

        const data = {
            author: chat.author,
            message: newmessage
        };
        console.log(newmessage);

        fetch('https://dev2chat.onrender.com/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newmessage),

        });
        document.querySelector('#messageContainer').innerHTML = "";
        chat.fetchMessages();

    },
    fetchMessages() {
        const result = fetch('https://dev2chat.onrender.com/messages')
            .then(function (response) {
                return response.json();

            })
            .then(function (messages) {
                console.log(messages);
                document.querySelector('#messageContainer').innerHTML = messages[0].message;
                //  console.log(document.querySelector('#messageContainer').innerHTML);

                messages.forEach(function (message) {

                    const htmlmessage =
                        `
                    <div class="messageItem">
                    <div class="header">
                        <span class="${message.author}">TEST</span>
                        <span class="time">00:00</span>
                    </div>
                    <p>
                    ${message.message}
                    </p>
                 </div>
                 `
                        ;
                    document.querySelector("#messageContainer").insertAdjacentHTML('beforeend', htmlmessage);

                });
            });
    },
    renderMessage(message) {
    }


};

chat.init();