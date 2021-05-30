import logo from "../public/imagens/book.svg";

export default function Header() {
  return (
    <header>
      <nav className="navbar  navbar-fixed-top navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              onClick={() => {
                const div = document.getElementById('navbar-collapse-uarr');
                if(div.classList.contains('in')){
                  div.classList.remove('in')
                }else{ div.classList.add('in')}
              }}
              type="button"
              className="navbar-toggle uarr collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse-uarr"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/" >
              <img src={logo} className="navbar-logo-img" alt="logo" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-uarr">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="home" title="home" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="about" title="about">
                  Sobre
                </a>
              </li>
              <li>
                <a href="glossario" title="glossario">
                  Glossario
                </a>
              </li>
              {/* <li>
                <a href="glossario-geral" title="glossario-geral">
                  Glossario Geral
                </a>
              </li> */}
              <li>
                <p>
                  <a href="\" className="btn btn-primary navbar-btn" title="Biblia">
                    Biblia
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
