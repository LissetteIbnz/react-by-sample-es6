# 05 Refactor

In the previous sample we were setting an initial username value, what would happen if we expect this value to come from e.g. an AJAX request or if it could change in time? The current approach won't work.

We can think about two possible solutions:

- The first idea that could come into our mind is to implement a mix: we receive via props the current name value, then we hold an state with the current editing value... what drawbacks could we encounter? We have to listen on the `componentWillReceiveProps` for any change on the parent user name control and replace our state, we end up with a mixed governance.

- The second idea is to setup two properties, the parent control will hold _`userName`_ and _`editingUsername`_, whenever the user clicks on the button to replace the name it will notify the parent control and it will replace the content of _`userName`_" with the content from _`editingUsername`_. If _`userName`_ gets updated by any other third party (e.g. ajax callback) it will update as well _`editingUsername`_.

We will take as a starting point sample _[04 Callback](../04%20Callback/)_:

Summary steps:

- Update _[nameEdit.jsx](./src/nameEdit.jsx)_ in order to request the new _`editingUsername`_, and remove it from the state.

- Update _[app.jsx](./src/app.jsx)_ to hold the new editing property in the state, pass it to the children, control and perform the proper update on the callback event from the child control.

## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _[04 Callback](../04%20Callback/)_ and execute `npm install`.

- Update _[nameEdit.jsx](./src/nameEdit.jsx)_ in order to request the new _`editingUsername`_, and remove it from the state.

_[nameEdit.jsx](./src/nameEdit.jsx)_
```diff
import React from 'react';
import PropTypes from 'prop-types';

export class NameEditComponent extends React.Component {
  constructor(props) {
    super(props);
--  this.state = {
--   editingName: this.props.initialUserName,
--  };

--  this.onChange = this.onChange.bind(this);
--  this.onNameSubmit = this.onNameSubmit.bind(this);
  }

-- onChange(event) {
--   this.setState({ editingName: event.target.value });
-- }
    
-- onNameSubmit() {
--    this.props.onNameUpdated(this.state.editingName);
-- }

  render() {
    return (
      <div>
--      <label htmlFor="editingName">Update Name:</label>      
++      <label>Update Name:</label>
        <input 
--        value={this.state.editingName}        
++        value={this.props.editingUserName}
--        onChange={this.onChange}
++        onChange={(e) => this.props.onEditingNameUpdated(e.target.value)} 
--        id="editingName"
        />
        <input 
          type="submit" 
          value="Change" 
          className="btn btn-default"
--        onClick={this.onNameSubmit}
++        onClick={this.props.onNameUpdateRequest} 
        />
      </div>
    );
  }
}

NameEditComponent.propTypes = {
-- userName: PropTypes.string.isRequired,
++ editingUserName: PropTypes.string.isRequired,
-- onNameUpdated: PropTypes.func,
++ onEditingNameUpdated: PropTypes.func.isRequired,
++ onNameUpdateRequest: PropTypes.func.isRequired
};
```

- Update _[app.jsx](./src/app.jsx)_ to hold the new editing property in the state, pass it to the children control and perform the proper update on the callback event from the child control.

_[app.jsx](./src/app.jsx)_
```diff
import React from 'react';
import {HelloComponent} from './hello';
import {NameEditComponent} from './nameEdit';

export class App extends React.Component {
  constructor(props) {
    super(props);

--  this.state = {
--    userName: 'defaultUserName',
--  };
++  const defaultUserName = 'defaultUserName';

--  this.setUsernameState = this.setUsernameState.bind(this);
++  this.state = {
++    userName: defaultUserName,
++    editingUserName: defaultUserName
++  };
  }

-- setUsernameState(newName) {
++ setUsernameState() {
    this.setState({
--    userName: newName
++    userName: this.state.editingUserName
    });
  }

++ updateEditingName(editingName) {
++  this.setState({editingUserName: editingName});
++ }

  render() {
    return (
      <div>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent
--        initialUserName="Javier Cansado"
--        onNameUpdated={this.setUsernameState}        
++        editingUserName={this.state.editingUserName}
++        onEditingNameUpdated={this.updateEditingName.bind(this)}
++        onNameUpdateRequest={this.setUsernameState.bind(this)} />
      </div>
    );
  }
}
```

Finally we can check the sample is working as _[04 Callback](../04%20Callback/)_ executing from the command line `npm start` and opening [http://localhost:8080](http://localhost:8080).
