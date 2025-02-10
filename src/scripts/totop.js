const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        if(this.scrollY > 720){
            document.getElementById('buttonToTop').style.display = 'block';
        } else {
            document.getElementById('buttonToTop').style.display = 'none';
        }
    })
})