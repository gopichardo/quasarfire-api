
import MarkdownIt from "markdown-it";
import * as fs from "fs";

class Markdown {

    /**
     * Generates the HTML from markdown
     * @returns Html Markdown
     */
    async GenerateHtmlMarkdown(): Promise<string> {
        let markdown = new MarkdownIt();
        let htmlMarkdown: string = "";
        let cssMarkdown: string = "";

        await this.ReadFileContent().then(data => {
            htmlMarkdown = markdown.render(data);
        });

        await this.ReadStyle().then(data => {
            cssMarkdown = data;
        });

        //Agregar estilos al documento html
        let htmlDocument: string =
            "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1'><title></title>" +
            cssMarkdown +
            "</head><body><div class='markdown-body'>" +
            htmlMarkdown +
            "</div></body></html>";

        return new Promise((resolve, reject) => {
            if (htmlMarkdown.length > 0 && cssMarkdown.length > 0) {
                resolve(htmlDocument);
            } else {
                reject("No se pudo generar correctamente el html");
            }
        });
    }


    /**
     * Get the Readme.md File Content
     * @returns Readme.md Content
     */
    private ReadFileContent(): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile("./README.md", "utf8", (err, data) => {
                if (!err && data.length > 0) {
                    resolve(data);
                } else if (err) {
                    reject(err);
                } else {
                    reject("El archivo no tiene contenido");
                }
            });
        });
    }

    /**
     * Get the HTML styles
     * @returns Styles
     */
    private ReadStyle(): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile("./public/github-markdown.css", "utf8", (err, stringStyle) => {
                if (!err && stringStyle.length > 0) {
                    let style: string =
                        "<style type='text/css'>\n" +
                        ".markdown-body{box-sizing:border-box;min-width:200px;max-width:980px;margin:0 auto;padding:45px}@media (max-width:767px){.markdown-body{padding:15px}} \n" +
                        stringStyle + "</style>\n";
                    resolve(style);
                } else if (err) {
                    reject(err);
                } else {
                    reject("El archivo no tiene contenido");
                }
            });
        });
    }

}

export default Markdown;