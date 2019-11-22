// Button.component.jsx

import * as React from 'react';

export class ButtonComponent extends React.Component {  
  constructor(props, context) {
    super(props);

    this.state = {
      disabled: !props.disabled ? 0 : props.disabled,
      label: props.label,
      className: !props.className ? 'btn' : props.className
    };
  } 

  componentWillReceiveProps(nextProps) {
    const {disabled} = this.state;

    this.setState({
      disabled: disabled !== nextProps.disabled ? nextProps.disabled : disabled
    });
  }  

  render() {
    const {label, disabled, className} = this.state;

    let style = {
      'pointer-events': disabled ? 'none' : 'initial'
    }

    if (this.props.children) {
      return (
        <div onClick={this.props.onClick} style={style} className={className}>
          { this.props.children }
        </div>
      );
    }
    return (<button onClick={this.props.onClick} className={className} disabled={disabled}>{label}</button>);
  }
}

export default ButtonComponent;