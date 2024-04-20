function hashFile() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const hash = CryptoJS.SHA256(event.target.result); // Using CryptoJS for hashing
            document.getElementById('hashOutput').innerText = 'SHA-256 Hash: ' + hash;
        };
        reader.readAsBinaryString(file);
    } else {
        alert("Please select a file first!");
    }
}

function encryptText() {
    const input = document.getElementById('cryptoInput').value;
    const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Sample Key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Sample IV
    const encrypted = CryptoJS.AES.encrypt(input, key, { iv: iv });
    document.getElementById('cryptoOutput').innerText = 'Encrypted: ' + encrypted;
}

function decryptText() {
    const input = document.getElementById('cryptoInput').value;
    const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Sample Key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Sample IV
    const decrypted = CryptoJS.AES.decrypt(input, key, { iv: iv });
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById('cryptoOutput').innerText = 'Decrypted: ' + plaintext;
}

