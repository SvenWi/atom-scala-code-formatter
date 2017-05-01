'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
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
    let scalaScopeName = 'source.scala'
    let scalaFmtPath = '"' + __dirname + '/scalafmt.jar"'

    if (editor = atom.workspace.getActiveTextEditor()) {
      if(editor.getGrammar().scopeName == scalaScopeName) {
        let exec = require('child_process').exec;
        let scalafmt = exec('java -jar ' + scalaFmtPath + ' --diff --stdin');
        let code = editor.getText();

        stdout = '';

        scalafmt.stdin.setEncoding('utf-8');
        scalafmt.stdin.write(code);
        scalafmt.stdin.end();

        scalafmt.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        scalafmt.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        scalafmt.on('close', (code) => {
          if(code === 0) editor.setText(stdout);
        });
      }
    }
  }
};
