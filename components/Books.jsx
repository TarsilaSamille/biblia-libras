import React, { useEffect, useState } from "react";
import ServicoBiblia from "../api/ServicoBiblia";
import Sheet from "../api/Sheet";
import { Label, SelectField, Paragraph, FieldSet } from "fannypack";
import bibleStyles from "../styles/biblia.module.css";
import VLibras from "@djpfs/react-vlibras-typescript";
import ReactPlayer from "react-player";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [versions, setVersions] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [version, setVersion] = useState("acf");
  const [dados, setDados] = useState([]);
  const [versosVideo, setVersosVideo] = useState("");

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

  const getOptions = (object, label, value) => {
    return object.map((obj) => {
      let rObj = { label: " ", value: "" };
      if (label && value) {
        rObj.label = obj[label];
        rObj.value = obj[value];
      } else {
        rObj.label = obj;
        rObj.value = obj;
      }
      return rObj;
    });
  };

  const getBooksOptions = (object) => {
    return object.map((obj) => {
      let rObj = { label: " ", value: "" };
      rObj.label = obj.name;
      rObj.value = obj.abbrev.pt;
      return rObj;
    });
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
  return (
    <>
      <div className={bibleStyles.selectors}>
        <SelectField
          label="Versão"
          options={getOptions(versions, "version", "version")}
          onChange={(e) => setVersion(e.target.value)}
        />
        <SelectField
          label="Livro"
          options={getBooksOptions(books)}
          onChange={(e) =>
            setBook(books.filter((b) => b.abbrev.pt == e.target.value)[0])
          }
        />

        <SelectField
          label="Capítulo"
          defaultValue="1"
          options={getOptions(
            Array(book.chapters)
              .fill(null)
              .map((_, i) => i + 1),
            null,
            null
          )}
          onChange={(e) => setChapter(e.target.value)}
        />

        <SelectField
          label="Versos"
          defaultValue="1"
          options={getOptions(
            dados.filter(
              (v) => v.book == book.abbrev.pt && v.chapter == chapter
            ),
            "text",
            "videoId"
          )}
          onChange={(e) => setVersosVideo(e.target.value)}
        />
      </div>
      <div>
        <div className={bibleStyles.selectors}>
          {versosVideo && (
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=" + versosVideo}
              controls={true}
            />
          )}
        </div>

        <div key={chapter + book.abbrev + version}>
          {chapterText &&
            chapterText.verses.map((v) => (
              <Paragraph>
                <b> {v.number} </b> {v.text}
              </Paragraph>
            ))}
        </div>
      </div>
      <VLibras />
    </>
  );
};

export default Books;
