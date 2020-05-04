# Notes

## Libraries that could be used in the future
- [commander] (https://github.com/tj/commander.js/)
  - alternative to yargs which I currently have imported
- [inquirier] (https://github.com/SBoudrias/Inquirer.js)
  - this is for command line questions and interactive answers, would be great for setup
- [typescript-starter] (https://github.com/bitjson/typescript-starter)

## Helpful guides
- [How To Create Your Own TypeScript CLI — With Node.js] (https://medium.com/@jeroenouw/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89)
- [Step by step: Building and publishing an NPM Typescript package.] (https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)

## Random notes
If I make changes to package.json or change how the command is called run
```
npm install -g
```
to re-create the symlinks to the current project.

Did some research and it looks like Github Apps is the best bet for what I'd like to accomplish. I think I could get to a similar parity with the other repo within a week of full time work.

I think it makes sense to have the web dashboard be primirily for settings. These settings can be for which services you want to link to. By reading from github, it can auto post issues similar to the todo app below. It will also be able to post to asana and jira and other tools, maybe even provide a webhook. You can also adjust settings like what the keywords are that it looks for. The keyword should add a tag on the github issue. I like the body aspect of the comment but don't like the formatting. This paired with syntax highlighting on vscode would be ideal. So maybe a good way to think about it is to build across different sectors (editor, language, repo tool, task management, cli, config) and then once all the sectors are accounted for, duplicate effort across other services within that sector. Breadth then depth. Does that make sense, I think so because that proves the value prop more easily for one use case as opposed to no value prop but a bunch of different use cases. So high level roadmap:

(language) already decided, JS and Ruby
(cli) already done

1. Name, tilda? tilde?
2. Github app - parity with repo below (repo tool)
3. Posting issues in repo (task management)
4. Web dashboard settings page (config)
5. Vscode plugin for highlighting (editor)

## Other similar tools
- [github apps todo] (https://github.com/jasonetco/todo) looks like this was made by a guy that works at github. I could start building something similar and eventually reach out to him.


