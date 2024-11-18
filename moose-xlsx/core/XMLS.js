const xml = {
    start: '<',
    end: '>',
    closed: '</',
    since: '/>'
};

export default class XMLS {
    parse(str) {
        const domparser = new DOMParser();
        const doc = domparser.parseFromString(str, 'application/xml');
        if (!doc)
            return;
        const root = doc.documentElement;
        return this._parse(root);
    }

    _node() {
        return {
            tag: '',
            content: [],
            attr: {}
        };
    }

    _parse(node) {
        const rnode = this._node();
        // tagName
        rnode.tag = node.nodeName;
        // attributes
        rnode.attr = Object.values(node.attributes || {}).reduce((a, b) => Object.assign(a, { [b.name]: b.value }), {});
        // childNodes
        if (node.childNodes.length) {
            node.childNodes.forEach((e) => {
                rnode.content.push(this._parse(e));
            });
        } else {
            if (node.nodeType === 3) {
                // @ts-ignore
                rnode.content = node.nodeValue;
            } else {
                // @ts-ignore
                rnode.content = '';
            }
        }
        return rnode;
    }

    render(nodes) {
        return this._render(nodes);
    }

    _render(nodes) {
        let text = `${xml.start}${nodes.tag}`;
        text += this._handleAttr(nodes.attr);
        if (Array.isArray(nodes.content)) {
            text += xml.end;
            nodes.content.forEach((e) => {
                if (e.tag === '#text') {
                    text += e.content;
                } else {
                    text += this._render(e);
                }
            });
            text += `${xml.closed}${nodes.tag}${xml.end}`;
        } else {
            text += `${xml.since}`;
        }
        return text;
    }

    _handleAttr(attr) {
        return Object.keys(attr || {}).reduce((a, b) => {
            a += ` ${b}="${attr[b]}"`;
            return a;
        }, '');
    }
}
