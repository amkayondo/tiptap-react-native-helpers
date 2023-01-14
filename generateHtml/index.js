import {Schema, DOMSerializer} from 'prosemirror-model';
import {JSONNodeSerializer} from 'prosemirror-model';
import Ajv from 'ajv';

const generateHtml = (json, jsonSchema) => {
  // Validate the input JSON using the provided JSON schema
  const ajv = new Ajv();
  const valid = ajv.validate(jsonSchema, json);
  if (!valid) {
    console.log('Invalid JSON:', ajv.errors);
    return;
  }

  // Define the ProseMirror schema for the input JSON
  const schema = new Schema({
    nodes: {
      doc: {content: 'block*'},
      text: {},
      block: {
        content: 'text*',
        group: 'block',
        parseDOM: [{tag: 'p'}],
        toDOM: () => ['p', 0]
      }
    }
  });

  // Parse the JSON into a ProseMirror document
  const parser = new JSONNodeSerializer(schema, json);
  const doc = parser.parse();

  // Serialize the ProseMirror document to HTML
  const serializer = new DOMSerializer(schema);
  const html = serializer.serializeFragment(doc.content);
  return html;
}

export default generateHtml;
