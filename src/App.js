import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
    const adjectives = [
        "Veliki",
        "Maleni",
        "Crni",
        "Bijeli",
        "Sivi",
        "Debeli",
        "Lijep",
        "Hrabar",
        "Mudar",
        "Snažan",
        "Iskren",
        "Plavi",
        "Brzi",
        "Tihi",
        "Odan",
        "Pouzdan",
        "Otmjeni",
        "Vedri",
    ];
    const animalNames = [
        "Pas",
        "Mačak",
        "Bik",
        "Zec",
        "Konj",
        "Delfin",
        "Leopard",
        "Lav",
        "Tigar",
        "Kit",
        "Slon",
        "Sokol",
        "Paun",
        "Kameleon",
        "Orao",
        "Rakun",
        "Jazavac",
        "Miš",
        "Fazan",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animalNames[Math.floor(Math.random() * animalNames.length)];
    const randomName = adjective + " " + animal;
    return randomName;
}

const roomId = "kQ0ZXXKa3zTjfK3d";

class App extends Component {
    state = {
        messages: [],
        member: {
            username: randomName(),
        },
    };

    constructor() {
        super();
        this.drone = new window.Scaledrone(roomId, {
            data: this.state.member,
        });
        this.drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });
        const room = this.drone.subscribe("observable-room");
        room.on("data", (data, member) => {
            const messages = this.state.messages;
            messages.push({ member, text: data });
            this.setState({ messages });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Chat App Algebra - Bukovac</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }

    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };
}

export default App;
