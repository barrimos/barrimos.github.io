const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.addEventListener('scroll', () => {
    if(this.scrollY > 720){
        document.getElementById('toTopBtn').style.display = 'block';
    } else {
        document.getElementById('toTopBtn').style.display = 'none';
    }
})