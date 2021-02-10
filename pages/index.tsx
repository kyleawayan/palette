import Center from "../components/Center";
import Editor from "../components/Editor";

export default function Index() {
  return (
    <div className="pancake">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ewb2tqh.css" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <header>IU Palette Generator</header>
      <main>
        <Center>
          <Editor />
        </Center>
      </main>
      <footer>
        <a href="https://github.com/kyleawayan/palette" target="_blank">
          github
        </a>
      </footer>
    </div>
  );
}
