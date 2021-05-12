export default function Home() {
  return (
    <div>
      <div
        className="white-text-container background-image-container"
        style={{ backgroundImage: "url(/imagens/bonjour.jpg)" }}
      >
        <div className="opacity" />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Bíblia em Libras</h1>
              <p>
                Uma forma rápida de acessar as versões existentes da bíblia
                traduzida pra LIBRAS (Língua Brasileira de Sinais) no navegador,
                de forma rápida e dinamica, e nas que não há traduções ainda,
                ver os sinais existentes para as palavras por meio do{" "}
                <a href="https://wiki.vlibras.gov.br/">VLibras </a>e do
                Glossario do <a href="https://www.dotbrasil.org/">DOTBrasil</a>.{" "}
              </p>
              <a href="/" title className="btn btn-lg btn-primary">
                Acessar
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-container border-section-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 section-container-spacer">
              <div className="text-center">
                <h2>Sobre</h2>
                <p>
                  {" "}
                  Foi utilizado as versões existentes da bíblia em LIBRAS no
                  Youtube do canal{" "}
                  <a href="https://www.youtube.com/channel/UCfwfJaMARKZ-wsx0t1ursYw/">
                    BÍBLIA EM LIBRAS COMUNICAR{" "}
                  </a>
                  do pastor{" "}
                  <a href="https://www.youtube.com/user/adoniranmelo">
                    Adoniran Melo
                  </a>{" "}
                  pastor da Primeira Igreja Batista de Curitiba (PIB) e em breve
                  será adicionada a{" "}
                  <a href="https://www.youtube.com/channel/UCmqg8Qxi1zdWlBwB7zHl-DQ">
                    Bíblia DOT
                  </a>
                  , versão do projeto
                  <a href="https://www.youtube.com/channel/UC0uKDBlUH53NAGjhL-Bg0Sw">
                    {" "}
                    DOT Brasil
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="fa-container">
                <i className="fa fa-sign-language fa-3x" aria-hidden="true" />
              </div>
              <div className="text-center">
                <h3>LIBRAS</h3>
              </div>
              <div>
                <p>
                  A Língua Brasileira de Sinais é a língua de sinais usada por
                  surdos dos centros urbanos brasileiros e legalmente
                  reconhecida como meio de comunicação e expressão.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="fa-container">
                <i className="fa fa-heart-o fa-3x" aria-hidden="true" />
              </div>
              <div className="text-center">
                <h3>Porquê</h3>
              </div>
              <div>
                <p>
                  Este site é uma iniciativa sem fins lucrativos, feito por uma
                  recente estudante de LIBRAS que está tentando aprender e
                  contribuir para melhorar o aprendizado dela e de outros.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="fa-container">
                <i className="fa fa-comment-o fa-3x" aria-hidden="true" />
              </div>
              <div className="text-center">
                <h3>Opine</h3>
              </div>
              <div>
                <p>
                  Se existe algum bug no site, há críticas, elogios, ou
                  sugestões de como melhorar, entre em
                  <a href="https://tarsilasamille.github.io/Portifolio/#redes-mae">
                    {" "}
                    contato
                  </a>
                  , farei o possivel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container background-color-container white-text-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="text-center">
                <h2>Apoia-se</h2>
                <p>
                  {" "}
                  Apesar deste site é uma iniciativa sem fins lucrativos, 
                 você pode apoiar o projeto financeiramente, para poder
                  haver melhorias no servidor utilizado, funcionar em mais
                  plataformas e haver mais funcionalidades.{" "}
                </p>
                <a
                  href="https://www.catarse.me/web_app_biblia_em_libras_0435"
                  title
                  className="btn btn-primary btn-lg"
                >
                  Apoiar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-container">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <img
                className="img-responsive"
                src="/imagens/mãos.jpg"
                alt
              />
            </div>
            <div className="col-md-5">
              <ul className="features">
              <li>
                  <h3>Velho Testamento</h3>
                  <p>
                    É possivel ver o sinal já existente para os capitulos do velho testamento, 
                    tirando a opção de ver apenas os com tradução e acionando a extenção do VLibras.
                  </p>
                </li>
                <li>
                  <h3>Novo Testamento</h3>
                  <p>
                    Com quase todos os livros com vídeo, faltando apenas alguns capítulos de Apocalipse.
                  </p>
                </li>
                <li>
                  <h3>Glossário</h3>
                  <p>
                    Acionando a extenção do VLibras é possivel ver a tradução palavra por palavra. 
                  
                  </p>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img
                  className="img-responsive page-base-image"
                  src="/imagens/talk.jpg"
                  alt
                />
              </div>
              <div className="col-md-4">
                <img
                  className="img-responsive page-base-image"
                  src="/imagens/biblia.jpg"
                  alt
                />
              </div>
              <div className="col-md-4">
                <img
                  className="img-responsive page-base-image"
                  src="/imagens/bibliam.jpg"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
