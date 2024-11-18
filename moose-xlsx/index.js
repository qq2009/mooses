import { isZip, ZipCatalog } from './core/zip';
import Xml from './core/XMLS';

export const xmlParser = new Xml();

export class Xlsx {
    constructor(source) {
        this.source = source;
        this.virtualFolder = null;
    }

    async init(cb) {
        if (isZip(this.source)) {
            const virtualFolder = new ZipCatalog(this.source);
            await virtualFolder._init_();
            this.virtualFolder = virtualFolder;
            cb();
            return;
        }
        throw new Error('no xlsx zip');
    }
}
