import {elementFromString} from './elementFromString';
import {DOMParser, Schema} from 'prosemirror-model';

const generateJson = (data) => {
  const html = elementFromString(data);

  const schema = new Schema({
    nodes: {
      doc: {content: 'paragraph+'},
      paragraph: {content: 'text*'},
      text: {inline: true},
    },
  });

  const result = DOMParser.fromSchema(schema).parse(html).toJSON();
  return result;
};

export default generateJson;
