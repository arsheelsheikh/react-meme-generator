import React, { useState, useEffect } from "react";

export default function MemeForm() {
  const [allMemeData, setMemeAllImages] = useState({});
  const [imgState, setImageState] = useState(false);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  useEffect(() => {
    async function fetchMemes() {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setMemeAllImages(data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    }
    fetchMemes();
  }, []);

  function handleImageChange(event) {
    const imageUrl = URL.createObjectURL(event.target.files[0]);

    if (imageUrl) {
      setImageState(true);
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: imageUrl,
      }));
    }
  }

  function handleRandomMeme() {
    const memesArray = allMemeData?.data?.memes;
    if (!memesArray || memesArray.length === 0) {
      console.warn("No memes available.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * memesArray.length);
    const randomImageUrl = memesArray[randomIndex]?.url;

    if (randomImageUrl) {
      setImageState(true);
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: randomImageUrl,
      }));
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="form-class">
        <div className="form">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              onChange={handleChange}
              name="topText"
              value={meme.topText}
              placeholder="Enter top text"
            />
            <input
              type="text"
              className="input-text"
              onChange={handleChange}
              name="bottomText"
              value={meme.bottomText}
              placeholder="Enter bottom text"
            />
          </div>
          <button className="btn" onClick={handleRandomMeme}>
            Get a new meme image 🖼
          </button>
          <p className="upload-meme">Upload your own meme</p>
          <input
            type="file"
            name="uploadedImage"
            className="file"
            onChange={handleImageChange}
          />
        </div>
      </div>
      {imgState && (
        <div className="meme">
          <img src={meme.randomImage} className="meme--img" alt="meme" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      )}
    </div>
  );
}
