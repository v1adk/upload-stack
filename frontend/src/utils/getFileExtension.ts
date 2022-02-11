/**
 * Gets the file extension from the file name or path.
 * @param fileName The file name or path.
 * @returns The extension without the dot (e.g. txt) or null if the file does not contain an extension.
 * @example
 *  ""                            -->   null
 *  "name"                        -->   null
 *  "name.txt"                    -->   "txt"
 *  ".env"                        -->   null
 *  "name.with.many.dots.ext"     -->   "ext"
 *
 * Source https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
 */
export function getFileExtension(fileName: string) {
    const parts = fileName.split(".");
    if (parts.length > 1) {
        return parts.pop();
    }
    return null;
}
