console.log('File is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    console.log(location);

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageTwo.textContent = data.error
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            // console.log(`location ${data.location} and forecast ${data.forecast}`);
            // return messageTwo.textContent = `location ${data.location} and forecast ${data.forecast}`
        })
    });
});