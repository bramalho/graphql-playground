const SERVER_URL = 'http://localhost:9000';

async function fetchGreeting() {
    const response = await fetch(
        SERVER_URL,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        greeting
                    }
                `
            })
        }
    );

    const {data} = await response.json();

    return data;
}

fetchGreeting().then(({greeting}) => {
    const text = document.querySelector('p');
    text.textContent = greeting;
});
