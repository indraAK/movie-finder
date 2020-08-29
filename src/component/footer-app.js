class FooterApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="copyright">
            <p class="text-copyright m-0">
                Data From <a href="https://www.themoviedb.org/documentation/api" target="_blank">The Movie Database (TMDb).</a> Made
                with ♥ by Indra Adi Kusuma
            </p>
        </div>`;
    }
}

customElements.define('footer-app', FooterApp);