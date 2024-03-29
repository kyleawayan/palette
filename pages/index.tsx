import { NextSeo } from "next-seo";
import Center from "../components/Center/Center";
import Editor from "../components/Editor/Editor";
import "../utils/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(router.locale);
  }, []);

  return (
    <div className="pancake">
      <head>
        <title>IU Palette Generator</title>
        <link rel="stylesheet" href="https://use.typekit.net/ewb2tqh.css" />
      </head>
      <NextSeo
        title="IU Palette Generator"
        description="IU Palette album art generator."
        canonical="https://palette.kylan.io"
        openGraph={{
          url: "https://palette.kylan.io",
          title: "IU Palette Generator",
          description: "IU Palette album art generator.",
          images: [
            {
              url: "/palette.png",
              width: 640,
              height: 640,
              alt: "Sample image generated by IU Palette Generator",
            },
          ],
          site_name: "IU Palette Generator",
        }}
      />
      <header>{t("Header")}</header>
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
