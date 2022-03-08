class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector(selectors:'.chatbox__button'),
            chatBox: document.querySelector(selectors:'.chatbox__support'),
            sendButton: document.querySelector(selectors:'.send__button')
        }

        this.state = false;
        this.messages = [];
    }

        display() {
            const {openButton, chatBox, sendButton} = this.args;

            openButton.addEventListener(type:'click', listener:() => this.toggleState(chatBox))

            sendButton.addEventListener(type:'click', listener:() => this.onSendButton(chatBox))

            const node = chatBox.querySelector('input');
            node.addEventListener("keyup", ({key}) => {
                if (key === "Enter") {
                    this.oneSendButton(chatBox)
                }
            })
        }


        toggleState(chatbox) {
            this.state = !this.state;

            // show or hides the box
            if(this.state) {
                chatbox.classList.add('chatbox--active')
            } else {
                chatbox.classList.remove(tokens:'chatbox--active')
            }
        }

        onSendButton(chatbox) {
            var textField = chatbox.querySelector('input');
            let text1 = textField.value
            if (text1 === "") {
                return;
            }

            let msg1 = { name: "User", message: text1 }
            this.message.push(msg1);


            fetch(input:$SCRIPT_ROOT + '/predict', init:{
                method: 'POST',
                body: JSON.stringify(value{ message: text1}),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "El Viejo Willy", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''

            }).catch((error) => {
                console.error('Error:', error);
                this.updatechatText(chatbox)
                textField.value = ''
            });
        }

        updatechartText(chatbox) {
            var html = '';
            this.messages.slice().reverse().forEach(function(item) {
                if (item.name === "El Viejo Willy")
                {
                    html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
                }
                else{
                    html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
                }
            });

            const chatmessage = chatbox.querySelector('.chatbox__messages');
            chatmessage.innerHTML = html;
        }



}