window.addEventListener('load', () => {
    console.log('load');
    const buttonc = document.getElementById('api_call_button');
    const buttond = document.getElementById('api_del_button');
    const pre = document.getElementById('pre_content');
    buttonc.addEventListener('click', async () => {
        console.log('addclick');
        const response = await fetch('/libros');
        if (!response.ok) { return; }
        const json = await response.json()

        pre.innerHTML = JSON.stringify(json, null, 2);
    });
    buttond.addEventListener('click', async () => {
        console.log('delclick');
        pre.innerHTML = "borrado";
    });
})