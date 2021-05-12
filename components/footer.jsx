
export default function Footer() {
    return (
      <footer>
      <div className="section-container footer-container">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Contato</h4>
              <p> <a href="https://tarsilasamille.github.io/Portifolio/#redes-mae">
                    {" "}
                    Társila Samille
                  </a></p>
            </div>
            <div className="col-md-4">
              <h4>Gostou da iniciativa? Compartilhe para que mais pessoas conheçam!</h4>
              <p>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://biblia-libras.vercel.app/" className="social-round-icon white-round-icon fa-icon" title>
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
                <a href="https://twitter.com/intent/tweet?url=https://biblia-libras.vercel.app/&text=Web%20App%20B%C3%ADblia%20em%20LIBRAS" className="social-round-icon white-round-icon fa-icon" title>
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://biblia-libras.vercel.app/" className="social-round-icon white-round-icon fa-icon" title>
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </p>
            </div>
            <div className="col-md-4">
            <p><small>© Desenvolvido por  <a href="http://www.mashup-template.com/"
           className="link-like-text" title="Create website with free html template">Társila Samille</a>, 2001 - os dias atuais. | Website criado com <a href="http://www.mashup-template.com/" className="link-like-text" title="Create website with free html template">Mashup Template</a>
          </small></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
      );
    }


