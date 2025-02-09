import Socialsection from "./Socialsection.js";

/**
 * DocsString
 * @returns 
 */
const Footer = () => {
  return `<div class="container">
  <div class="row">
      <div class="col-12 col-md-3 footer-copy">
          <p>All rights reserved &copy; Copy Right 2022 - ${new Date().getFullYear()}</p>
          <p>Prapas Khong-attagarn</p>
          <p>Bangkok, Thailand</p>
          <p>prapas.k13@hotmail.com</p>
      </div>
      <div class="col-12 col-md-9">
          <section class="social-section" id="social-section">${Socialsection()}</section>
      </div>
  </div>
</div>`;
}


export default Footer;