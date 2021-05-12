import React, { useEffect, useState } from "react";
import ServicoBiblia from "../api/ServicoBiblia";
import Sheet from "../api/Sheet";
import bibleStyles from "../styles/biblia.module.css";
import VLibras from "@djpfs/react-vlibras-typescript";
import ReactPlayer from "react-player";
import { Select, Form, Layout, Row, Col, Switch } from "antd";
const { Option } = Select;
const Books = () => {
  const [books, setBooks] = useState([]);
  const [versions, setVersions] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [version, setVersion] = useState("nvi");
  const [dados, setDados] = useState([]);
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

  const servicoBiblia = new ServicoBiblia();
  const servicoDados = new Sheet();

  const [width, setWindowWidth] = useState(0);
  const [videoTop, setVideoTop] = useState(0);

  useEffect(() => {
    window.onscroll = function () {
      changePositionVideo();
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    let video = document.getElementById("video");
    const videoTop = video.offsetTop;
    const width = window.innerWidth;
    const vh = window.innerHeigth *0.2;
    setWindowWidth(width);
    setVideoTop(videoTop);
    if (width < 993) {
      video.classList.add("bottom-fixed");
      video.classList.remove("sticky");
    } else if (window.pageYOffset > videoTop + vh || width >= 993) {
      video.classList.remove("bottom-fixed");
      video.classList.add("sticky");
    }
  };

  useEffect(() => {
    (async () => {
      setBooks((await servicoBiblia.getBooks()) || []);
      setVersions((await servicoBiblia.getVersions()) || []);
      setDados((await servicoDados.getDados()) || []);
    })();
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

  const changePositionVideo = () => {};

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
    let verses = dados.filter(
      (v) => v.book == book.abbrev.pt && v.videoId == value
    )[0];
    setVersoIF([verses.verse_i, verses.verses_f]);
  };
  const onChangeSwitch = (value) => {
    setOnlyLibras(!value);
  };

  const getOption = (obj, label, value) => {
    return (
      <Option key={obj[value]} value={obj[value]}>
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
                      versions.map((v) => getOption(v, "version", "version"))}
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
                  {book &&
                    dados
                      .filter(
                        (v) => v.book == book.abbrev.pt && v.chapter == chapter
                      )
                      .map((v) => getOption(v, "text", "videoId"))}
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
                        {v.text.split(" ").map((w) => (
                          <span> {w} </span>
                        ))}
                      </p>
                    ))
                : chapterText &&
                  chapterText.verses.map((v) => (
                    <p key={v.number}>
                      <b> {v.number} </b>{" "}
                      {v.text.split(" ").map((w) => (
                        <span> {w} </span>
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
            <div id="video">
              {versosVideo && (
                <ReactPlayer
                  url={"https://www.youtube.com/watch?v=" + versosVideo}
                  controls={true}
                />
              )}
            </div>
          </Col>
        </Row>

        <VLibras />
      </div>
    </>
  );
};

export default Books;
