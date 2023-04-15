import React, { useRef, useState } from "react";
import "./App.css";

function App() {

	const inputRef = useRef();
	const buttonRef = useRef();
	const [copySuccess, setCopySuccess] = useState(false);

	function handleCopy() {
		const outputElement = document.querySelector('#output');
		const password = document.getElementById("output");
		if(password.textContent !== '') {
			navigator.clipboard.writeText(outputElement.textContent)
				.then(() => {
					setCopySuccess(true);
					alert('Copied to clipboard');
					setTimeout(() => {
					  setCopySuccess(false);
					}, 2000);
				})
				.catch((error) => {
					console.error('Copy failed:', error);
					alert('Couldn\'t copy to clipboard');
				});
		}
		else {
			alert('Couldn\'t copy to clipboard');
		}
	}

	function handleKeyDown(event) {
		if (event.key === "Enter") {
			buttonRef.current.click();
		}
	}

	function updateInput() {
		var input = document.getElementById("length").value;
		if(input > 30) {
			document.getElementById("length").value = 30;
		}
		else if(!input) {
			document.getElementById("length").value = 4;
		}
	}

	function checkInput() {
		var input = document.getElementById("length").value;
		if(input < 4) {
			document.getElementById("length").value = 4;
		}
	}

	function run() {
		checkInput();
		sendInput();
		generate();
	}

	function sendInput() {
		var inputText = document.getElementById("length").value;
		if(!inputText){
			inputText = 4;
		}
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/input");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({inputText: inputText}));
	}

	function generate() {
		fetch('/generator')
			.then(response => response.text())
			.then(data => {
				document.getElementById("output").textContent = data;
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1 id="text1">In need of a Secure Password?</h1>
				<h3 id="text2">Generate one right now!</h3>
				<p id="text3">Select the number of characters and click generate! It's that easy!</p>
				<input type="number" id="length" name="length" defaultValue="16" min="4" max="30" onChange={updateInput} ref={inputRef} onKeyDown={handleKeyDown}/>
    			<button id="submit" onClick={run} ref={buttonRef}>Generate</button>
				<p id="output"></p>
				<button id="copy" onClick={handleCopy}>Copy</button>
			</header>
		</div>
	);
}

export default App;