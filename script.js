const fileInput = document.getElementById('fileInput');
const hashOutput = document.getElementById('hashOutput');
const cryptoInput = document.getElementById('cryptoInput');
const cryptoOutput = document.getElementById('cryptoOutput');

const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Sample Key
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Sample IV

const uploadedFiles = []; // Data structure to store uploaded files

function hashFile() {
    const file = fileInput.files[0];
    if (file) {
        if (uploadedFiles.length >= 8) {
            alert("File upload limit exceeded. Please remove a file before uploading a new one.");
            return;
        }
        if (file.size > 1 * 1024 * 1024) {
            alert("File size exceeds the limit of 1 MB. Please select a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
            const hash = CryptoJS.SHA256(wordArray);
            const fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                hash: hash.toString()
            };
            uploadedFiles.push(fileData);
            hashOutput.innerText = 'SHA-256 Hash: ' + hash;
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first!");
    }
}

function displayFiles() {
    uploadedFiles.forEach(fileData => {
        console.log('Name: ' + fileData.name);
        console.log('Type: ' + fileData.type);
        console.log('Size: ' + fileData.size);
        console.log('Hash: ' + fileData.hash);
    });
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
}

function compareHashes() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
            const hash = CryptoJS.SHA256(wordArray);
            const fileData = uploadedFiles.find(data => data.name === file.name);
            if (fileData) {
                const storedHash = CryptoJS.enc.Hex.parse(fileData.hash);
                if (hash.toString() === storedHash.toString()) {
                    alert("Hashes match!");
                } else {
                    alert("Hashes do not match!");
                }
            } else {
                alert("File not found in uploaded files.");
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first!");
    }
}

function downloadHashes() {
    const hashes = uploadedFiles.map(fileData => fileData.hash).join('\n');
    const blob = new Blob([hashes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hashes.txt';
    link.click();
}

function generateKey() {
    console.log("Generate key placeholder function");
}
function generateKeys() {
    const keys = [];
    for (let i = 0; i < 20; i++) {
        const key = CryptoJS.lib.WordArray.random(16);
        keys.push(key);
    }
    return keys;
}

const keys = generateKeys();
console.log(keys);

function encryptFileAES192() {
    const start_time = Date.now();
    const file = fileInput.files[0];
    if (file) {
        if (uploadedFiles.length >= 8) {
            alert("File upload limit exceeded. Please remove a file before uploading a new one.");
            return;
        }
        if (file.size > 1 * 1024 * 1024) {
            alert("File size exceeds the limit of 1 MB. Please select a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
            const encrypted = CryptoJS.AES.encrypt(wordArray, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            const fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                hash: encrypted.toString()
            };
            uploadedFiles.push(fileData);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first!");
    }
    const end_time = Date.now();
    console.log('AES-192 Encryption Time: ' + (end_time - start_time));
}

function encryptFileDES() {
    const start_time = Date.now();
    const file = fileInput.files[0];
    if (file) {
        if (uploadedFiles.length >= 8) {
            alert("File upload limit exceeded. Please remove a file before uploading a new one.");
            return;
        }
        if (file.size > 1 * 1024 * 1024) {
            alert("File size exceeds the limit of 1 MB. Please select a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
            const encrypted = CryptoJS.DES.encrypt(wordArray, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
            const fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                hash: encrypted.toString()
            };
            uploadedFiles.push(fileData);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first!");
    }
    const end_time = Date.now();
    console.log('DES Encryption Time: ' + (end_time - start_time));
}

function encryptFileBlowfish() {
    const start_time = Date.now();
    const file = fileInput.files[0];
    if (file) {
        if (uploadedFiles.length >= 8) {
            alert("File upload limit exceeded. Please remove a file before uploading a new one.");
            return;
        }
        if (file.size > 1 * 1024 * 1024) {
            alert("File size exceeds the limit of 1 MB. Please select a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(event) {
            const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
            const encrypted = CryptoJS.Blowfish.encrypt(wordArray, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
            const fileData = {
                name: file.name,
                type: file.type,
                size: file.size,
                hash: encrypted.toString()
            };
            uploadedFiles.push(fileData);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first!");
    }
    const end_time = Date.now();
    console.log('Blowfish Encryption Time: ' + (end_time - start_time));
}

function decryptFile() {
    const start_time = Date.now();
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const wordArray = CryptoJS.lib.WordArray.create(event.target.result);
            const fileData = uploadedFiles.find(data => data.name === file.name);
            if (fileData) {
                const decrypted = CryptoJS.AES.decrypt(fileData.hash, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                const decryptedFile = new Blob([decrypted], { type: fileData.type });
                const url = URL.createObjectURL(decryptedFile);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileData.name;
                link.click();
            } else {
                alert("File not found in uploaded files.");
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a file first!");
    }
    const end_time = Date.now();
    console.log('Decryption Time: ' + (end_time - start_time));
}

function displayFiles() {
    uploadedFiles.forEach(fileData => {
        console.log('Name: ' + fileData.name);
        console.log('Type: ' + fileData.type);
        console.log('Size: ' + fileData.size);
        console.log('Hash: ' + fileData.hash);
    });
}