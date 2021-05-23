import React, { useEffect, useState } from "react";
import Sheet from "../api/Sheet";
import bibleStyles from "../styles/biblia.module.css";
import VLibras from "@djpfs/react-vlibras-typescript";
import ReactPlayer from "react-player";
import { Divider, Modal, List, Button, Input } from "antd";
import { Typography } from "antd";

const { Search } = Input;
const { Title } = Typography;
const Books = () => {
  const [words, setWords] = useState([]);
  const [wordsF, setWordsF] = useState([]);
  const [letter, setLetter] = useState("A");
  const [palavra, setPalavra] = useState();
  const [heigth, setWindowHeigth] = useState(0);
  const [width, setWindowWidth] = useState(0);
  const [videoTop, setVideoTop] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const servicoDados = new Sheet();

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
      setWords((await servicoDados.getGlossario()) || []);
      setWordsF((await servicoDados.getGlossario()) || []);
    })();
  }, []);

  const onChange = e => setWordsF(words.filter((w) => w.palavra.toUpperCase().includes(e.target.value)));
  
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  return (
    <div>
      <div className="text-center">
        <h1>Glossario </h1>
      </div>
      <Search placeholder="palavra" onChange={onChange} style={{ width: 200 }} />
      <div className={bibleStyles.selectors}></div>
      {alphabet.map((letter) => (
        <>
          {wordsF.filter((w) => w.palavra.toUpperCase().charAt(0) == letter)
            .length > 0 && (
            <>
              <Divider orientation="left">
                {" "}
                <Title level={2}>{letter}</Title>
              </Divider>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={wordsF
                  .filter((w) => w.palavra.toUpperCase().charAt(0) == letter)
                  .sort((a, b) => a.palavra.localeCompare(b.palavra))}
                renderItem={(item) => (
                  <List.Item>
                    <Button onClick={() => showModal(item)}>
                      {item.palavra.toUpperCase()}
                    </Button>
                  </List.Item>
                )}
              />
            </>
          )}
        </>
      ))}

      <div id="video">
        <Modal
          title="Sinal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={(width > 992 ? width * 0.4 : width * 0.8) + 40}
        >
          {palavra && (
            <ReactPlayer
              width={width > 992 ? width * 0.4 : width * 0.8}
              url={"https://www.youtube.com/watch?v=" + palavra.videoId}
              controls={true}
            />
          )}
        </Modal>
      </div>

      <VLibras />
    </div>
  );
};

export default Books;
