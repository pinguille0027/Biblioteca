window.addEventListener('load', () => {
    console.log('load');
    const button = document.getElementById('api_call_button');
    const pre = document.getElementById('pre_content');
    button.addEventListener('click', async () => {
        console.log('click');
        const response = await fetch('/libros');
        if (!response.ok) { return; }
        const json = await response.json()

        pre.innerHTML = JSON.stringify(json, null, 2);
    });
})