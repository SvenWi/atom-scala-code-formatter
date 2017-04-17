'use babel';

import ScalaCodeFormatterView from './scala-code-formatter-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.scalaCodeFormatterView = new ScalaCodeFormatterView(state.scalaCodeFormatterViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'scala-code-formatter:format': () => this.format()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  format() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let spawn = require('child_process').spawn;
      let scalafmt = spawn('scalafmt', ['--diff', '--stdin']);
      let code = editor.getText();

      stdout = '';

      scalafmt.stdin.setEncoding('utf-8');
      scalafmt.stdin.write(code);
      scalafmt.stdin.end();

      scalafmt.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      scalafmt.on('close', (code) => {
        editor.setText(stdout);
      });

    }
  }

};
