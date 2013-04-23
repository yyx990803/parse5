exports.createDocument = function () {
    return {
        nodeName: '#document',
        quirksMode: false,
        childNodes: []
    };
};

exports.createElement = function (tagName, attrs, namespaceURI) {
    return {
        tagName: tagName,
        attrs: attrs,
        namespaceURI: namespaceURI,
        childNodes: [],
        parentNode: null
    };
};

exports.createCommentNode = function (data) {
    return {
        nodeName: '#comment',
        data: data,
        parentNode: null
    };
};

var createTextNode = function (value) {
    return {
        nodeName: '#text',
        value: value,
        parentNode: null
    }
};

var appendNode = exports.appendNode = function (parentNode, node) {
    node.parentNode = parentNode;
    parentNode.childNodes.push(node);
};

exports.insertCharacterToNode = function (node, ch) {
    var childNodesLength = node.childNodes.length,
        lastChild = childNodesLength && node.childNodes[childNodesLength - 1];

    if (lastChild && lastChild.nodeName === '#text')
        lastChild.value += ch;
    else
        appendNode(node, createTextNode(ch));
};

exports.adoptAttributes = function (recipientNode, attrs) {
    var recipientAttrsMap = [];

    for (var i = 0; i < recipientNode.attrs.length; i++)
        recipientAttrsMap.push(recipientNode.attrs[i].name);

    for (var j = 0; j < attrs.length; j++) {
        if (recipientAttrsMap.indexOf(attrs[i].name) === -1)
            recipientNode.attrs.push(attrs[i]);
    }
};