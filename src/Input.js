import React, { Component } from "react";

class Input extends Component {
    state = {
        text: "",
    };

    onChange(e) {
        const inputValue = e.target.value;
        const maxLength = 120;

        if (inputValue.length > maxLength) {
            this.setState({
                text: inputValue.slice(0, maxLength),
            });
        } else {
            this.setState({ text: inputValue });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const { text } = this.state;

        if (text.trim() === "") {
            alert("Molim unesite poruku prije slanja.");
            return;
        }

        this.setState({ text: "" });
        this.props.onSendMessage(text);
    }

    render() {
        const { text } = this.state;
        const maxLength = 120;
        const characterCount = text.length;

        return (
            <div className="Input">
                <div className="character-counter">
                    {characterCount}/{maxLength}
                </div>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <input
                        onChange={(e) => {
                            this.onChange(e);
                            if (e.target.value.length === maxLength) {
                                alert(
                                    `Unijeli ste maksimalan broj znakova. Najviše je moguće unijeti ${maxLength} znakova.`
                                );
                            }
                        }}
                        value={text}
                        type="text"
                        placeholder="Unesi poruku i klikni na gumb POŠALJI ili pritisni tipku ENTER"
                        maxLength={maxLength}
                    />

                    <button>Pošalji</button>
                </form>
            </div>
        );
    }
}

export default Input;
