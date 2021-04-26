import React, { useEffect, useState } from "react";
import ServicoBiblia from "../api/ServicoBiblia";
import Sheet from "../api/Sheet";
import bibleStyles from "../styles/biblia.module.css";
import VLibras from "@djpfs/react-vlibras-typescript";
import ReactPlayer from "react-player";
import { Select, Form, Layout } from "antd";
import { Row, Col, Divider } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const Books = () => {
  const [books, setBooks] = useState([]);
  const [versions, setVersions] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [version, setVersion] = useState("nvi");
  const [dados, setDados] = useState([]);
  const [versosVideo, setVersosVideo] = useState("");
  const [versoI, setVersoI] = useState(1);
  const [versoF, setVersoF] = useState(1);

  const [book, setBook] = useState({
    abbrev: { pt: "gn" },
    author: "",
    chapters: 50,
    group: "",
    name: "",
    testament: "",
  });
  const [chapterText, setChapterText] = useState();

  const servicoBiblia = new ServicoBiblia();
  const servicoDados = new Sheet();

  const getOption = (obj, label, value) => {
    return <Option key={obj[value]} value={obj[value]}>{obj[label]}</Option>;
  };

  const getOptionNum = (obj) => {
    return <Option key={obj}  value={obj}>{obj}</Option>;
  };

  const getBooksOption = (obj) => {
    return <Option key={obj.abbrev.pt} value={obj.abbrev.pt}>{obj.name}</Option>;
  };

  useEffect(() => {
    (async () => {
      setBooks((await servicoBiblia.getBooks()) || []);
      setVersions((await servicoBiblia.getVersions()) || []);
      setDados((await servicoDados.getDados()) || []);
    })();
  }, []);
  // book, chapter_verses, chapter, verses, playlistId, videoId
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

  function onChangeBook(value) {
    setBook(books.filter((b) => b.abbrev.pt == value)[0]);
  }
  function onChangeVersion(value) {
    setVersion(value);
  }
  function onChangeChapter(value) {
    setChapter(value);
  }
  function onChangeVerses(value) {
    setVersosVideo(value);
    let verses = dados
    .filter((v) => v.book == book.abbrev.pt && v.videoId == value)[0];
    setVersoF(verses.verse_f);
    setVersoI(verses.verse_i);
  }
  return (
    <>
      <div className={bibleStyles.selectors}>
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
        <Form.Item label="Livro">
          <Select
            placeholder="Gênesis"
            onChange={onChangeBook}
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {books && books.map((v) => getBooksOption(v))}
          </Select>
        </Form.Item>
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
        <Form.Item label="Versos">
          <Select
            style={{ width: 120 }}
            placeholder="Selecione..."
            onChange={onChangeVerses}
          >
            {book &&
              dados
                .filter((v) => v.book == book.abbrev.pt && v.chapter == chapter)
                .map((v) => getOption(v, "text", "videoId"))}
          </Select>
        </Form.Item>
      </div>

      <Row>
        <Col flex="1">
          <div key={chapter + book.abbrev + version}>
            {chapterText &&
              chapterText.verses.map((v) => (
                <p key={v.number}>
                  <b> {v.number} </b> {v.text}
                </p>
              ))}
          </div>
        </Col>
        {versosVideo && (
          <Col flex="1">
            <Sider
              style={{
                position: "fixed",
              }}
            >
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=" + versosVideo}
                controls={true}
              />
            </Sider>
          </Col>
        )}
      </Row>
      <VLibras />
    </>
  );
};

export default Books;
