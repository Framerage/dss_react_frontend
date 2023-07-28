import React, {useEffect, useState} from "react";
import cn from "classnames";
import classes from "./creatingCard.module.css";
import {CatalogCardNesting, cardThemes} from "typings/catalogCards";
import {useForm} from "react-hook-form";
import {generateFileData, setBase64Image} from "helperrs/appHelpers";
const CreatingCard = () => {
  const [fullDescripValue, setFullDescripValue] = useState("");
  const [cardImagesUrls, setCardImagesUrls] = useState<
    {fileBody: string; fileName: string; id: number}[]
  >([]);
  const {handleSubmit, register, formState, setValue} =
    useForm<CatalogCardNesting>({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      shouldFocusError: false,
    });
  const themes = Object.keys(cardThemes);
  const onCreateCard = (data: CatalogCardNesting) => {
    console.log(
      {...data, fullDescrip: fullDescripValue, imgUrl: cardImagesUrls},
      "form data",
    );
  };
  const createImgString = async (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }
    const body = fileList[0];
    const imgResult = await generateFileData({
      fileBody: body,
      fileName: body.name,
    });
    if (cardImagesUrls.some(file => file.fileName === imgResult.fileName)) {
      return;
    }
    setCardImagesUrls([
      ...cardImagesUrls.map((img, index) => {
        return {...img, id: index};
      }),
      {...imgResult, id: cardImagesUrls.length},
    ]);
  };

  const onRemoveFile = (id: number) =>
    setCardImagesUrls(() => {
      const newFiles = cardImagesUrls.filter(file => file.id !== id);
      return newFiles.map((file, index) => {
        return {...file, id: index};
      });
    });
  console.log(cardImagesUrls, "cardImagesUrls");
  return (
    <div className={classes.cardCreatingContainer}>
      <div className={classes.firstSection}>
        <div className={classes.firstSectPreview}>
          {cardImagesUrls && cardImagesUrls.length > 0 && (
            <img
              src={setBase64Image("", cardImagesUrls[0].fileBody)}
              alt="cardImg"
              width={700}
              height={400}
              className={classes.previewImg}
            />
          )}

          <div className={classes.previewAddBlock}>
            <label htmlFor="addImgUrl" className={classes.previewAddFile}>
              + Add image
            </label>
            <input
              type="file"
              name="imgUrl"
              id="addImgUrl"
              onChange={e => {
                createImgString(e.target.files);
              }}
              style={{display: "none"}}
            />
            {cardImagesUrls.length > 0 &&
              cardImagesUrls.map((image, index) => (
                <span key={index}>
                  {image.fileName ? image.fileName : "-"}{" "}
                  <span onClick={() => onRemoveFile(index)}>X</span>
                </span>
              ))}
          </div>
        </div>
        <textarea
          className={classes.firstSectArea}
          value={fullDescripValue}
          onChange={e => setFullDescripValue(e.target.value)}
        />
      </div>
      <form
        className={classes.secondSection}
        onSubmit={handleSubmit(onCreateCard)}
      >
        <div className={classes.secondSectItem}>
          Title:&nbsp;
          <input
            type="text"
            className={classes.secondSectInput}
            {...register("title")}
            name="title"
            required
          />
        </div>
        <div className={classes.secondSectItem}>
          Theme:&nbsp;
          <select
            className={classes.secondSectInput}
            {...register("theme")}
            name="theme"
          >
            {themes.map(theme => (
              <option
                key={theme}
                value={theme}
                className={classes.selectOption}
              >
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div className={cn(classes.secondSectItem)}>
          Description:&nbsp;
          <textarea
            className={cn(classes.secondSectArea, classes.secondSectInput)}
            {...register("descrip")}
            name="descrip"
            required
          />
        </div>
        <div className={classes.secondSectItem}>
          Price:&nbsp;
          <input
            type="number"
            className={classes.secondSectInput}
            {...register("price")}
            name="price"
            required
          />
        </div>
        <div className={classes.secondSectItem}>
          <button className={classes.submitBtn}>Create card</button>
        </div>
      </form>
    </div>
  );
};
export default CreatingCard;
