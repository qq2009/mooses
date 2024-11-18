import * as Zip from 'jszip';

export function isZip(buffer) {
    // hade flg：0x504B0304
    return true;
}

export class ZipCatalog {
    constructor(source) {
        this.source = source;
        this.folder = null;
    }

    async _init_() {
        try {
            this.folder = await Zip.loadAsync(this.source);
        } catch (e) {
        }
    }

    read(path) {
        return new Promise((resolve, reject) => {
            this.folder &&
            this.folder
                .file(path)
                .async('string')
                .then((text) => {
                    resolve(text);
                });
        });
    }

    write(path, content) {
        return new Promise((resolve, reject) => {
            this.folder && this.folder.file(path, content);
        });
    }

    fileList() {
        return new Promise((resolve, reject) => {
            resolve(Object.keys(this.folder.files));
        });
    }
}
