import React, { Component } from 'react';
import sha256 from 'crypto-js/sha256';

class Shorty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      code: ''
    };

    this.shorten = this.shorten.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  shorten() {
    const hash = sha256(this.state.url).toString();
    this.setState({ code: hash.substr(0, 7) });
  }

  updateInputValue(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <div className="shorten">
        <input 
          type="url"
          name="url"
          required
          value={this.state.url} 
          onChange={evt => this.updateInputValue(evt)}
          onBlur={this.shorten}
        /> <br />
        <input type="text" name="code" value={this.state.code} onChange={evt => this.updateInputValue(evt)} />
      </div>
    );
  }
}

export default Shorty;