import React, { useEffect, useState } from "react";
import ServicoBiblia from "../api/ServicoBiblia";
import Sheet from "../api/Sheet";
import bibleStyles from "../styles/biblia.module.css";
import VLibras from "@djpfs/react-vlibras-typescript";
import ReactPlayer from "react-player";
import {
  Select,
  Form,
  Layout,
  Row,
  Col,
  Switch,
  Typography,
  Modal,
} from "antd";
import { Popover, Button } from "antd";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const { Option, OptGroup } = Select;
const Books = () => {
  const [books, setBooks] = useState([]);
  const [versions, setVersions] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [version, setVersion] = useState("nvi");
  const [videosDados, setVideosDados] = useState([]);
  const [videos2Dados, setVideos2Dados] = useState([]);
  const [versosVideo, setVersosVideo] = useState("Jwy8dcEmDWY");
  const [versoIF, setVersoIF] = useState([1, 17]);
  const [onlyLibras, setOnlyLibras] = useState(true);
  const [chapterText, setChapterText] = useState();
  const [book, setBook] = useState({
    abbrev: { pt: "mt" },
    author: "",
    chapters: 24,
    group: "",
    name: "",
    testament: "",
  });
  const [words, setWords] = useState([]);
  const [palavra, setPalavra] = useState();
  const servicoBiblia = new ServicoBiblia();
  const servicoDados = new Sheet();
  const [heigth, setWindowHeigth] = useState(0);
  const [width, setWindowWidth] = useState(0);
  const [videoTop, setVideoTop] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (palavra) => {
    setPalavra(palavra);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    let video = document.getElementById("video");
    const videoTop = video.offsetTop;
    const width = window.innerWidth;
    const heigth = window.innerHeigth;
    setWindowHeigth(heigth);
    setWindowWidth(width);
    setVideoTop(videoTop);
    if (width < 992) {
      video.classList.add("bottom-fixed");
      video.classList.remove("sticky");
    } else if (window.pageYOffset > videoTop + heigth * 0.2 || width >= 992) {
      video.classList.remove("bottom-fixed");
      video.classList.add("sticky");
    }
  };

  useEffect(() => {
    (async () => {
      setBooks((await servicoBiblia.getBooks()) || []);
      setVersions((await servicoBiblia.getVersions()) || []);
      setVideosDados((await servicoDados.getVideosId()) || []);
      setVideos2Dados((await servicoDados.getVideos2Id()) || []);
      setWords((await servicoDados.getGlossario()) || []);
    })();
    setBook(
      books[0] || {
        abbrev: { pt: "mt" },
        author: "",
        chapters: 24,
        group: "",
        name: "",
        testament: "",
      }
    );
    setChapter(1);
  }, []);


  useEffect(() => {
    (async () => {
      version &&
        book &&
        chapter &&
        setChapterText(
          (await servicoBiblia.getChapterText(
            version,
            book.abbrev.pt,
            chapter
          )) || []
        );
    })();
  }, [version, book, chapter]);

  const onChangeBook = (value) => {
    console.log(books);
    setBook(books.filter((b) => b.abbrev.pt == value)[0]);
  };
  const onChangeVersion = (value) => {
    setVersion(value);
  };
  const onChangeChapter = (value) => {
    setChapter(value);
  };
  const onChangeVerses = (value) => {
    setVersosVideo(value);
    let verses =
      videosDados.filter((v) => v.book == book.abbrev.pt && v.videoId == value)
        .length > 0
        ? videosDados.filter(
            (v) => v.book == book.abbrev.pt && v.videoId == value
          )[0]
        : videos2Dados.filter(
            (v) => v.book == book.abbrev.pt && v.videoId == value
          )[0];
    setVersoIF([verses.verse_i, verses.verses_f]);
  };
  const onChangeSwitch = (value) => {
    setOnlyLibras(!value);
  };

  const getOption = (obj, label, value, color) => {
    return (
      <Option
        key={obj[value]}
        value={obj[value]}
        style={{ color: color ? "#348AC8" : "#D78601" }}
      >
        {obj[label]}
      </Option>
    );
  };

  const getOptionVersion = (obj, label, value) => {
    return (
      <Option
        key={obj[value]}
        value={obj[value]}
      >
        {obj[label]}
      </Option>
    );
  };
  const getOptionNum = (obj) => {
    return (
      <Option key={obj} value={obj}>
        {obj}
      </Option>
    );
  };

  const getBooksOption = (obj) => {
    return (
      <Option key={obj.abbrev.pt} value={obj.abbrev.pt}>
        {obj.name}
      </Option>
    );
  };

  return (
    <>
      <div className={bibleStyles.container}>
        <div className="text-center">
          <h1>Bíblia em LIBRAS </h1>
        </div>
        <div className={bibleStyles.selectors}>
          <Row justify="center" align="top" gutter={[16, 8]}>
            <Col flex="none">
              <Form.Item label="Versão">
                {versions && (
                  <Select
                    placeholder="nvi"
                    style={{ width: 120 }}
                    key={`version`}
                    onChange={onChangeVersion}
                  >
                    {versions &&
                      versions.map((v) => getOptionVersion(v, "version", "version"))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Livro">
                <Select
                  placeholder="Mateus"
                  onChange={onChangeBook}
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {books &&
                    (onlyLibras
                      ? books
                          .filter((b) => b.testament == "NT")
                          .map((v) => getBooksOption(v))
                      : books.map((v) => getBooksOption(v)))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Capítulo">
                <Select
                  style={{ width: 120 }}
                  placeholder="1"
                  onChange={onChangeChapter}
                >
                  {book &&
                    Array(book.chapters)
                      .fill(null)
                      .map((_, i) => i + 1)
                      .map((v) => getOptionNum(v))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Versos">
                <Select
                  style={{ width: 120 }}
                  placeholder="1:1-17"
                  onChange={onChangeVerses}
                >
                  <OptGroup label="Libras Comunicar">
                    {book &&
                      videosDados
                        .filter(
                          (v) =>
                            v.book == book.abbrev.pt && v.chapter == chapter
                        )
                        .map((v) => getOption(v, "text", "videoId", true))}
                  </OptGroup>
                  {book &&
                    videos2Dados.filter(
                      (v) => v.book == book.abbrev.pt && v.chapter == chapter
                    ).length > 0 && (
                      <OptGroup label="Biblia DOT">
                        {book &&
                          videos2Dados
                            .filter(
                              (v) =>
                                v.book == book.abbrev.pt && v.chapter == chapter
                            )
                            .map((v) => getOption(v, "text", "videoId"))}
                      </OptGroup>
                    )}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Apenas versos Traduzidos">
                <Switch defaultChecked onChange={onChangeSwitch} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Row>
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 24, order: 2 }}
            lg={{ span: 12, order: 1 }}
            xl={{ span: 12, order: 1 }}
          >
            <div
              key={chapter + book.abbrev + version}
              className={"verses-text"}
            >
              {versoIF[1] != 1
                ? chapterText &&
                  chapterText.verses
                    .filter(
                      (v) => v.number >= versoIF[0] && v.number <= versoIF[1]
                    )
                    .map((v) => (
                      <p key={v.number}>
                        <b> {v.number} </b>{" "}
                        {v.text.split(" ").map((w, i) => (
                          <>
                            {words.some(
                              (obj) =>
                                obj.palavra.toLowerCase() === w.toLowerCase()
                            ) ? (
                              <span key={i + w}>
                                <Text
                                  underline
                                  onClick={() =>
                                    showModal(
                                      words.filter(
                                        (obj) =>
                                          obj.palavra.toLowerCase() ===
                                          w.toLowerCase()
                                      )[0]
                                    )
                                  }
                                >
                                  <Popover title="Clique para saber sobre o sinal">
                                    {w}
                                  </Popover>
                                </Text>
                                &nbsp;
                              </span>
                            ) : (
                              <span key={i + w}>{w} </span>
                            )}
                          </>
                        ))}
                      </p>
                    ))
                : chapterText &&
                  chapterText.verses.map((v) => (
                    <p key={v.number}>
                      <b> {v.number} </b>{" "}
                      {v.text.split(" ").map((w, i) => (
                        <span key={i + w}> {w} </span>
                      ))}
                    </p>
                  ))}
            </div>
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 24, order: 1 }}
            lg={{ span: 12, order: 2 }}
            xl={{ span: 12, order: 2 }}
          >
            <div
              id="video"
              style={{
                zIndex: 1,
              }}
            >
              {versosVideo && (
                <ReactPlayer
                  height={width > 992 ? "45vh" : "35vh"}
                  width={width > 992 ? width * 0.4 : width * 0.8}
                  url={"https://www.youtube.com/watch?v=" + versosVideo}
                  controls={true}
                />
              )}
            </div>
          </Col>
        </Row>
        <div id="video">
          <Modal
            title="Sinal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={(width > 992 ? width * 0.4 : width * 0.8) + 40}
          >
            {palavra && (
              <>
                <ReactPlayer
                  width={width > 992 ? width * 0.4 : width * 0.8}
                  url={"https://www.youtube.com/watch?v=" + palavra.videoId}
                  controls={true}
                />
                <p>{palavra.descricao.replaceAll("\\", '"')}</p>
              </>
            )}
          </Modal>
        </div>
        <VLibras />
      </div>
    </>
  );
};

export default Books;
